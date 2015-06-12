/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * Westpac GUI framework and settings
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
		init: function guiInit() {
			if( GUI.DEBUG ) console.log('%cDEBUGGING INFORMATION', 'font-size: 25px;');

			//remove fallback HTML
			$('html')
				.removeClass('no-js')
				.addClass('js');

		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// debounce function by _underscore.js
		//
		// func       [function]  Function to be executed
		// wait       [integer]   Wait for next iteration for n in milliseconds
		// immediate  [boolean]   Trigger the function on the leading edge, instead of the trailing
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
						GUI.debugging( 'Base: Debounce executed', 'report' );

						func.apply(context, args);
					}
				};

				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);

				if(callNow) {
					GUI.debugging( 'Base: Debounce executed', 'report' );

					func.apply(context, args);
				}
			};
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// debugging prettiness
		//
		// text  [string]  Text to be printed to debugger
		// code  [string]  The urgency as a string: ['report', 'error', 'interaction', 'send', 'receive']
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