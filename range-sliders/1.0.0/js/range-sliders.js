/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * range-sliders
 *
 * Description of module
 *
 **************************************************************************************************************************************************************/


(function(GUI) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		GUI.debugging( 'range-sliders: Initiating', 'report' );


		if( $('.js-range-slider').length ) {
			GUI.debugging( 'range-sliders: Found instance', 'report' );

			$('.js-range-slider').on('mousedown input focus', function showBubble() {
				GUI.debugging( 'range-sliders: input changed', 'interaction' );

				var $this = $(this);
				var _isCurrency = $this.hasClass('range-slider-currency');
				var _isPercentage = $this.hasClass('range-slider-percentage');
				var value = this.value;

				if( _isCurrency ) {
					var c = isNaN(c = Math.abs(c)) ? 2 : c;
					var t = ',';
					var s = value < 0 ? '-' : '';
					var i = parseInt(value = Math.abs(+ value || 0).toFixed(c)) + '';
					var j = (j = i.length) > 3 ? j % 3 : 0;

					value = '$' + s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t);
				}

				if( _isPercentage ) {
					value += '%';
				}

				$('.js-style').remove();

				$this.before(
					'<style class="js-style">' +
					'	.range-slider:focus::-webkit-slider-thumb:after { content: "' + value + '"; }' +
					'	.range-slider:focus::-ms-thumb:after { content: "' + value + '"; }' +
					'	.range-slider:focus::-moz-range-thumb:after { content: "' + value + '"; }' +
					'</style>'
				);
			});
		}
	};


	GUI.rangeSliders = module;


	// run module
	GUI.rangeSliders.init();

}(GUI));