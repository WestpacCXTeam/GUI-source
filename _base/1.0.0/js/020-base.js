/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * Westpac GUI framework
 *
 * This base includes a debugging console and debounce and throttle functions.
 *
 **************************************************************************************************************************************************************/

'use strict';


var GUI = (function guiInit() {

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// settings
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	return {
		DEBUG: [Debug], //debugging infos


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Initiate GUI
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		init: function GuiInit() {
			if( !window.console ) { //removing console.log from IE8
				console = {
					log: function() {}
				};
			}

			if( GUI.DEBUG ) console.log('%cDEBUGGING INFORMATION', 'font-size: 25px;');

			//remove fallback HTML class
			$('html')
				.removeClass('no-js')
				.addClass('js');

		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// debounce function by _underscore.js
		//
		// @param   func       [function]  Function to be executed
		// @param   wait       [integer]   Wait for next iteration for n in milliseconds
		// @param   immediate  [boolean]   Trigger the function on the leading edge [true], instead of the trailing [false]
		//
		// @return  [function]
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		debounce: function Debounce(func, wait, immediate) {
			GUI.debugging( 'Base: Debounce called', 'report' );

			var timeout;
			return function() {
				var context = this;
				var args = arguments;

				var later = function() {
					timeout = null;

					if(!immediate) {
						GUI.debugging( 'Base: Debounce executed (1)', 'report' );

						func.apply(context, args);
					}
				};

				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);

				if(callNow) {
					GUI.debugging( 'Base: Debounce executed (2)', 'report' );

					func.apply(context, args);
				}
			};
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// throttle function
		//
		// @param   func       [function]  Function to be executed
		// @param   wait       [integer]   Run as much as possible without ever going more than once per [n in milliseconds] duration
		//
		// @return  [function]
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		throttle: function Throttle(func, wait) {
			GUI.debugging( 'Base: Throttle called', 'report' );

			wait || (wait = 250);
			var last;
			var deferTimer;

			return function() {
				var context = this;
				var now = +new Date;
				var args = arguments;

				if(last && now < last + wait) {
					clearTimeout(deferTimer);

					deferTimer = setTimeout(function() {
						GUI.debugging( 'Base: Throttle executed (1)', 'report' );

						last = now;
						func.apply(context, args);
					}, wait);
				}
				else {
					GUI.debugging( 'Base: Throttle executed (2)', 'report' );

					last = now;
					func.apply(context, args);
				}
			};
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// debugging prettiness
		//
		// @param   text  [string]  Text to be printed to debugger
		// @param   code  [string]  The urgency as a string: ['report', 'error', 'interaction', 'send', 'receive']
		//
		// @return  [none]
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		debugging: function Debug( text, code ) {

			if( code === 'report' ) {
				if( GUI.DEBUG ) console.log('%c\u2611 ', 'color: green; font-size: 18px;', text);
			}

			else if( code === 'error' ) {
				if( GUI.DEBUG ) console.log('%c\u2612 ', 'color: red; font-size: 18px;', text);
			}

			else if( code === 'interaction' ) {
				if( GUI.DEBUG ) console.log('%c\u261C ', 'color: blue; font-size: 18px;', text);
			}

			else if( code === 'send' ) {
				if( GUI.DEBUG ) console.log('%c\u219D ', 'color: pink; font-size: 18px;', text);
			}

			else if( code === 'receive' ) {
				if( GUI.DEBUG ) console.log('%c\u219C ', 'color: pink; font-size: 18px;', text);
			}

		}

	}

}());


//run GUI
GUI.init();