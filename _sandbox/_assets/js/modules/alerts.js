/*! Alerts v2.0.2 */
/***************************************************************************************************************************************************************
 *
 * alerts
 *
 * Toggeling classes and aria-hidden for alerts
 *
 **************************************************************************************************************************************************************/


(function(GUI) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//
	// Run this method once after your DOM was loaded
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function alertsInit() {
		GUI.debugging( 'alerts: Initiating', 'report' );

		if( $('.js-alertclose').length ) {
			GUI.debugging( 'alerts: Found instance', 'report' );

			GUI.alerts.render();
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module render method
	//
	// You can run the render method if you want to bypass the length check or render elements added dynamically to the DOM after loading
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.render = function alertsRender() {
		GUI.debugging( 'alerts: Rendering', 'report' );

		$('.js-alertclose').not('.js-rendered').on('click', function closeAlert() {
			GUI.debugging( 'alerts: Closing alert', 'interaction' );

			var $parent = $(this).parents('.js-alert');

			$parent
				.addClass('is-closed')
				.attr('aria-hidden', 'true');
		}).addClass('js-rendered');

	};


	GUI.alerts = module;


	// run module
	GUI.alerts.init();

}(GUI));