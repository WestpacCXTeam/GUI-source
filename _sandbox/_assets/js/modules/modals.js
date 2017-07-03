/*! Modals v2.0.3 */
/***************************************************************************************************************************************************************
 *
 * modals
 *
 * Toggeling classes and aria-hidden attr with public API or on click or ESC press
 *
 **************************************************************************************************************************************************************/


(function(GUI) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// public vars
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.lastFocus = {};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// public API function: open / close a modal
	//
	// @param   _isOpen  [boolean]        Whether to open or close the modal
	// @param   $modal   [jquery object]  The modal element
	// @param   target   [string]         Selector string to id the modal for opening only
	//
	// @return  [none]
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.toggelModal = function toggelModal(_isOpen, $modal, target) {
		GUI.debugging( 'modals: ' + ( _isOpen ? 'Closing' : 'Opening' ) + ' modal', 'report' );

		if( _isOpen ) { //closing modal
			$modal
				.removeClass('is-open')
				.attr('aria-hidden', 'true')
				.untrap(); //untrap focus

			$('.modal-backdrop').fadeTo( 200, 0, function fadeOut() {
				$('.modal-backdrop').remove();
			});

			GUI.modals.lastFocus.focus();
		}
		else { //opening modal
			GUI.modals.lastFocus = $(':focus');

			$modal
				.addClass('is-open')
				.attr('aria-hidden', 'false')
				.focus()
				.trap(); //trap focus

			$('<div/>')
				.addClass('modal-backdrop')
				.on('click', function modalBackdrop() {
					GUI.debugging( 'modals: Backdrop clicked', 'interaction' );

					GUI.modals.toggelModal(true, $('.modal'), '');
				})
				.css('opacity', 0)
				.insertAfter( $modal )
				.fadeTo( 250, 1 );
		}

	}

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//
	// Run this method once after your DOM was loaded
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function modalsInit() {
		GUI.debugging( 'modals: Initiating', 'report' );

		if( $('.js-modal').length ) {
			GUI.debugging( 'modals: Found instances', 'report' );

			GUI.modals.render();
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module render method
	//
	// You can run the render method if you want to bypass the length check or render elements added dynamically to the DOM after loading
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.render = function modalsRender() {
		GUI.debugging( 'modals: Rendering', 'report' );

		//open button click
		$('.js-modal').not('.js-rendered').on('click', function openModal() {
			GUI.debugging( 'modals: Open button clicked', 'interaction' );

			var $this = $(this);
			var target = $this.attr('data-modal');
			var $modal = $( target );
			var _isOpen = $modal.hasClass('is-open');

			GUI.modals.toggelModal(_isOpen, $modal, target);
		}).addClass('js-rendered');

		//ESC button listener
		$('.js-modalbody').not('.js-rendered').keyup(function escapeKey(e) {
			if(e.keyCode == 27) {
				GUI.debugging( 'modals: Esc button clicked', 'interaction' );

				var $modal = $('.modal');

				GUI.modals.toggelModal(true, $modal, '');
			}
		}).addClass('js-rendered');

		//close button click
		$('.js-modalclose').not('.js-rendered').on('click', function modalCloseButton() {
			GUI.debugging( 'modals: Close button clicked', 'interaction' );

			var $modal = $('.modal');

			GUI.modals.toggelModal(true, $modal, '');
		}).addClass('js-rendered');
	}


	GUI.modals = module;


	// run module
	GUI.modals.init();

}(GUI));