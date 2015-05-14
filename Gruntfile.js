'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//                                     ██████╗  ██╗   ██╗ ██╗       ███████╗  ██████╗  ██╗   ██╗ ██████╗   ██████╗ ███████╗
//                                    ██╔════╝  ██║   ██║ ██║       ██╔════╝ ██╔═══██╗ ██║   ██║ ██╔══██╗ ██╔════╝ ██╔════╝
//                                    ██║  ███╗ ██║   ██║ ██║       ███████╗ ██║   ██║ ██║   ██║ ██████╔╝ ██║      █████╗
//                                    ██║   ██║ ██║   ██║ ██║       ╚════██║ ██║   ██║ ██║   ██║ ██╔══██╗ ██║      ██╔══╝
//                                    ╚██████╔╝ ╚██████╔╝ ██║       ███████║ ╚██████╔╝ ╚██████╔╝ ██║  ██║ ╚██████╗ ███████╗
//                                     ╚═════╝   ╚═════╝  ╚═╝       ╚══════╝  ╚═════╝   ╚═════╝  ╚═╝  ╚═╝  ╚═════╝ ╚══════╝
//                                                                       Created by Westpac digital
// @desc     GUI source code for testing and maintance
// @author   Dominik Wilkowski
// @website  https://github.com/WestpacCXTeam/GUI-source
// @issues   https://github.com/WestpacCXTeam/GUI-source/issues
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// External dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var fs = require('fs');
var path = require('path');


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
 * handleize a string
 *
 * string  [string]  A string to be handelized
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


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to create list index
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('buildIndex', 'Build an index html file to mapp all modules for gh-pages.', function() {

		var replace = {};
		var replaceStr = '';
		var GUI = {};

		grunt.file.expand({ filter: 'isDirectory' }, [
			'./*',
			'!./node_modules',
			'!./._templates',
			'!./.git',
		]).forEach(function(dir) {

			var module = dir.substr( dir.lastIndexOf('/') + 1 );

			GUI[ module ] = {
				'name': module,
				'versions': {},
			};

			replaceStr += '<li>';

			grunt.file.expand({ filter: 'isDirectory' }, [dir + '/*']).forEach(function(subdir) {

				var version = subdir.substr( subdir.lastIndexOf('/') + 1 );

				if( version !== 'node_modules' ) {
					//add versioning to files
					replaceStr += '<h2>' + module + '</h2>' +
						'<ul>' +
						'	<li>' +
						'		<h3>v' + version + '</h3>' +
						'		<ul>' +
						'			<li><a href="' + subdir + '/tests/BOM/">BOM</a></li>' +
						'			<li><a href="' + subdir + '/tests/BSA/">BSA</a></li>' +
						'			<li><a href="' + subdir + '/tests/STG/">STG</a></li>' +
						'			<li><a href="' + subdir + '/tests/WBC/">WBC</a></li>' +
						'		</ul>' +
						'	</li>' +
						'</ul>';

					GUI[ module ].versions[version] = module + '/' + version + '/';
				}
			});

			replaceStr += '</li>';

		});


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
				to: replaceStr,
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

							grunt.file.mkdir( path.normalize( __dirname + '/' + name + '/1.0.0/_assets/BOM/font') );
							grunt.file.mkdir( path.normalize( __dirname + '/' + name + '/1.0.0/_assets/BOM/img') );
							grunt.file.mkdir( path.normalize( __dirname + '/' + name + '/1.0.0/_assets/BOM/svg') );
							grunt.file.mkdir( path.normalize( __dirname + '/' + name + '/1.0.0/_assets/BSA/font') );
							grunt.file.mkdir( path.normalize( __dirname + '/' + name + '/1.0.0/_assets/BSA/img') );
							grunt.file.mkdir( path.normalize( __dirname + '/' + name + '/1.0.0/_assets/BSA/svg') );
							grunt.file.mkdir( path.normalize( __dirname + '/' + name + '/1.0.0/_assets/STG/font') );
							grunt.file.mkdir( path.normalize( __dirname + '/' + name + '/1.0.0/_assets/STG/img') );
							grunt.file.mkdir( path.normalize( __dirname + '/' + name + '/1.0.0/_assets/STG/svg') );
							grunt.file.mkdir( path.normalize( __dirname + '/' + name + '/1.0.0/_assets/WBC/font') );
							grunt.file.mkdir( path.normalize( __dirname + '/' + name + '/1.0.0/_assets/WBC/img') );
							grunt.file.mkdir( path.normalize( __dirname + '/' + name + '/1.0.0/_assets/WBC/svg') );
							grunt.file.mkdir( path.normalize( __dirname + '/' + name + '/1.0.0/tests') );

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

			install: {
				options: {
					font: 'simple',
					maxLength: 30,
					colors: ['magenta'],
				},
				text: ' installing dependencies',
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
	// Build tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('default', [
		'font:title',
		'font:index',
		'buildIndex',
		'wakeup',
	]);

	grunt.registerTask('install', [
		'font:title',
		'font:install',
		'npmInstall',
		'wakeup',
	]);

	grunt.registerTask('add', [
		'font:title',
		'font:add',
		'prompt',
		'buildIndex',
		'wakeup',
	]);

};