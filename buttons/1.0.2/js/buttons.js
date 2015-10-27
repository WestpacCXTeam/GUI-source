/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * buttons
 *
 * JS for toggling dropdown classes, aria-hidden attr and ESC button listener
 *
 **************************************************************************************************************************************************************/


(function(GUI) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// public vars
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.lastFocus = {};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// private function: open / close a dropdown
	//
	// @param   _isOpen  [boolen]         Whether to open or close the dropdown
	// @param   $parent  [jquery object]  The parent element
	// @param   $menu    [jquery object]  The dropdown menu element
	//
	// @return  [none]
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	function toggelDropdown(_isOpen, $parent, $menu) {
		GUI.debugging( 'buttons: ' + ( _isOpen ? 'Closing' : 'Opening' ) + ' dropdown menu', 'report' );

		if( !_isOpen ) { //opening dropdown
			GUI.buttons.lastFocus = $(':focus');

			toggelDropdown(true, $('.btn-dropdown'), $('.dropdown-menu')); //close all open dropdowns

			$parent.addClass('is-open');
			$menu
				.attr('aria-hidden', 'false')
				.focus()
				.trap();
		}
		else { //closing dorpdown
			GUI.buttons.lastFocus.focus();

			$parent.removeClass('is-open');
			$menu
				.attr('aria-hidden', 'true')
				.untrap();
		}

	}

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//
	// Run this method once after your DOM was loaded
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function buttonsInit() {
		GUI.debugging( 'buttons: Initiating', 'report' );

		if( $('.js-button-dropdown').length ) {
			GUI.debugging( 'buttons: Found instances', 'report' );

			GUI.buttons.render();
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module render method
	//
	// You can run the render method if you want to bypass the length check or render elements added dynamically to the DOM after loading
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.render = function buttonsRender() {
		GUI.debugging( 'buttons: Rendering', 'report' );

		$('.dropdown-menu').attr('aria-hidden', 'true');

		//open/close dropdown
		$('.js-button-dropdown').not('.js-rendered').on('click', function toggelDropdownButton() {
			GUI.debugging( 'buttons: dropdown button clicked', 'interaction' );

			var $this = $(this);
			var $parent = $this.parents('.js-dropdown');
			var $menu = $this.next('.dropdown-menu');
			var _isOpen = $parent.hasClass('is-open');

			toggelDropdown(_isOpen, $parent, $menu);
		}).addClass('js-rendered');


		//ESC button listener
		$('.js-button-dropdownbody').not('.js-rendered').keyup(function escapeKey(e) {
			if(e.keyCode == 27) {
				GUI.debugging( 'buttons: Esc button clicked', 'interaction' );

				toggelDropdown(true, $('.btn-dropdown'), $('.dropdown-menu'));
			}
		}).addClass('js-rendered');
	};


	GUI.buttons = module;


	// run module
	GUI.buttons.init();

}(GUI));