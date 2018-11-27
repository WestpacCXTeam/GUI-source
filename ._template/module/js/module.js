/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * [-Module-]
 *
 * Description of module
 *
 **************************************************************************************************************************************************************/


(function(GUI) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//
	// Run this method once after your DOM was loaded
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function [-Module-]Init() {
		GUI.debugging( '[-Module-]: Initiating', 'report' );

		// Check the module exists on the page
		if( $('.js-[-Module-]').length ) {
			GUI.debugging( '[-Module-]: Found instance', 'report' );

			GUI.[-Module-].render();
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module render method
	//
	// You can run the render method if you want to bypass the length check or render elements added dynamically to the DOM after loading
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.render = function [-Module-]Render() {
		GUI.debugging( '[-Module-]: Rendering', 'report' );

		// Some js stuff...
	};


	GUI.[-Module-] = module;


	// run module
	GUI.[-Module-].init();

}(GUI));