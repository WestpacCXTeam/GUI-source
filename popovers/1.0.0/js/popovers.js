/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * popovers
 *
 * Description of module
 *
 **************************************************************************************************************************************************************/


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'popovers: Initiating', 'report' );


		$('.js-popover').on('click', function openPopover() {
			App.debugging( 'popovers: popover button clicked', 'interaction' );

			var $this = $(this);
			var _isOpen = $this.hasClass('is-open');
			var $popover = $this.find('.popover-popup');
			var index = $('.js-popover').index( this );

			if( _isOpen ) {
				App.debugging( 'popovers: closing popover', 'report' );

				$this
					.removeClass('is-open');

				$popover.attr('aria-hidden', 'true');
			}
			else {
				App.debugging( 'popovers: opening popover', 'report' );

				$('.js-popover-styles-' + index).remove();
				$popover.attr('style', '');

				$this
					.removeClass('is-bottom')
					.addClass('is-open');

				$popover.attr('aria-hidden', 'false');

				var top = parseInt( $popover.offset().top - $(window).scrollTop() );
				var left = parseInt( $popover.offset().left );
				var right = parseInt( $(window).width() - ( $popover.offset().left + $popover.width() ) );


				if( top < 0 ) { //the popup is cut off on the top
					App.debugging( 'popovers: top boundary detected', 'report' );

					$this.addClass('is-bottom');
				}


				if( left < 0 ) { //the popup is cut off on the left
					App.debugging( 'popovers: left boundary detected', 'report' );

					var className = 'js-popover-' + index;
					var marginLeft = parseInt( $popover.css('marginLeft') );
					var shift = left - 12;

					$popover.css('marginLeft', ( marginLeft - shift ));

					$this.addClass( className ).before(
						'<span class="js-popover-styles-' + index + '" style="position:absolute;">' +
						'	<style>' +
						'		.popover.' + className + ' .popover-popup:before,' +
						'		.popover.' + className + ' .popover-popup:after { margin-left: ' + ( shift - 21 ) + 'px; }' +
						'	</style>' +
						'</span>'
					);
				}


				if( right < 0 ) { //the popup is cut off on the right
					App.debugging( 'popovers: right boundary detected', 'report' );

					var className = 'js-popover-' + index;
					var marginLeft = parseInt( $popover.css('marginLeft') );
					var shift = right - 12;

					$popover.css('marginLeft', ( marginLeft + shift ));

					$this.addClass( className ).before(
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
	};


	App.popovers = module;


	// run module
	App.popovers.init();

}(App));