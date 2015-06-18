/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * range-sliders
 *
 * Range slider with additional styling(style injections) as browser support is not good enough yet
 *
 **************************************************************************************************************************************************************/


(function(GUI) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// private function: resize bubble shadow
	//
	// @param   $wrapper  [jquery object]  The wrapper element
	// @param   index     [integer]        The index of that element
	//
	// @return  [jquery object]  Style dom element for injection
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	function BubbleShadow( $wrapper, index ) {
		GUI.debugging( 'range-sliders: Setting shadow ', 'report' );

		var $this = $wrapper.find('.range-slider');
		var value = $this.val();
		var min = $this.attr('min');
		var max = $this.attr('max');
		var percentage = ( 100 / (max - min) ) * ( value - min );

		$wrapper.addClass( 'js-range-slider-' + index );

		var $style = $('<style/>')
			.addClass('js-rangestyle-' + index)
			.html('.js-range-slider-' + index + ':after { width: ' + ( percentage > 0 ? percentage : 0 ) + '%; }')

		return $style;

	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		GUI.debugging( 'range-sliders: Initiating', 'report' );


		if( $('.js-range-slider').length ) {
			GUI.debugging( 'range-sliders: Found instance', 'report' );

			//tag each instance
			i = 0;
			$('.js-range-slider').each(function iterateSliders() {
				var $styles = BubbleShadow( $(this), i );

				$(this)
					.before( $styles )
					.attr('data-index', i);


				i++;
			});


			$('.js-range-slider .range-slider').on('mousedown input active focus touchstart', function showBubble() {
				GUI.debugging( 'range-sliders: input changed', 'interaction' );

				var $this = $(this);
				var $wrapper = $this.parent('.js-range-slider');
				var index = $wrapper.attr('data-index');
				var _isCurrency = $this.hasClass('range-slider-currency');
				var _isPercentage = $this.hasClass('range-slider-percentage');
				var value = this.value;

				if( _isCurrency ) { //format in dollars
					var c = isNaN(c = Math.abs(c)) ? 2 : c;
					var t = ',';
					var s = value < 0 ? '-' : '';
					var i = parseInt(value = Math.abs(+ value || 0).toFixed(c)) + '';
					var j = (j = i.length) > 3 ? j % 3 : 0;

					value = '$' + s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t);
				}

				if( _isPercentage ) { //format in percentage
					value += '%';
				}

				$( '.js-rangestyle-' + index ).remove(); //remove all previous styling

				var $styles = BubbleShadow( $wrapper, index );
				$styles.insertBefore( $this ); //STYLE INJECTION

				var $styles = $('<style/>') //STYLE INJECTION
					.addClass('js-rangestyle-' + index)
					.html(
						' .js-range-slider-' + index + ' .range-slider::-webkit-slider-thumb:after { content: "' + value + '"; }' +
						' .js-range-slider-' + index + ' .range-slider::-ms-thumb:after { content: "' + value + '"; }' +
						' .js-range-slider-' + index + ' .range-slider::-moz-range-thumb:after { content: "' + value + '"; }'
					)
					.insertBefore( $this );

			});
		}
	};


	GUI.rangeSliders = module;


	// run module
	GUI.rangeSliders.init();

}(GUI));