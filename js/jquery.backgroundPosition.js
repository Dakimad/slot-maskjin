(function($) {
    // Sjekk for IE6-IE8
	if (!document.defaultView || !document.defaultView.getComputedStyle) {
        // Hvis IE6-IE8, overskriv jQuery sin curCSS-funksjon
		var oldCurCSS = $.curCSS;
		$.curCSS = function(elem, name, force) {
			if (name === 'background-position') {
				name = 'backgroundPosition';
			}
			if (name !== 'backgroundPosition' || !elem.currentStyle || elem.currentStyle[name]) {
				return oldCurCSS.apply(this, arguments);
			}
			var style = elem.style;
			if (!force && style && style[name]) {
				return style[name];
			}
			return oldCurCSS(elem, 'backgroundPositionX', force) + ' ' + oldCurCSS(elem, 'backgroundPositionY', force);
		};
	}

    // Overskriv jQuery sin animate-funksjon
	var oldAnim = $.fn.animate;
	$.fn.animate = function(prop) {
		if ('background-position' in prop) {
			prop.backgroundPosition = prop['background-position'];
			delete prop['background-position'];
		}
		if ('backgroundPosition' in prop) {
			prop.backgroundPosition = '(' + prop.backgroundPosition;
		}
		return oldAnim.apply(this, arguments);
	};

    // Funksjon for å konvertere bakgrunnsposisjonsstreng til array
	function toArray(strg) {
		strg = strg.replace(/left|top/g, '0px');
		strg = strg.replace(/right|bottom/g, '100%');
		strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g, "$1px$2");
		var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
		return [parseFloat(res[1], 10), res[2], parseFloat(res[3], 10), res[4]];
	}

    // Utvid jQuery sin fx.step for å håndtere bakgrunnsposisjonsanimasjon
	$.fx.step.backgroundPosition = function(fx) {
		if (!fx.bgPosReady) {
			var start = $.curCSS(fx.elem, 'backgroundPosition');
			if (!start) { // FF2 har ingen erstatning for innebygd stil
				start = '0px 0px';
			}

			start = toArray(start);
			fx.start = [start[0], start[2]];
			var end = toArray(fx.end);
			fx.end = [end[0], end[2]];

			fx.unit = [end[1], end[3]];
			fx.bgPosReady = true;
		}
		// Beregn nåværende bakgrunnsposisjon
		var nowPosX = [];
		nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
		nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
		// Sett den nye bakgrunnsposisjonen
		fx.elem.style.backgroundPosition = nowPosX[0] + ' ' + nowPosX[1];
	};
})(jQuery);
