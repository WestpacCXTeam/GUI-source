/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * tabcordion-soft
 *
 * This module includes the API for collapsible as well as the tabcordion logic.
 *
 **************************************************************************************************************************************************************/


(function(GUI) {

	var collapsible = {};
	var api = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// public API function: collapsible
	//
	// @param   target       [string]    Selector for target element to toggle is-open class
	// @param   _isAnimated  [boolean]   Wether or not to animate the height
	// @param   Callback     [function]  Callback function executed after completion
	//
	// @return  [none]
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	api.toggle = function( target, _isAnimated, Callback ) {
		GUI.debugging( 'collapsible: Toggle called', 'report' );

		if( target instanceof jQuery ) {
			var $targets = target;
		}
		else {
			var $targets = $( target );
		}


		$targets.each(function iterateTargets() { //iterate over each element for toggling

			var $target = $(this);
			var _isOpen = $target.hasClass('is-open');

			if( _isOpen ) {
				GUI.collapsible.close( $target, _isAnimated, Callback );
			}
			else {
				GUI.collapsible.open( $target, _isAnimated, Callback );
			}

		});
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// public API function: collapsible closing
	//
	// @param   target       [string]    Selector for target element to toggle is-open class
	// @param   _isAnimated  [boolean]   Wether or not to animate the height
	// @param   Callback     [function]  Callback function executed after completion
	//
	// @return  [none]
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	api.close = function closingCollapsible( target, _isAnimated, Callback ) {
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
			.removeClass('is-open')
			.attr('aria-hidden', 'true');

		if( _isAnimated ) {
			$target
				.stop(true)
				.animate({ 'height': 0 }, 400, Callback);
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
	// @param   target       [string]    Selector for target element to toggle is-open class
	// @param   _isAnimated  [boolean]   Whether or not to animate the height
	// @param   Callback     [function]  Callback function executed after completion
	//
	// @return  [none]
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	api.open = function openingCollapsible( target, _isAnimated, Callback ) {
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
			.addClass('is-open')
			.attr('aria-hidden', 'false');

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
	collapsible.init = function initTabcodions() {
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

					//animating transition
					if( _isAccordion ) {
						GUI.collapsible.close( $tabs.filter('.is-open'), true );
						GUI.collapsible.open( $tabcordion.find( target ), true, function scrollToTab() {
							//scroll to top
							$('html, body').animate({ scrollTop: ( $this.offset().top - 60 ) }, 300);
						});
					}
					else {
						GUI.collapsible.close( $tabs.filter('.is-open'), false, function closingCallback() {
							GUI.collapsible.open( $tabcordion.find( target ), false );
						});
					}

					//adding active states to tabs and headers
					$tabcordion.find('.js-collapsible').parent().removeClass('is-active');
					$tabcordion.find('.js-collapsible[data-collapsible="' + target + '"], .js-collapsible[href="' + target + '"]').parent().addClass('is-active');

				}
				else {
					GUI.debugging( 'collapsible: triggering pure toggle', 'report' );

					var mode = $this.attr('data-collapsible-mode');

					//collapsible API
					if( mode === 'show' ) {
						GUI.collapsible.open( target, true );
					}
					else if( mode === 'hide' ) {
						GUI.collapsible.close( target, true );
					}
					else {
						GUI.collapsible.toggle( target, true );
					}
				}

			});

		}
	};


	GUI.tabcordionSoft = collapsible;
	GUI.collapsible = api;


	// run module
	GUI.tabcordionSoft.init();

}(GUI));