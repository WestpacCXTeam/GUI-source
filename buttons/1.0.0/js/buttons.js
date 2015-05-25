/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * buttons
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
		App.debugging( 'buttons: Initiating', 'report' );


		if( $('.js-button-dropdown').length ) {
			App.debugging( 'buttons: Found instances', 'report' );

			$('.dropdown-menu').attr('aria-hidden', 'true');

			$('.js-button-dropdown').on('click', function() {
				var $this = $(this);
				var $parent = $this.parent('div');
				var $menu = $this.next('.dropdown-menu');
				var _isOpen = $parent.hasClass('is-open');

				if( !_isOpen ) {
					$parent.addClass('is-open');
					$menu.attr('aria-hidden', 'false');
				}
				else {
					$parent.removeClass('is-open');
					$menu.attr('aria-hidden', 'true');
				}

			});
		}
	};


	App.buttons = module;


	// run module
	App.buttons.init();

}(App));