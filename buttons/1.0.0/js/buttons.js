/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * buttons
 *
 * Description of module
 *
 **************************************************************************************************************************************************************/


(function(GUI) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// private function: open / close a dropdown
	//
	// _isOpen  [boolen]         Whether to open or close the dropdown
	// $parent  [jquery object]  The parent element
	// $menu    [jquery object]  The dropdown menu element
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	function toggelDropdown(_isOpen, $parent, $menu) {
		GUI.debugging( 'buttons: ' + ( _isOpen ? 'Closing' : 'Opening' ) + ' dropdown menu', 'report' );

		if( !_isOpen ) {
			$parent.addClass('is-open');
			$menu.attr('aria-hidden', 'false');
		}
		else {
			$parent.removeClass('is-open');
			$menu.attr('aria-hidden', 'true');
		}

	}

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function buttonsInit() {
		GUI.debugging( 'buttons: Initiating', 'report' );


		if( $('.js-button-dropdown').length ) {
			GUI.debugging( 'buttons: Found instances', 'report' );

			$('.dropdown-menu').attr('aria-hidden', 'true');

			$('.js-button-dropdown').on('click', function toggelDropdownButton() {
				GUI.debugging( 'buttons: dropdown button clicked', 'interaction' );

				var $this = $(this);
				var $parent = $this.parent('div');
				var $menu = $this.next('.dropdown-menu');
				var _isOpen = $parent.hasClass('is-open');

				toggelDropdown(_isOpen, $parent, $menu);

			});

			//ESC button listener
			$(document).keyup(function escapeKey(e) {
				if(e.keyCode == 27) {
					GUI.debugging( 'buttons: Esc button clicked', 'interaction' );

					toggelDropdown(true, $('.btn-dropdown'), $('.dropdown-menu'));
				}
			});
		}
	};


	GUI.buttons = module;


	// run module
	GUI.buttons.init();

}(GUI));