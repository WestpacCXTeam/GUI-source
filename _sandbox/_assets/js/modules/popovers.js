/*! Popovers v2.0.3 */
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
	// public vars
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.lastFocus = {};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// private function: close a popover
	//
	// @param   $parent   [jquery object]  The parent element
	// @param   $popover  [jquery object]  The popover element
	// @param   $body     [jquery object]  The popover body element
	//
	// @return  [none]
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	function closePopover( $parent, $popover, $body ) {
		GUI.debugging( 'popovers: Closing popover', 'report' );

		GUI.popovers.lastFocus.focus();

		$parent.removeClass('is-open');
		$popover.attr('aria-hidden', 'true');
		$body.attr('style', '');
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// private function: open a popover
	//
	// @param   $parent   [jquery object]  The parent element
	// @param   $popover  [jquery object]  The popover element
	// @param   $body     [jquery object]  The popover body element
	// @param   $this     [jquery object]  The clicked element
	//
	// @return  [none]
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	function openPopover( $parent, $popover, $body, $this ) {
		GUI.debugging( 'popovers: Opening popover', 'report' );

		var index = $('.js-popover').index( this );

		GUI.popovers.lastFocus = $(':focus'); //save focus for when we close this thing

		$('.js-popover-styles-' + index).remove(); //remove all previous styles
		$popover.attr('style', '');

		$parent
			.removeClass('is-bottom')
			.addClass('is-open');

		$popover
			.attr('aria-hidden', 'false')
			.focus();

		// get current positions
		var top = parseInt( $popover.offset().top - $(window).scrollTop() );
		var left = parseInt( $popover.offset().left );
		var right = parseInt( $(window).width() - ( $popover.offset().left + $popover.width() ) );
		var bottom = parseInt( $popover.height() ) + parseInt( $this.position().top ) + 70;
		var pageHeight = parseInt( $(document).height() );


		//the popup is cut off on the top
		if( top < 0 ) {
			GUI.debugging( 'popovers: Top boundary detected', 'report' );

			$parent.addClass('is-bottom');

			// if cut-off on the bottom
			if( bottom > pageHeight ) {
				var innerHeight = $body.height();
				var dif = bottom - pageHeight;

				$body.css({
					height: ( innerHeight - dif ),
					overflow: 'auto',
				});
			}
		}


		//the popup is cut off on the left
		if( left < 0 ) {
			GUI.debugging( 'popovers: Left boundary detected', 'report' );

			var className = 'js-popover-' + index;
			var marginLeft = parseInt( $popover.css('marginLeft') );
			var shift = left - 12;

			$popover.css('marginLeft', ( marginLeft - shift ));

			$parent.addClass( className ).before( // STYLE INJECTION
				'<span class="js-popover-styles-' + index + '" style="position:absolute;">' +
				'	<style>' +
				'		.popover-wrapper.' + className + ' .popover-popup:before,' +
				'		.popover-wrapper.' + className + ' .popover-popup:after { margin-left: ' + ( shift - 21 ) + 'px; }' +
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

			$parent.addClass( className ).before( // STYLE INJECTION
				'<span class="js-popover-styles-' + index + '" style="position:absolute;">' +
				'	<style>' +
				'		.popover-wrapper.' + className + ' .popover-popup:before,' +
				'		.popover-wrapper.' + className + ' .popover-popup:after { margin-left: ' + ( (shift * -1) - 21 ) + 'px; }' +
				'	</style>' +
				'</span>'
			);
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//
	// Run this method once after your DOM was loaded
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function popoversInit() {
		GUI.debugging( 'popovers: Initiating', 'report' );

		if( $('.js-popover').length ) {
			GUI.debugging( 'popovers: Found instances', 'report' );

			GUI.popovers.render();
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module render method
	//
	// You can run the render method if you want to bypass the length check or render elements added dynamically to the DOM after loading
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.render = function popoversRender() {
		GUI.debugging( 'popovers: Rendering', 'report' );

		// CLICK
		$('.js-popover').not('.js-rendered').on('click', function popoverClick() {
			GUI.debugging( 'popovers: Popover button clicked', 'interaction' );

			var $this = $(this);
			var $parent = $this.parents('.js-popover-wrapper');
			var _isOpen = $parent.hasClass('is-open');
			var $popover = $parent.find('.popover-popup');
			var $body = $popover.find('.js-popoverbody');

			// CLOSING POPOVER
			if( _isOpen ) {
				closePopover( $parent, $popover, $body );
			}
			else { // OPENING POPOVER
				openPopover( $parent, $popover, $body, $this );
			}
		}).addClass('js-rendered');


		//ESC button listener
		$('.js-popoverbody').not('.js-rendered').keyup(function escapeKey(e) {
			if(e.keyCode == 27) {
				GUI.debugging( 'popovers: Esc button clicked', 'interaction' );

				if( typeof GUI.popovers.lastFocus.focus !== 'undefined' ) {
					GUI.popovers.lastFocus.focus();
				}

				$('.js-popover').parents('.js-popover-wrapper').removeClass('is-open');
				$('.popover-popup').attr('aria-hidden', 'true');
			}
		}).addClass('js-rendered');
	};


	GUI.popovers = module;


	// run module
	GUI.popovers.init();

}(GUI));