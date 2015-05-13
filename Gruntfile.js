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
	grunt.loadNpmTasks('grunt-auto-install');
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
						'			<li><a href="' + subdir + '/_tests/BOM/">BOM</a></li>' +
						'			<li><a href="' + subdir + '/_tests/BSA/">BSA</a></li>' +
						'			<li><a href="' + subdir + '/_tests/STG/">STG</a></li>' +
						'			<li><a href="' + subdir + '/_tests/WBC/">WBC</a></li>' +
						'		</ul>' +
						'	</li>' +
						'</ul>';

					GUI[ module ].versions[version] = module + '/' + version + '/';
				}
			});

			replaceStr += '</li>';

		});


		grunt.file.write('./GUI.json', JSON.stringify(GUI));


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
	// Custom grunt task to create list index
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('npmInstall', 'Install all npm dependencies.', function() {

		var auto_install = {};

		grunt.file.expand({ filter: 'isDirectory' }, [
			'./*',
			'!./node_modules',
			'!./._templates',
			'!./.git',
		]).forEach(function(dir) {

			auto_install[ 'Install' + dir ] = {
				options: {
					cwd: dir,
					stdout: false,
					stderr: false,
					failOnError: true,
					npm: true,
					bower: false,
				},
			};

		});

		//running tasks
		grunt.config.set('auto_install', auto_install);
		grunt.task.run('auto_install');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Grunt tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.initConfig({


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Add a new module
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		prompt: {
			setup: { //setup questionnaire
				options: {
					questions: [
						{
							config: 'module',
							type: 'input',
							message: "\n\n" + 'Please enter the name of the new module:' + "\n\n",
							validate: function(value) {
								var gui = grunt.file.readJSON('GUI.json');

								var _isFound = gui[value] !== undefined;

								return !_isFound || 'This module name already exists in the GUI namespace. Please choose another one.';
							},
						},
					],
					then: function(results) {
						var name = Handleize( results.module );
						var copy = {};
						var rename = {};
						var replace = {};
						var auto_install = {};

						//copy template
						copy[ 'templateCopy' ] = {
							expand: true,
							cwd: './._template/module/',
							src: '**/*.*',
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

						//install npm dependencies
						auto_install[ 'templateInstall' ] = {
							options: {
								cwd: './' + name,
								stdout: false,
								stderr: false,
								failOnError: true,
								npm: true,
								bower: false,
							},
						};

						//running tasks
						grunt.config.set('copy', copy);
						grunt.task.run('copy');

						grunt.config.set('replace', replace);
						grunt.task.run('replace');

						grunt.config.set('auto_install', auto_install);
						grunt.task.run('auto_install');

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