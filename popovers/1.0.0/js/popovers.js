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
			App.debugging( 'popovers: Initiating', 'report' );

			var $this = $(this);
			var _isOpen = $this.hasClass('is-open');

			if( _isOpen ) {
				$this.removeClass('is-open');
			}
			else {
				$this.addClass('is-open');
			}
		});
	};


	App.popovers = module;


	// run module
	App.popovers.init();

}(App));