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
		DEBUG: true, //debugging infos


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