(function($) {
	$._spritely = {
		// Delt metoder og variabler brukt av Spritely pluginen
		animate: function(options) {
			var el = $(options.el);
			var el_id = el.attr('id');
			options = $.extend(options, $._spritely.instances[el_id] || {});
			if (options.play_frames && !$._spritely.instances[el_id]['remaining_frames']) {
				$._spritely.instances[el_id]['remaining_frames'] = options.play_frames + 1;
			}
			if (options.type == 'sprite' && options.fps) {
				var frames;
				var animate = function(el) {
					var w = options.width, h = options.height;
					if (!frames) {
						frames = [];
						total = 0
						for (var i = 0; i < options.no_of_frames; i ++) {
							frames[frames.length] = (0 - total);
							total += w;
						}
					}

					if (options.rewind == true) {
						if ($._spritely.instances[el_id]['current_frame'] <= 0) {
							$._spritely.instances[el_id]['current_frame'] = frames.length - 1;
						} else {
							$._spritely.instances[el_id]['current_frame'] = $._spritely.instances[el_id]['current_frame'] - 1;
						};
					} else {
						if ($._spritely.instances[el_id]['current_frame'] >= frames.length - 1) {
							$._spritely.instances[el_id]['current_frame'] = 0;
						} else {
							$._spritely.instances[el_id]['current_frame'] = $._spritely.instances[el_id]['current_frame'] + 1;
						}
					}
                                        
					var yPos = $._spritely.getBgY(el);
					el.css('background-position', frames[$._spritely.instances[el_id]['current_frame']] + 'px ' + yPos);
					if (options.bounce && options.bounce[0] > 0 && options.bounce[1] > 0) {
						var ud = options.bounce[0]; // opp-ned
						var lr = options.bounce[1]; // venstre-høyre
						var ms = options.bounce[2]; // milliseconds
						el
							.animate({top: '+=' + ud + 'px', left: '-=' + lr + 'px'}, ms)
							.animate({top: '-=' + ud + 'px', left: '+=' + lr + 'px'}, ms);
					}
				}
				if ($._spritely.instances[el_id]['remaining_frames'] && $._spritely.instances[el_id]['remaining_frames'] > 0) {
					$._spritely.instances[el_id]['remaining_frames'] --;
					if ($._spritely.instances[el_id]['remaining_frames'] == 0) {
						$._spritely.instances[el_id]['remaining_frames'] = -1;
						delete $._spritely.instances[el_id]['remaining_frames'];
						return;
					} else {
						animate(el);
					}
				} else if ($._spritely.instances[el_id]['remaining_frames'] != -1) {
					animate(el);
				}
			} else if (options.type == 'pan') {
				if (!$._spritely.instances[el_id]['_stopped']) {
                                        if (options.dir == 'up') {
                                            $._spritely.instances[el_id]['l'] = $._spritely.getBgX(el).replace('px', '');
                                            $._spritely.instances[el_id]['t'] = ($._spritely.instances[el_id]['t'] - (options.speed || 1)) || 0;
                                        }
                                        else if (options.dir == 'down') {
                                            $._spritely.instances[el_id]['l'] = $._spritely.getBgX(el).replace('px', '');
                                            $._spritely.instances[el_id]['t'] = ($._spritely.instances[el_id]['t'] + (options.speed || 1)) || 0;
                                        }
					else if (options.dir == 'left') {
						$._spritely.instances[el_id]['l'] = ($._spritely.instances[el_id]['l'] - (options.speed || 1)) || 0;
                                                $._spritely.instances[el_id]['t'] = $._spritely.getBgY(el).replace('px', '');
					} else {
						$._spritely.instances[el_id]['l'] = ($._spritely.instances[el_id]['l'] + (options.speed || 1)) || 0;
                                                $._spritely.instances[el_id]['t'] = $._spritely.getBgY(el).replace('px', '');
					}

                                        var bg_left = $._spritely.instances[el_id]['l'].toString();
                                        if (bg_left.indexOf('%') == -1) {
                                            bg_left += 'px ';
                                        } else { bg_left += ' '; }

                                        var bg_top = $._spritely.instances[el_id]['t'].toString();
                                        if (bg_top.indexOf('%') == -1) {
                                            bg_top += 'px ';
                                        } else { bg_top += ' '; }
                                        
					$(el).css('background-position', bg_left + bg_top);
				}
			}
			$._spritely.instances[el_id]['options'] = options;
			window.setTimeout(function() {
				$._spritely.animate(options);
			}, parseInt(1000 / options.fps));
		},
		randomIntBetween: function(lower, higher) {
			return parseInt(rand_no = Math.floor((higher - (lower - 1)) * Math.random()) + lower);
		},
		getBgY: function(el) {
			if ($.browser.msie) {
				var bgY = $(el).css('background-position-y') || '0';
			} else {
				var bgY = ($(el).css('background-position') || ' ').split(' ')[1];
			}
			return bgY;
		},
		getBgX: function(el) {
			if ($.browser.msie) {
				var bgX = $(el).css('background-position-x') || '0';
			} else {
				var bgX = ($(el).css('background-position') || ' ').split(' ')[0];
			}
			return bgX;
		},
		get_rel_pos: function(pos, w) {
			// Returner posisjonen til et element i forhold til en bakgrunn
			// Bilde med bredde gitt av w
			var r = pos;
			if (pos < 0) {
				while (r < 0) {
					r += w;
				}
			} else {
				while (r > w) {
					r -= w;
				}
			}
			return r;
		}
	};
	$.fn.extend({
		spritely: function(options) {
			var options = $.extend({
				type: 'sprite',
				do_once: false,
				width: null,
				height: null,
				fps: 12,
				no_of_frames: 2,
				stop_after: null
			}, options || {});
			var el_id = $(this).attr('id');
			if (!$._spritely.instances) {
				$._spritely.instances = {};
			}
			if (!$._spritely.instances[el_id]) {
				$._spritely.instances[el_id] = {current_frame: -1};
			}
			$._spritely.instances[el_id]['type'] = options.type;
			$._spritely.instances[el_id]['depth'] = options.depth;
			options.el = this;
			options.width = options.width || $(this).width() || 100;
			options.height = options.height || $(this).height() || 100;
			var get_rate = function() {
                return parseInt(1000 / options.fps);
            }
            if (!options.do_once) {
				window.setTimeout(function() {
					$._spritely.animate(options);
				}, get_rate(options.fps));
			} else {
				$._spritely.animate(options);
			}
			return this; // Slik at vi kan lenke hendelser
		},
		sprite: function(options) {
			var options = $.extend({
				type: 'sprite',
				bounce: [0, 0, 1000] // up-down, left-right, milliseconds
			}, options || {});
			return $(this).spritely(options);
		},
		pan: function(options) {
			var options = $.extend({
				type: 'pan',
				dir: 'left',
				continuous: true,
				speed: 1 // 1 pixel per ramme
			}, options || {});
			return $(this).spritely(options);
		},
		flyToTap: function(options) {
			var options = $.extend({
				el_to_move: null,
				type: 'moveToTap',
				ms: 1000, // milliseconds
				do_once: true
			}, options || {});
			if (options.el_to_move) {
				$(options.el_to_move).active();
			}
			if ($._spritely.activeSprite) {
				if (window.Touch) { // hær bruker jeg iphone method 
					$(this)[0].ontouchstart = function(e) {
						var el_to_move = $._spritely.activeSprite;
						var touch = e.touches[0];
						var t = touch.pageY - (el_to_move.height() / 2);
						var l = touch.pageX - (el_to_move.width() / 2);
						el_to_move.animate({
							top: t + 'px',
							left: l + 'px'
						}, 1000);
					};
				} else {
					$(this).click(function(e) {
						var el_to_move = $._spritely.activeSprite;
						$(el_to_move).stop(true);
						var w = el_to_move.width();
						var h = el_to_move.height();
						var l = e.pageX - (w / 2);
						var t = e.pageY - (h / 2);
						el_to_move.animate({
							top: t + 'px',
							left: l + 'px'
						}, 1000);
					});
				}
			}
			return this;
		},
                // isDraggable krever jQuery UI
		isDraggable: function(options) {
			if ((!$(this).draggable)) {
				return this;
			}
			var options = $.extend({
				type: 'isDraggable',
				start: null,
				stop: null,
				drag: null
			}, options || {});
			var el_id = $(this).attr('id');
			$._spritely.instances[el_id].isDraggableOptions = options;
			$(this).draggable({
				start: function() {
					var el_id = $(this).attr('id');
					$._spritely.instances[el_id].stop_random = true;
					$(this).stop(true);
					if ($._spritely.instances[el_id].isDraggableOptions.start) {
						$._spritely.instances[el_id].isDraggableOptions.start(this);
					}
				},
				drag: options.drag,
				stop: function() {
					var el_id = $(this).attr('id');
					$._spritely.instances[el_id].stop_random = false;
					if ($._spritely.instances[el_id].isDraggableOptions.stop) {
						$._spritely.instances[el_id].isDraggableOptions.stop(this);
					}
				}
			});
			return this;
		},
		active: function() {
			// the active sprite
			$._spritely.activeSprite = this;
			return this;
		},
		activeOnClick: function() {
			// Gjør dette til den aktive skripten hvis det blir klikket på
			var el = $(this);
			if (window.Touch) { // iphone method 
				el[0].ontouchstart = function(e) {
					$._spritely.activeSprite = el;
				};
			} else {
				el.click(function(e) {
					$._spritely.activeSprite = el;
				});
			}
			return this;
		},
		spRandom: function(options) {
			var options = $.extend({
				top: 50,
				left: 50,
				right: 290,
				bottom: 320,
				speed: 4000,
				pause: 0
			}, options || {});
			var el_id = $(this).attr('id');
			if (!$._spritely.instances[el_id].stop_random) {
				var r = $._spritely.randomIntBetween;
				var t = r(options.top, options.bottom);
				var l = r(options.left, options.right);
				$('#' + el_id).animate({
					top: t + 'px',
					left: l + 'px'
				}, options.speed)
			}
			window.setTimeout(function() {
				$('#' + el_id).spRandom(options);
			}, options.speed + options.pause)
			return this;
		},
		makeAbsolute: function() {
			// fjern et element fra sin nåværende posisjon i DOM-en
			// posisjoner det absolutt, lagt til i body-taggen
			return this.each(function() {
				var el = $(this);
				var pos = el.position();
				el.css({position: "absolute", marginLeft: 0, marginTop: 0, top: pos.top, left: pos.left })
					.remove()
					.appendTo("body");
			});

		},
		spSet: function(prop_name, prop_value) {
			var el_id = $(this).attr('id');
			$._spritely.instances[el_id][prop_name] = prop_value;
			return this;
		},
		spGet: function(prop_name, prop_value) {
			var el_id = $(this).attr('id');
			return $._spritely.instances[el_id][prop_name];
		},
		spStop: function(bool) {
			$(this).each(function() {
				var el_id = $(this).attr('id');
				$._spritely.instances[el_id]['_last_fps'] = $(this).spGet('fps');
				$._spritely.instances[el_id]['_stopped'] = true;
				$._spritely.instances[el_id]['_stopped_f1'] = bool;
				if ($._spritely.instances[el_id]['type'] == 'sprite') {
					$(this).spSet('fps', 0);
				}
				if (bool) {
					// Sett bakgrunnsbildets posisjon til 0
					var bp_top = $._spritely.getBgY($(this));
					$(this).css('background-position', '0 ' + bp_top);
				}
			});
			return this;
		},
		spStart: function() {
			$(this).each(function() {
				var el_id = $(this).attr('id');
				var fps = $._spritely.instances[el_id]['_last_fps'] || 12;
				$._spritely.instances[el_id]['_stopped'] = false;
				if ($._spritely.instances[el_id]['type'] == 'sprite') {
					$(this).spSet('fps', fps);
				}
			});
			return this;
		},
		spToggle: function() {
			var el_id = $(this).attr('id');
			var stopped = $._spritely.instances[el_id]['_stopped'] || false;
			var stopped_f1 = $._spritely.instances[el_id]['_stopped_f1'] || false;
			if (stopped) {
				$(this).spStart();
			} else {
				$(this).spStop(stopped_f1);
			}
			return this;
		},
		fps: function(fps) {
			$(this).each(function() {
				$(this).spSet('fps', fps);
			});
			return this;
		},
		spSpeed: function(speed) {
			$(this).each(function() {
				$(this).spSet('speed', speed);
			});
			return this;
		},
		spRelSpeed: function(speed) {
			$(this).each(function() {
				var rel_depth = $(this).spGet('depth') / 100;
				$(this).spSet('speed', speed * rel_depth);
			});
			return this;
		},
		spChangeDir: function(dir) {
			$(this).each(function() {
				$(this).spSet('dir', dir);
			});
			return this;
		},
		spState: function(n) {
			$(this).each(function() {
				// endre tilstanden til en sprite, der tilstanden er vertikal
				// endre tilstanden til en sprite, hvor tilstanden er den vertikale posisjonen til bakgrunnsbildet (f.eks. frames row)
				var yPos = ((n - 1) * $(this).height()) + 'px';
				var xPos = $._spritely.getBgX($(this));
				var bp = xPos + ' -' + yPos;
				$(this).css('background-position', bp);
			});
			return this;
		},
		lockTo: function(el, options) {
			$(this).each(function() {
				var el_id = $(this).attr('id');
				$._spritely.instances[el_id]['locked_el'] = $(this);
				$._spritely.instances[el_id]['lock_to'] = $(el);
				$._spritely.instances[el_id]['lock_to_options'] = options;
				window.setInterval(function() {
					if ($._spritely.instances[el_id]['lock_to']) {
						var locked_el = $._spritely.instances[el_id]['locked_el'];
						var locked_to_el = $._spritely.instances[el_id]['lock_to'];
						var locked_to_options = $._spritely.instances[el_id]['lock_to_options'];
						var locked_to_el_w = locked_to_options.bg_img_width;
						var locked_to_el_h = locked_to_el.height();
						var locked_to_el_y = $._spritely.getBgY(locked_to_el);
						var locked_to_el_x = $._spritely.getBgX(locked_to_el);
						var el_l = (parseInt(locked_to_el_x) + parseInt(locked_to_options['left']));
						var el_t = (parseInt(locked_to_el_y) + parseInt(locked_to_options['top']));
						el_l = $._spritely.get_rel_pos(el_l, locked_to_el_w);
						$(locked_el).css({
							'top': el_t + 'px',
							'left': el_l + 'px'
						});
					}
				}, options.interval || 20);
			});
			return this;
		}
	})
})(jQuery);
// Stop IE6 from continuously reloading background images.
try {
  document.execCommand("BackgroundImageCache", false, true);
} catch(err) {} 
