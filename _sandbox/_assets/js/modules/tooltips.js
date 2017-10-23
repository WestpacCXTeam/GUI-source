/*! Tooltips v2.0.3 */
/***************************************************************************************************************************************************************
 *
 * tooltips
 *
 * Creating spans to attach tooltips to.
 *
 **************************************************************************************************************************************************************/


(function(GUI) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//
	// Run this method once after your DOM was loaded
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function tooltipsInit() {
		GUI.debugging( 'tooltips: Initiating', 'report' );

		if( $('.js-tooltip').length ) {
			GUI.debugging( 'tooltips: Found instance', 'report' );

			GUI.tooltips.render();
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module render method
	//
	// You can run the render method if you want to bypass the length check or render elements added dynamically to the DOM after loading
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.render = function tooltipsRender() {
		GUI.debugging( 'tooltips: Rendering', 'report' );

		$('.js-tooltip').not('.js-rendered').each(function( i ) {
			var $this = $(this);
			var tooltip = $this.attr('title');
			var ID = 'tooltipBubbleID' + i;

			var $tooltip = $('<div/>')
				.text( tooltip )
				.addClass('tooltip-bubble ' + ID)
				.attr('id', ID);

			$this
				.append( $tooltip )
				.attr('aria-describedby', ID);
		}).addClass('js-rendered');
	};


	GUI.tooltips = module;


	// run module
	GUI.tooltips.init();

}(GUI));