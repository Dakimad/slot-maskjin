$(document).ready(function() {
    /**
    * Globale variabler
    */
    var completed = 0,
        imgHeight = 1374,
        posArr = [
            0, //orange
            80, //nummer 7 
            165, //stang
            237, //guava
            310, //banan
            378, //kirsebær
            454, //orange
            539, //nummer 7
            624, //stang
            696, //guava
            769, //banan
            837, //kirsebær
            913, //orange
            1000, //nummer 7
            1085, //stang
            1157, //guava
            1230, //banan
            1298 //kirsebær
        ];
   /**
    * @class Slot
    * @Credits
    */

    var credits = 0; // Definerer en variabel for kreditter
    var win = []; // Flyttet definisjonen inn i $(document).ready()

    // Definer symbolgevinster
    win[0] = win[454] = win[913] = 1;
    win[80] = win[539] = win[1000] = 10000;
    win[165] = win[624] = win[1085] = 3;
    win[237] = win[696] = win[1157] = 4;
    win[310] = win[769] = win[1230] = 5;
    win[378] = win[837] = win[1298] = 6;

/**
    * @class Slot
    * @Credits
    */

    function printResult() {
        var res;
        if (win[a.pos] === win[b.pos] && win[a.pos] === win[c.pos]) {
            if (win[a.pos] === 10000) {
                res = "Du vant 10000 monney!";
                credits += 10000;
            } else {
                res = "Du vant 150 monney!";
                credits += 150;
            }
            updateCredits();
        } else if (win[a.pos] === win[b.pos] || win[a.pos] === win[c.pos] || win[b.pos] === win[c.pos]) {
            res = "Du vant 50 monney!";
            credits += 50; // Legg til 50 monney hvis to like symboler vises
            updateCredits(); // Oppdater visningen av kreditter
        } else {
            res = "Du tapte";
        }
        $('#result').html(res);
    }

    /**
    * @class Slot
    * @constructor
    */
    function Slot(el, max, step) {
        this.speed = 0; // hastighet for sporet til enhver tid
        this.step = step; // hastigheten vil øke med denne frekvensen
        this.si = null; // holder setInterval-objektet for det gitte sporet
        this.el = el; // dom-elementet til sporet
        this.maxSpeed = max; // maksimal hastighet dette sporet kan ha
        this.pos = null; // sluttposisjonen til sporet    
    
        $(el).pan({
            fps: 30,
            dir: 'down'
        });
        $(el).spStop();
    
        var that = this;
    
        function start() {
            console.log("start")
            that.si = window.setInterval(function() {
                that.speed += that.step; // øk hastigheten med den angitte frekvensen
                if (that.speed > that.maxSpeed) {
                    that.speed = that.maxSpeed; // begrens hastigheten til maksimal verdi
                }
                $(el).spSpeed(that.speed); // oppdater hastigheten til sporet
                if (that.pos !== null && that.speed >= that.maxSpeed && $(el).css('top') == that.pos) {
                    window.clearInterval(that.si); // stopp spinn når målet er nådd
                }
            }, 100);
        }
    
        function stop() {
            // Lag en gradvis brems ved å redusere hastigheten når sporet nærmer seg sluttposisjonen
            var currentPos = parseFloat($(el).css('top'));
            var remainingDistance = Math.abs(that.pos - currentPos);
            var slowdownDistance = 100; // Juster denne verdien for å endre avstanden hvor bremsingen starter
            if (remainingDistance < slowdownDistance) {
                that.speed -= that.step; // reduser hastigheten gradvis
                if (that.speed < 0) {
                    that.speed = 0;
                }
                $(el).spSpeed(that.speed); // oppdater hastigheten til sporet
            }
        }
    
        this.startSpin = function(position) {
            console.log("idkman");
            this.pos = position;
            start();
        }
    
        this.stopSpin = function() {
            window.clearInterval(this.si);
            $(el).spSpeed(0);
            stop(); // kall stoppfunksjonen for å implementere gradvis bremsing ved slutten av spinn
        }
    }
    /**
    * @method start
    * Starter et spinn
    */
    Slot.prototype.start = function() {
        var _this = this;
        $(_this.el).addClass('motion');
        $(_this.el).spStart();
        _this.si = window.setInterval(function() {
            if(_this.speed < _this.maxSpeed) {
                _this.speed += _this.step;
                $(_this.el).spSpeed(_this.speed);
            }
        }, 100);
    };

    /**
    * @class Slot
    * @spinn counter
    */
    var spinCounter = 0; // Variabel for å telle antall spinn som er startet

    /**
     * Funksjon for å øke spinn-telleren og oppdatere visningen
     */
    function increaseSpinCounter() {
        spinCounter++; // Øk spinn-telleren med 1
        $('#spin-counter').text('Antall spinn: ' + spinCounter); // Oppdater visningen av antall spinn
    }

    this.startSpin = function(position) {
        console.log("idkman");
        this.pos = position;
        start();
        increaseSpinCounter(); // Kall funksjonen for å øke spinn-telleren
    }

    function updateCredits() {
        $('.credits').text('Credits: ' + credits); // Funksjon for å oppdatere visningen av kreditter
    }

    function addMonney() {
        credits += 5; // Funksjon for å legge til 50 monney og oppdatere counteren
        updateCredits(); // Oppdaterer visningen av kreditter
    }

    /**
    * @method stop
    * Stopper et spinn
    */
    Slot.prototype.stop = function() {
        var _this = this,
            limit = 30;
        clearInterval(_this.si);
        _this.si = window.setInterval(function() {
            if(_this.speed > limit) {
                _this.speed -= _this.step;
                $(_this.el).spSpeed(_this.speed);
            }
            if(_this.speed <= limit) {
                _this.finalPos(_this.el);
                $(_this.el).spSpeed(0);
                $(_this.el).spStop();
                clearInterval(_this.si);
                $(_this.el).removeClass('motion');
                _this.speed = 0;
            }
        }, 100);
    };

    /**
    * Finner den endelige posisjonen til sporet
    */
    Slot.prototype.finalPos = function() {
        var el = this.el,
            el_id,
            pos,
            posMin = 2000000000,
            best,
            bgPos,
            i,
            j,
            k;
// Finn nærmeste posisjon i posArr-listen basert på gjeldende bakgrunnsposisjon og oppdater 'this.pos' til den beste tilpassede posisjonen.
        el_id = $(el).attr('id');
        
        pos = document.getElementById(el_id).style.backgroundPosition;
        pos = pos.split(' ')[1];
        pos = parseInt(pos, 10);

        for(i = 0; i < posArr.length; i++) {
            for(j = 0;;j++) {
                k = posArr[i] + (imgHeight * j);
                if(k > pos) {
                    if((k - pos) < posMin) {
                        posMin = k - pos;
                        best = k;
                        this.pos = posArr[i]; //oppdater den endelige posisjonen til sporet
                    }
                    break;
                }
            }
        }

        best += imgHeight + 4;
        bgPos = "0 " + best + "px";
        $(el).animate({
            backgroundPosition:"(" + bgPos + ")"
        }, {
            duration: 200,
            complete: function() {
                completed ++;
            }
        });
    };
    
    Slot.prototype.reset = function() {
        var el_id = $(this.el).attr('id');
        $._spritely.instances[el_id].t = 0;
        $(this.el).css('background-position', '0px 4px');
        this.speed = 0;
        completed = 0;
        $('#result').html('');
    };

    function enableControl() {
        $('#control').attr("disabled", false);
    }

    function disableControl() {
        $('#control').attr("disabled", true);
    }

    // Opprett sporobjekter
    var a = new Slot('#slot1', 30, 1),
        b = new Slot('#slot2', 45, 2),
        c = new Slot('#slot3', 70, 3);

    /**
    * Kontroller for spilleautomat
    */
    $('#control').click(function() {
        var x;
        if(this.innerHTML == "Start") {
            a.start();
            b.start();
            c.start();
            this.innerHTML = "Stopp";
            
            disableControl(); //deaktiver kontroll til sporene når de når maks hastighet
            
            //sjekk hver 100 ms om sporene har nådd maks hastighet 
            //hvis ja, aktiver kontrollen
            x = window.setInterval(function() {
                if(a.speed >= a.maxSpeed && b.speed >= b.maxSpeed && c.speed >= c.maxSpeed) {
                    enableControl();
                    window.clearInterval(x);
                }
            }, 100);
        } else if(this.innerHTML == "Stopp") {
            a.stop();
            b.stop();
            c.stop();
            this.innerHTML = "Tilbakestill";

            disableControl(); //deaktiver kontroll til sporene stopper
            // Sjekk hvert 100. millisekund om spilleautomatene har stoppet
            // Hvis de har stoppet, aktiver kontrollen
        x = window.setInterval(function() {
            if (a.speed === 0 && b.speed === 0 && c.speed === 0 && completed === 3) {
                 enableControl();
                window.clearInterval(x);
                printResult();
    }
        }, 100);
        } else { // Tilbakestill
            a.reset();
            b.reset();
            c.reset();
            this.innerHTML = "Start";
        }
        });
        });

        