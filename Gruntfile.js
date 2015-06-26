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
		var replaceStr = '<h2>Modules</h2><ul class="gui-list">' + "\n";
		var GUI = {
			modules: {}
		};
		var oldCategory = '';
		var categories = '<h2>Categories</h2><ul class="category-list">';


		//build GUI.json
		grunt.file.expand({ filter: 'isDirectory' }, [
			'./*',
			'!./node_modules',
			'!./._templates',
			'!./.git',
		]).forEach(function(dir) {

			var module = grunt.file.readJSON( dir + '/' + 'module.json');

			if( typeof( GUI.modules[ module.category ] ) === 'undefined' ) {
				GUI.modules[module.category] = {};
			}

			GUI.modules[ module.category ][ module.ID ] = module;

		});


		//build index.html
		Object.keys( GUI.modules ).forEach(function iterateCategories( category ) {

			Object.keys( GUI.modules[category] ).forEach(function iterateModules( moduleKey ) {

				var module = GUI.modules[category][moduleKey];

				if( oldCategory !== category ) {
					replaceStr += '	<li class="category" id="' + module.ID + '"><small>[' + category + ']</small></li>';

					categories += '<li><a href="#' + module.ID + '">' + category + '</a></li>';
				}

				replaceStr += '	<li class="module"><div class="module-wrapper">';

				Object.keys( module.versions ).forEach(function interateVersions( version ) {

					var subdir = './' + module.ID + '/' + version + '/tests/';

					//add versioning to files
					replaceStr += "\n" + '		<h3 class="module-headline">' + module.name +
						' <small class="description">' + module.description + '</small></h3>' + "\n" +
						'		<ul class="gui-list-version">' + "\n" +
						'			<li>' + "\n" +
						'				<h4 class="version-headline">v' + version + '</h4>' + "\n" +
						'				<ul class="gui-list-version-brand">' + "\n" +
						'					<li><a class="brand-link brand-link-bom" href="' + subdir + 'BOM/">BOM</a></li>' + "\n" +
						'					<li><a class="brand-link brand-link-bsa" href="' + subdir + 'BSA/">BSA</a></li>' + "\n" +
						'					<li><a class="brand-link brand-link-stg" href="' + subdir + 'STG/">STG</a></li>' + "\n" +
						'					<li><a class="brand-link brand-link-wbc" href="' + subdir + 'WBC/">WBC</a></li>' + "\n" +
						'				</ul>' + "\n" +
						'			</li>' + "\n" +
						'		</ul>' + "\n";

					replaceStr += '	</div></li>' + "\n";
				});

				oldCategory = category;

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
	// Custom grunt task to create list index
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('mergeBase', 'Merge the base into all modules.', function() {

		var hub = {};
		var module = grunt.file.readJSON( 'GUI.json');

		Object.keys( module.modules ).forEach(function iterateCategories( category ) {
			module.modules[category].forEach(function iterateModules( module ) {

				//gathering hub tasks
				hub[ 'merge-' + module.ID ] = {
					expand: false,
					src: [
						'./' + module.ID + '/Gruntfile.js',
					],
					tasks: [
						'buildVersions',
						'createChecksum',
					],
				};

			});
		});


		//running tasks
		grunt.config.set('hub', hub);
		grunt.task.run('hub');

		grunt.task.run('buildIndex');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Grunt tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.initConfig({


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Add a new module
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		prompt: {
			setup: {
				options: {
					questions: [
						{
							config: 'module',
							type: 'input',
							message: "\n\n" + 'Please enter the name of the new module:'.yellow + "\n\n",
							validate: function(value) {
								var gui = grunt.file.readJSON('GUI.json');

								var _isFound = gui[value] !== undefined;

								return !_isFound || 'This module name already exists in the GUI namespace. Please choose another one.'.red;
							},
						},
					],
					then: function(results) {
						var name = Handleize( results.module );
						var copy = {};
						var rename = {};
						var replace = {};
						var message = '';

						//copy template
						copy[ 'templateCopy' ] = {
							expand: true,
							cwd: './._template/module/',
							src: '**',
							dest: './' + name + '/',
							rename: function(dest, src) {
								if( src === '1.0.0/js/module.js' ) {
									src = '1.0.0/js/' + name + '.js';
								}

								return dest + src;
							},
						};

						//name it
						replace[ 'templateReplace' ] = {
							src: [
								'./' + name + '/**/*.js',
								'./' + name + '/**/*.json',
								'./' + name + '/**/*.html',
								'./' + name + '/**/*.less',
							],
							overwrite: true,
							replacements: [{
								from: '[-Module-]',
								to: name,
							}],
						};


						//creating missing empty folders
						grunt.registerTask('folders', 'Creating missing empty folders', function() {

							grunt.file.mkdir( Path.normalize( __dirname + '/' + name + '/1.0.0/_assets/BOM/font') );
							grunt.file.mkdir( Path.normalize( __dirname + '/' + name + '/1.0.0/_assets/BOM/img') );
							grunt.file.mkdir( Path.normalize( __dirname + '/' + name + '/1.0.0/_assets/BOM/svg') );
							grunt.file.mkdir( Path.normalize( __dirname + '/' + name + '/1.0.0/_assets/BSA/font') );
							grunt.file.mkdir( Path.normalize( __dirname + '/' + name + '/1.0.0/_assets/BSA/img') );
							grunt.file.mkdir( Path.normalize( __dirname + '/' + name + '/1.0.0/_assets/BSA/svg') );
							grunt.file.mkdir( Path.normalize( __dirname + '/' + name + '/1.0.0/_assets/STG/font') );
							grunt.file.mkdir( Path.normalize( __dirname + '/' + name + '/1.0.0/_assets/STG/img') );
							grunt.file.mkdir( Path.normalize( __dirname + '/' + name + '/1.0.0/_assets/STG/svg') );
							grunt.file.mkdir( Path.normalize( __dirname + '/' + name + '/1.0.0/_assets/WBC/font') );
							grunt.file.mkdir( Path.normalize( __dirname + '/' + name + '/1.0.0/_assets/WBC/img') );
							grunt.file.mkdir( Path.normalize( __dirname + '/' + name + '/1.0.0/_assets/WBC/svg') );
							grunt.file.mkdir( Path.normalize( __dirname + '/' + name + '/1.0.0/tests') );

						});


						//report summary
						grunt.registerTask('report', 'Report the summary', function() {
							console.log("\n" + message + "\n\n");
							grunt.log.ok('done');
						});


						//running tasks
						grunt.config.set('copy', copy);
						grunt.task.run('copy');

						grunt.task.run('folders');

						message += "\n" + '• Files copied to new module directory: '.green + './'.yellow + name.yellow + '/'.yellow;

						grunt.config.set('replace', replace);
						grunt.task.run('replace');

						message += "\n" + '• Renamed files, mixins and methods into  '.green + name.yellow + ' namespace'.green;

						grunt.task.run('report');

					},
				},
			},
		},


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
				text: ' merging base',
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

	grunt.registerTask('merge', [ //merge base into all modules
		'font:title',
		'font:merge',
		'buildIndex',
		'mergeBase',
		'wakeup',
	]);

	grunt.registerTask('add', [ //add new module
		'font:title',
		'font:add',
		'prompt',
		'buildIndex',
		'wakeup',
	]);

};