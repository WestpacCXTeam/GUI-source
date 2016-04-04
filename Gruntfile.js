'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//                                     ██████╗  ██╗   ██╗ ██╗       ███████╗  ██████╗  ██╗   ██╗ ██████╗   ██████╗ ███████╗
//                                    ██╔════╝  ██║   ██║ ██║       ██╔════╝ ██╔═══██╗ ██║   ██║ ██╔══██╗ ██╔════╝ ██╔════╝
//                                    ██║  ███╗ ██║   ██║ ██║       ███████╗ ██║   ██║ ██║   ██║ ██████╔╝ ██║      █████╗
//                                    ██║   ██║ ██║   ██║ ██║       ╚════██║ ██║   ██║ ██║   ██║ ██╔══██╗ ██║      ██╔══╝
//                                    ╚██████╔╝ ╚██████╔╝ ██║       ███████║ ╚██████╔╝ ╚██████╔╝ ██║  ██║ ╚██████╗ ███████╗
//                                     ╚═════╝   ╚═════╝  ╚═╝       ╚══════╝  ╚═════╝   ╚═════╝  ╚═╝  ╚═╝  ╚═════╝ ╚══════╝
//                                                                       Created by Westpac Design Delivery Team
// @desc     GUI source code for testing and maintance
// @author   Dominik Wilkowski
// @website  https://github.com/WestpacCXTeam/GUI-source
// @issues   https://github.com/WestpacCXTeam/GUI-source/issues
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// External dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var Path = require('path');


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
 * Handleize a string
 *
 * @param   string  [string]  A string to be handelized
 *
 * @return  [string]  A handelized string
 */
function Handleize( string ) {
	return string.replace(/\W+/g, '-').toLowerCase();
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// GUI config
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var SETTINGS = function(grunt) {
	var guiconfig = grunt.file.readJSON( '.guiconfig' );

	return guiconfig;
};


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Grunt module
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = function(grunt) {


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Dependencies
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-prompt');
	grunt.loadNpmTasks('grunt-wakeup');
	grunt.loadNpmTasks('grunt-font');
	grunt.loadNpmTasks('grunt-hub');
	require('time-grunt')(grunt);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to create list index
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('buildIndex', 'Build an index html file to mapp all modules for gh-pages.', function() {

		var replace = {};
		var replaceStr = '<h2 class="body-font">Modules</h2>' + "\n";
		var GUI = {
			modules: {
				_core: {},
			},
		};
		var core = {};
		var oldCategory = '';
		var categories = '<h2 class="body-font">Categories</h2><ul class="category-list">';
		var modulePos = 1;


		//copying readme and module.json
		grunt.file.expand({ filter: 'isDirectory' }, [
			'*',
			'!node_modules',
			'!._templates',
			'!.git',
			'!.github',
		]).forEach(function(dir) {
			var version = '1.0.0';

			grunt.file.expand({ filter: 'isDirectory' }, [ //get latest version
				dir + '/*',
				'!./node_modules',
			]).forEach(function( ver ) {
				return version = ver;
			});

			grunt.file.copy( version + '/module.json', dir + '/module.json');
			grunt.file.copy( version + '/README.md', dir + '/README.md');
		});


		//build GUI.json
		grunt.file.expand({ filter: 'isDirectory' }, [
			'*',
			'!node_modules',
			'!._templates',
			'!.github',
			'!.git',
		]).forEach(function(dir) {

			var module = grunt.file.readJSON( dir + '/' + 'module.json');

			if( typeof( GUI.modules[ module.category ] ) === 'undefined' ) {
				GUI.modules[module.category] = {};
			}

			GUI.modules[ module.category ][ module.ID ] = module;

			if( module.core ) {
				GUI.modules._core[ module.ID ] = module;
			}

		});


		//build index.html
		Object.keys( GUI.modules ).forEach(function iterateCategories( category ) {

			Object.keys( GUI.modules[category] ).forEach(function iterateModules( moduleKey ) {

				var module = GUI.modules[category][moduleKey];
				modulePos++;

				if( core[ module.ID ] !== true ) {

					if( oldCategory !== category ) { //new category

						if( oldCategory !== '' ) { //unless very first category
							replaceStr += '</ul>' + "\n";
						}

						replaceStr += '<h3 class="category" id="' + module.ID + '"><small>' + category + '</small></h3>' + "\n" +
							'<ul class="gui-list">' + "\n";

						categories += '<li><a href="#' + module.ID + '">' + category + '</a></li>';

						modulePos = 1;
					}

					replaceStr += '	<li class="module"><div class="module-wrapper">' + "\n" +
						'		<h3 class="body-font module-headline">' + module.name + ' <small class="description">' + module.description + '</small></h3>' + "\n" +
						'		<ul class="gui-list-version">' + "\n";

					Object.keys( module.versions ).forEach(function interateVersions( version ) {

						var subdir = './' + module.ID + '/' + version + '/tests/';

						//adding the modules into the index
						replaceStr += '			<li>' + "\n" +
							'				<h4 class="body-font version-headline">v' + version + '</h4>' + "\n" +
							'				<ul class="gui-list-version-brand">' + "\n";

						//adding brand links
						module.versions[version].brands.forEach(function( brand ) {
							replaceStr += '					<li><a class="brand-link brand-link-' + brand.toLowerCase() + '" href="' + subdir + brand.toUpperCase() + '/">' +
								brand.toUpperCase() + '</a></li>' + "\n";
						});

						//closing the HTML
						replaceStr += '				</ul>' + "\n" + '			</li>' + "\n";
					});

					replaceStr += '		</ul>' + "\n" +
						'	</div></li>' + "\n";

					oldCategory = category;
				}

				if( module.core ) {
					core[ module.ID ] = true;
				}

			});

		});

		replaceStr += '</ul>';
		categories += '</ul>';


		//writing out GUI.json
		grunt.file.write('./GUI.json', JSON.stringify(GUI));


		//writing out index.html
		replace[ 'Replace' ] = {
			src: [
				'./._template/index/index.html',
			],
			dest: './index.html',
			overwrite: false,
			replacements: [{
				from: '[Modules]',
				to: ( categories + replaceStr ),
			}],
		};


		//running tasks
		grunt.config.set('replace', replace);
		grunt.task.run('replace');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Grunt tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.initConfig({


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Banner
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		font: {
			options: {
				space: false,
				maxLength: 11,
				colors: ['white', 'gray'],
			},

			title: {
				text: '| GUI SOURCE',
			},

			merge: {
				options: {
					font: 'simple',
					maxLength: 30,
					colors: ['magenta'],
				},
				text: ' merging core',
			},

			index: {
				options: {
					font: 'simple',
					maxLength: 30,
					colors: ['magenta'],
				},
				text: ' building index',
			},

			add: {
				options: {
					font: 'simple',
					maxLength: 30,
					colors: ['magenta'],
				},
				text: ' adding new module',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Wakeup
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		wakeup: {
			wakeme: {
				options: {
					randomize: true,
					notifications: true,
				},
			},
		},

	});



	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Public tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('default', [ //build index and gui.json
		'font:title',
		'font:index',
		'buildIndex',
		'wakeup',
	]);

};