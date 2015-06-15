/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * tabcordion-soft
 *
 * This module includes the API for collapsible as well as the tabcordion logic.
 *
 **************************************************************************************************************************************************************/


(function(GUI) {

	var module = {};
	var module2 = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// public API function: collapsible
	//
	// target       [string]    Selector for target element to toggle is-open class
	// _isAnimated  [boolean]   Wether or not to animate the height
	// Callback     [function]  Callback function executed after completion
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module2.toggle = function( target, _isAnimated, Callback ) {
		GUI.debugging( 'collapsible: Toggle called', 'report' );

		if( target instanceof jQuery ) {
			var $target = target;
		}
		else {
			var $target = $( target );
		}

		var _isOpen = $target.hasClass('is-open');

		if( _isOpen ) {
			GUI.collapsible.close( target, _isAnimated, Callback );
		}
		else {
			GUI.collapsible.open( target, _isAnimated, Callback );
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// public API function: collapsible closing
	//
	// target       [string]    Selector for target element to toggle is-open class
	// _isAnimated  [boolean]   Wether or not to animate the height
	// Callback     [function]  Callback function executed after completion
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module2.close = function closingCollapsible( target, _isAnimated, Callback ) {
		GUI.debugging( 'collapsible: closing element "' + target + '"', 'report' );

		if( target instanceof jQuery ) {
			var $target = target;
		}
		else {
			var $target = $( target );
		}

		if( !$target.length ) {
			GUI.debugging( 'collapsible: no element found to close', 'error' );
			return;
		}

		var oldHeight = $target.height();

		$target
			.css({ 'height': oldHeight })
			.removeClass('is-open');

		if( _isAnimated ) {
			$target.stop(true).animate({ 'height': 0 }, 400, Callback);
		}
		else {
			$target.css({ 'height': 0 });

			if( typeof Callback !== 'undefined' ) {
				Callback();
			}
		}

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// public API function: collapsible opening
	//
	// target       [string]    Selector for target element to toggle is-open class
	// _isAnimated  [boolean]   Wether or not to animate the height
	// Callback     [function]  Callback function executed after completion
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module2.open = function openingCollapsible( target, _isAnimated, Callback ) {
		GUI.debugging( 'collapsible: opening element "' + target + '"', 'report' );

		if( target instanceof jQuery ) {
			var $target = target;
		}
		else {
			var $target = $( target );
		}

		if( !$target.length ) {
			GUI.debugging( 'collapsible: no element found to open', 'error' );
			return;
		}

		if( _isAnimated ) {
			var oldHeight = $target.css('height');
			var height = $target.css({ 'height': 'auto' }).height();
			$target.css({ 'height': oldHeight });
		}

		$target
			.addClass('is-open');

		if( _isAnimated ) {
			$target.stop(true).animate({ 'height': height }, 400, function animateCallback() {
				$target.css({ 'height': '' });

				if( typeof Callback !== 'undefined' ) {
					Callback();
				}
			});
		}
		else {
			$target.css({ 'height': '' });

			if( typeof Callback !== 'undefined' ) {
				Callback();
			}
		}

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function initTabcodions() {
		GUI.debugging( 'tabcordion-soft: Initiating', 'report' );

		if( $('.js-collapsible').length ) {
			GUI.debugging( 'tabcordion-soft: found instance', 'report' );

			$('.js-collapsible').on('click', function clickCollapsible(e) {
				GUI.debugging( 'collapsible: collapsible clicked', 'interaction' );
				e.preventDefault();

				var $this = $(this);
				var target = $this.attr('href') ? $this.attr('href') : $this.attr('data-collapsible');
				var $tabcordion = $this.parents('.tabcordion')

				if( $tabcordion.length ) {
					GUI.debugging( 'collapsible: found to be inside tabcordion', 'report' );

					var $tabs = $this.parents('.tabcordion').find('.collapsible-body');
					var _isMobile = parseInt( $('html').css('line-height') ) === 1; //responsive animations (requires responsive css on html)
					var _isAccordion = true;

					if( !_isMobile ) {
						_isAccordion = false;

						if( $this.parents('.tabcordion-accordion').length ) {
							_isAccordion = true;
						}
					}

					if( $this.parents('.tabcordion-tabs').length ) {
						_isAccordion = false;
					}

					if( _isAccordion ) {
						GUI.collapsible.close( $tabs.filter('.is-open'), true );
						GUI.collapsible.open( $tabcordion.find( target ), true, function scrollToTab() {
							$('html, body').animate({ scrollTop: ( $this.offset().top - 60 ) }, 300);
						});
					}
					else {
						GUI.collapsible.close( $tabs.filter('.is-open'), false, function closingCallback() {
							GUI.collapsible.open( $tabcordion.find( target ), false );
						});
					}


				}
				else {
					GUI.debugging( 'collapsible: triggering toggle', 'report' );

					GUI.collapsible.toggle( target, true );
				}

			});

		}
	};


	GUI.tabcordionSoft = module;
	GUI.collapsible = module2;


	// run module
	GUI.tabcordionSoft.init();

}(GUI));