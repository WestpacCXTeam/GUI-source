/*![Module-Version]*/
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
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function tooltipsInit() {
		GUI.debugging( 'tooltips: Initiating', 'report' );


		if( $('.js-tooltip').length ) {
			GUI.debugging( 'tooltips: Found instance', 'report' );

			$('.js-tooltip').each(function( i ) {
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
			});
		}
	};


	GUI.tooltips = module;


	// run module
	GUI.tooltips.init();

}(GUI));