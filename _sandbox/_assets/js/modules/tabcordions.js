/*! Tabcordions v4.1.1 */
/***************************************************************************************************************************************************************
 *
 * tabcordion-soft
 *
 * This module includes the API for collapsible as well as the tabcordion logic.
 *
 **************************************************************************************************************************************************************/


(function(GUI) {

	var tabcordion = {};
	var collapsible = {};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// public API function: collapsible
	//
	// @param   target       [string]    Selector for target element to toggle is-open class
	// @param   _isAnimated  [boolean]   Wether or not to animate the height
	// @param   Callback     [function]  Callback function executed after completion
	//
	// @return  [none]
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	collapsible.toggle = function( target, _isAnimated, Callback ) {
		GUI.debugging( 'collapsible: Toggle called', 'report' );

		if( target instanceof jQuery ) {
			var $targets = target;
		}
		else {
			var $targets = $( target );
		}


		jQuery.fn.reverse = [].reverse; //adding reverse to jquery

		$targets.reverse().each(function iterateTargets() { //iterate over each element for toggling

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
	collapsible.close = function closingCollapsible( target, _isAnimated, Callback ) {
		GUI.debugging( 'collapsible: Closing element "' + target + '"', 'report' );

		if( target instanceof jQuery ) {
			var $target = target;
		}
		else {
			var $target = $( target );
		}

		if( !$target.length ) {
			GUI.debugging( 'collapsible: No element found to close', 'error' );
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
				.animate({ 'height': 0 }, 300, Callback);
		}
		else {
			$target.css({ 'height': 0 });

			if( typeof Callback !== 'undefined' && Callback !== null ) {
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
	// @param   withFocus    [boolean]   Should the focus move to the opened element? Default true
	//
	// @return  [none]
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	collapsible.open = function openingCollapsible( target, _isAnimated, Callback, withFocus ) {
		GUI.debugging( 'collapsible: Opening element "' + target + '"', 'report' );

		if( withFocus === undefined ) {
			withFocus = true;
		}

		if( target instanceof jQuery ) {
			var $target = target;
		}
		else {
			var $target = $( target );
		}

		if( !$target.length ) {
			GUI.debugging( 'collapsible: No element found to open', 'error' );
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

		if( withFocus ) {
			$target.first().focus();
		}

		if( _isAnimated ) {
			$target.stop(true).animate({ 'height': height }, 400, function animateCallback() {
				$target.css({ 'height': '' });

				if( typeof Callback !== 'undefined' && Callback !== null ) {
					Callback();
				}
			});
		}
		else {
			$target.css({ 'height': '' });

			if( typeof Callback !== 'undefined' && Callback !== null ) {
				Callback();
			}
		}

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//
	// Run this method once after your DOM was loaded
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	tabcordion.init = function tabcodionsInit() {
		GUI.debugging( 'tabcordion: Initiating', 'report' );

		if( $('.js-collapsible').length ) {
			GUI.debugging( 'tabcordion: Found instance', 'report' );

			GUI.tabcordion.render();
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module render method
	//
	// You can run the render method if you want to bypass the length check or render elements added dynamically to the DOM after loading
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	tabcordion.render = function tabcodionsRender() {
		GUI.debugging( 'tabcordion: Rendering', 'report' );

		$('.js-collapsible').not('.js-rendered').on('click arrow', function clickCollapsible(e) {
			GUI.debugging( 'collapsible: Collapsible clicked', 'interaction' );
			e.preventDefault();

			var $this = $(this);
			var target = $this.attr('href') ? $this.attr('href') : $this.attr('data-collapsible');
			var $tabcordion = $this.parents('.tabcordion')
			var _hasScrollOffset = $tabcordion.attr('data-tabcordion-scroll') !== 'undefined' && $tabcordion.attr('data-tabcordion-scroll') !== 'none';

			if( $tabcordion.length ) {
				GUI.debugging( 'collapsible: Found to be inside tabcordion', 'report' );

				var $tabs = $this.parents('.tabcordion').find('.collapsible-body');
				var _isMobile = parseInt( $('html').css('line-height') ) === 1; //responsive animations (requires responsive css on html)
				var _isAnimated = true;
				var _isOpenable = true;
				var _isCloseable = true;
				var _isAccordion = $this.parents('.tabcordion-accordion').length;
				var _isSingle = $tabs.length === 1 ? true : false;
				var _isOpen = $tabs.filter('.is-open').length;

				if( !_isMobile ) {
					_isAnimated = false;

					if( _isAccordion ) {
						_isAnimated = true;
					}
				}

				if( $this.parents('.tabcordion-tabs').length ) {
					_isAnimated = false;
				}

				// Determine if accordion can be toggled
				if( _isAccordion && _isSingle ){
					GUI.debugging( 'collapsible: Found to be a single tabcordion accordion', 'report' );

					if( _isOpen ){
						_isOpenable = false;
					} else {
						_isCloseable = false;
					}
				}

				//animating transition
				if( _isCloseable ){				
					GUI.collapsible.close( $tabs.filter('.is-open'), _isAnimated );
				}

				if( _hasScrollOffset ) {
					if( _isOpenable ){
						GUI.debugging( 'collapsible: Open accordion with scroll-to-content', 'report' );

						var scrollOffset = $tabcordion.attr('data-tabcordion-scroll');
						if( scrollOffset === undefined ) {
							scrollOffset = 0;
						}

						GUI.collapsible.open( $tabcordion.find( target ), _isAnimated, function scrollToTab() {
							//scroll to top
							$('html, body').animate({ scrollTop: ( $this.offset().top - 60 - scrollOffset ) }, 200);
						}, false);
					}
				}
				else {
					if( _isOpenable ){
						GUI.debugging( 'collapsible: Open accordion without scroll-to-content', 'report' );

						var oldScroll = $(window).scrollTop();

						$( window ).one('scroll', function() {
							$(window).scrollTop( oldScroll ); //disable scroll just once
						});

						GUI.collapsible.open( $tabcordion.find( target ), _isAnimated, null, false);
					}
				}

				//adding active states to tabs and headers
				if( _isCloseable ){
					$tabcordion
						.find('.js-collapsible')
						.parents('.js-collapsible-tab')
						.removeClass('is-active');
				}

				if( _isOpenable ){
					$tabcordion
						.find('.js-collapsible[data-collapsible="' + target + '"], .js-collapsible[href="' + target + '"]')
						.parents('.js-collapsible-tab')
						.addClass('is-active');
				}

				//changing aria attributes
				if( _isCloseable ){
					$tabcordion
						.find('.js-collapsible')
						.attr('aria-selected', false)
						.attr('aria-expanded', false);
				}

				if( _isOpenable ){
					$tabcordion
						.find('.js-collapsible[data-collapsible="' + target + '"], .js-collapsible[href="' + target + '"]')
						.attr('aria-selected', true)
						.attr('aria-expanded', true);
				}

				if( e.type === 'click' ) { //only trigger on tabbing or clicking, not arrowing
					if( _isOpenable ){
						$( target ).focus();
					}
				}
			}
			else {
				GUI.debugging( 'collapsible: Triggering pure toggle', 'report' );

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


		//Arrow keys for tabs
		$('.tabcordion-tabs .js-collapsible').not('.js-rendered').on('keydown', function(e) {
			GUI.debugging( 'collapsible: Keyboard used', 'interaction' );

			var $this = $(this);
			var $prev = $this.parents('li').prev().children('.js-collapsible');
			var $next = $this.parents('li').next().children('.js-collapsible');
			var $all = $this.parents('.tabcordion-tabs').find('.js-collapsible');
			var $target;
			var dir = '';

			switch(e.keyCode) {
				case 37:
					$target = $prev;
					dir = 'Left';
					break;
				case 39:
					$target = $next;
					dir = 'Right';
					break;
				default:
					$target = false
					break;
			}

			if( $target.length ) {
				GUI.debugging( 'collapsible: ' + dir + ' arrow key used', 'interaction' );

				$all.attr('tabindex', '-1'); //disable all tabs for focus

				$target //enable the target one
					.attr('tabindex', null)
					.focus()
					.trigger('arrow');
			}
		});

		$('.js-collapsible').addClass('js-rendered');
	};


	GUI.tabcordion = tabcordion;
	GUI.collapsible = collapsible;


	// run module
	GUI.tabcordion.init();

}(GUI));