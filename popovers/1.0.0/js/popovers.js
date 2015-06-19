/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * popovers
 *
 * Open popovers and readjust position via style injection depending on proximity to outer browser frame.
 *
 **************************************************************************************************************************************************************/


(function(GUI) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function popoversInit() {
		GUI.debugging( 'popovers: Initiating', 'report' );


		if( $('.js-popover').length ) {
			GUI.debugging( 'popovers: Found instances', 'report' );

			// CLICK
			$('.js-popover').on('click', function openPopover() {
				GUI.debugging( 'popovers: Popover button clicked', 'interaction' );

				var $this = $(this);
				var _isOpen = $this.hasClass('is-open');
				var $popover = $this.find('.popover-popup');
				var index = $('.js-popover').index( this );

				// CLOSING POPOVER
				if( _isOpen ) {
					GUI.debugging( 'popovers: Closing popover', 'report' );

					$this
						.removeClass('is-open');

					$popover.attr('aria-hidden', 'true');
				}
				else { // OPENING POPOVER
					GUI.debugging( 'popovers: Opening popover', 'report' );

					$('.js-popover-styles-' + index).remove(); //remove all previous styles
					$popover.attr('style', '');

					$this
						.removeClass('is-bottom')
						.addClass('is-open');

					$popover.attr('aria-hidden', 'false');

					// get current positions
					var top = parseInt( $popover.offset().top - $(window).scrollTop() );
					var left = parseInt( $popover.offset().left );
					var right = parseInt( $(window).width() - ( $popover.offset().left + $popover.width() ) );


					//the popup is cut off on the top
					if( top < 0 ) {
						GUI.debugging( 'popovers: Top boundary detected', 'report' );

						$this.addClass('is-bottom');
					}


					//the popup is cut off on the left
					if( left < 0 ) {
						GUI.debugging( 'popovers: Left boundary detected', 'report' );

						var className = 'js-popover-' + index;
						var marginLeft = parseInt( $popover.css('marginLeft') );
						var shift = left - 12;

						$popover.css('marginLeft', ( marginLeft - shift ));


						$this.addClass( className ).before( // STYLE INJECTION
							'<span class="js-popover-styles-' + index + '" style="position:absolute;">' +
							'	<style>' +
							'		.popover.' + className + ' .popover-popup:before,' +
							'		.popover.' + className + ' .popover-popup:after { margin-left: ' + ( shift - 21 ) + 'px; }' +
							'	</style>' +
							'</span>'
						);
					}


					//the popup is cut off on the right
					if( right < 0 ) {
						GUI.debugging( 'popovers: Right boundary detected', 'report' );

						var className = 'js-popover-' + index;
						var marginLeft = parseInt( $popover.css('marginLeft') );
						var shift = right - 12;

						$popover.css('marginLeft', ( marginLeft + shift ));


						$this.addClass( className ).before( // STYLE INJECTION
							'<span class="js-popover-styles-' + index + '" style="position:absolute;">' +
							'	<style>' +
							'		.popover.' + className + ' .popover-popup:before,' +
							'		.popover.' + className + ' .popover-popup:after { margin-left: ' + ( (shift * -1) - 21 ) + 'px; }' +
							'	</style>' +
							'</span>'
						);
					}
				}
			});
		}
	};


	GUI.popovers = module;


	// run module
	GUI.popovers.init();

}(GUI));