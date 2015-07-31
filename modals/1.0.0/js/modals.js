/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * modals
 *
 * Toggeling classes and aria-hidden attr with public API or on click or ESC press
 *
 **************************************************************************************************************************************************************/


/*!
Copyright (c) 2011, 2012 Julien Wajsberg <felash@gmail.com>
All rights reserved.

Official repository: https://github.com/julienw/jquery-trap-input
License is there: https://github.com/julienw/jquery-trap-input/blob/master/LICENSE
This is version 1.2.0.
*/
(function(a,b){function d(a){if(a.keyCode===9){var b=!!a.shiftKey;e(this,a.target,b)&&(a.preventDefault(),a.stopPropagation())}}function e(a,b,c){var d=i(a),e=b,f,g,h,j;do{f=d.index(e),g=f+1,h=f-1,j=d.length-1;switch(f){case-1:return!1;case 0:h=j;break;case j:g=0}c&&(g=h),e=d.get(g);try{e.focus()}catch(k){}}while(b===b.ownerDocument.activeElement);return!0}function f(){return this.tabIndex>0}function g(){return!this.tabIndex}function h(a,b){return a.t-b.t||a.i-b.i}function i(b){var c=a(b),d=[],e=0;return m.enable&&m.enable(),c.find("a[href], link[href], [draggable=true], [contenteditable=true], :input:enabled, [tabindex=0]").filter(":visible").filter(g).each(function(a,b){d.push({v:b,t:0,i:e++})}),c.find("[tabindex]").filter(":visible").filter(f).each(function(a,b){d.push({v:b,t:b.tabIndex,i:e++})}),m.disable&&m.disable(),d=a.map(d.sort(h),function(a){return a.v}),a(d)}function j(){return this.keydown(d),this.data(c,!0),this}function k(){return this.unbind("keydown",d),this.removeData(c),this}function l(){return!!this.data(c)}var c="trap.isTrapping";a.fn.extend({trap:j,untrap:k,isTrapping:l});var m={};a.find.find&&a.find.attr!==a.attr&&function(){function e(a){var d=a.getAttributeNode(c);return d&&d.specified?parseInt(d.value,10):b}function f(){d[c]=d.tabIndex=e}function g(){delete d[c],delete d.tabIndex}var c="tabindex",d=a.expr.attrHandle;m={enable:f,disable:g}}()})(jQuery);


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
				.addClass('modal-backdrop js-modalclose')
				.attr('data-modal', target)
				.css('opacity', 0)
				.insertAfter( $modal )
				.fadeTo( 250, 1 );
		}

	}

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function modalsInit() {
		GUI.debugging( 'modals: Initiating', 'report' );


		if( $('.js-modal').length ) {
			GUI.debugging( 'modals: Found instances', 'report' );

			//open button click
			$('.js-modal').on('click', function openModal() {
				GUI.debugging( 'modals: Open button clicked', 'interaction' );

				var $this = $(this);
				var target = $this.attr('data-modal');
				var $modal = $( target );
				var _isOpen = $modal.hasClass('is-open');

				GUI.modals.toggelModal(_isOpen, $modal, target);
			});


			//close button click
			$(document).on('click', '.js-modalclose', function openModal() {
				GUI.debugging( 'modals: Close button / backdrop clicked', 'interaction' );

				var $this = $(this);
				var $modal = $('.modal');

				GUI.modals.toggelModal(true, $modal, '');
			});


			//ESC button listener
			$(document).keyup(function escapeKey(e) {
				if(e.keyCode == 27) {
					GUI.debugging( 'modals: Esc button clicked', 'interaction' );

					var $modal = $('.modal');

					GUI.modals.toggelModal(true, $modal, '');
				}
			});

		}
	};


	GUI.modals = module;


	// run module
	GUI.modals.init();

}(GUI));