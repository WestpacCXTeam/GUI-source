'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//                                              ██████╗  ██╗   ██╗ ██╗          ██████╗   █████╗  ███████╗ ███████╗
//                                             ██╔════╝  ██║   ██║ ██║          ██╔══██╗ ██╔══██╗ ██╔════╝ ██╔════╝
//                                             ██║  ███╗ ██║   ██║ ██║          ██████╔╝ ███████║ ███████╗ █████╗
//                                             ██║   ██║ ██║   ██║ ██║          ██╔══██╗ ██╔══██║ ╚════██║ ██╔══╝
//                                             ╚██████╔╝ ╚██████╔╝ ██║          ██████╔╝ ██║  ██║ ███████║ ███████╗
//                                              ╚═════╝   ╚═════╝  ╚═╝          ╚═════╝  ╚═╝  ╚═╝ ╚══════╝ ╚══════╝
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
 * return latest base version
 */
function GetLastestBase() {
	var dir = '../base';
	var result = '';

	fs.readdirSync( dir ).some(function(name) {
		var filePath = path.join(dir, name);
		var stat = fs.statSync(filePath);

		if(stat.isDirectory() && name != 'node_modules') {
			result = name;
			return;
		}
	});

	return result;
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Grunt module
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = function(grunt) {


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Dependencies
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-lintspaces');
	grunt.loadNpmTasks('grunt-font');
	grunt.loadNpmTasks('grunt-wakeup');


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Globals
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	moduleName: process.cwd().split('/')[( process.cwd().split('/').length - 1 )], //module name


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to build all files for each version
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('buildVersions', 'Build all versions in this module.', function() {

		grunt.file.expand({ filter: 'isDirectory' }, ['./*', '!./node_modules']).forEach(function(dir) {

			var moduleName = process.cwd().split('/')[( process.cwd().split('/').length - 1 )];
			var baseVersion = GetLastestBase();
			var version = dir.substr( dir.lastIndexOf('/') + 1 );
			var concat = {};
			var less = {};
			var copy = {};
			var font = {};
			var replace = {};
			var brands = ['BOM', 'BSA', 'STG', 'WBC'];


			//concat js
			brands.forEach(function(brand) {
				concat[ version + 'JS' + brand ] = {
					src: [
						'../base/' + baseVersion + '/js/*.js',
						// './' + version + '/js/*.js',
					],
					dest: './' + version + '/_tests/' + brand + '/assets/js/gui.js',
				};
			});


			//concat less
			brands.forEach(function(brand) {
				concat[ version + 'Less' + brand ] = {
					src: [
						'../base/' + baseVersion + '/less/base-mixins.less',
						'../base/' + baseVersion + '/less/settings.less',
						// './' + version + '/less/module-mixins.less',
					],
					dest: './' + version + '/_tests/' + brand + '/assets/less/gui.less',
				};
			});


			//concat html
			brands.forEach(function(brand) {
				concat[ version + 'HTML' + brand ] = {
					src: [
						'./' + version + '/html/header.html',
						'./' + version + '/html/source.html',
						'./' + version + '/html/footer.html',
					],
					dest: './' + version + '/_tests/' + brand + '/index.html',
				};
			});


			//compile less
			brands.forEach(function(brand) {
				less[ version + 'Less' + brand ] = {
					options: {
						cleancss: true,
						compress: false,
						ieCompat: true,
						report: 'min',
					},
					src: [
						'./' + version + '/_tests/' + brand + '/assets/less/gui.less',
					],
					dest: './' + version + '/_tests/' + brand + '/assets/css/gui.css',
				};
			});


			//add versioning to files
			brands.forEach(function(brand) {
				replace[ version + 'Replace' + brand ] = {
					src: [
						'./' + version + '/_tests/' + brand + '/assets/js/*.js',
						'./' + version + '/_tests/' + brand + '/assets/less/*.less',
						'./' + version + '/_tests/' + brand + '/*.html',
					],
					overwrite: true,
					replacements: [{
						from: '[Module-Version-Brand]',
						to: moduleName + ' v' + version + ' ' + brand,
					}, {
						from: '[Module-Version]',
						to: moduleName + ' v' + version,
					}],
				};
			});


			//copy base font assets
			brands.forEach(function(brand) {
				copy[ version + 'Font' + brand ] = {
					src: '../base/' + baseVersion + '/_assets/' + brand + '/font/*',
					dest: './' + version + '/_tests/' + brand + '/assets/font/',
				};
			});

			// //copy font assets
			// brands.forEach(function(brand) {
			// 	copy[ version + 'Font' + brand ] = {
			// 		src: './' + version + '/_assets/' + brand + '/font/',
			// 		dest: './' + version + '/_tests/' + brand + '/assets/font',
			// 	};
			// });


			//show current version build
			font[ version ] = {
				text: moduleName + '|' + version,
				options: {
					colors: ['white', 'gray'],
				},
			};



			//running tasks
			grunt.config.set('font', font);
			grunt.task.run('font');

			grunt.config.set('concat', concat);
			grunt.task.run('concat');

			grunt.config.set('replace', replace);
			grunt.task.run('replace');

			grunt.config.set('less', less);
			grunt.task.run('less');

			grunt.config.set('copy', copy);
			grunt.task.run('copy');

		});
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to watch all files for each version
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('watchVersions', 'Watch all files in each version.', function() {

		grunt.file.expand({ filter: 'isDirectory' }, ['./*', '!./node_modules']).forEach(function(dir) {

			var moduleName = process.cwd().split('/')[( process.cwd().split('/').length - 1 )];
			var baseVersion = GetLastestBase();
			var version = dir.substr( dir.lastIndexOf('/') + 1 );
			var watch = {};
			var brands = ['BOM', 'BSA', 'STG', 'WBC'];


			//create the watch
			watch[ version ] = {
				files: [
					'./' + version + '/**/*.*',
					'!./' + version + '/_tests/**/*.*',
					// '../base/' + baseVersion + '/**/*.*',
				],
				tasks: [
					'build',
				],
			};



			//running tasks
			grunt.config.set('watch', watch);
			grunt.task.run('watch');

		});
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Grunt tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.initConfig({


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// LINT SPACES
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		lintspaces: {
			all: {
				options: {
					editorconfig: '../.editorconfig',
					ignores: [
						'js-comments',
						'c-comments',
						'java-comments',
						'as-comments',
						'xml-comments',
						'html-comments',
						'python-comments',
						'ruby-comments',
						'applescript-comments',
					],
				},
				src: [
					'**/*.js',
					'**/*.less',
					'**/*.css',
					'**/*.html',
					'**/*.svg',

					'!**/_tests/**/*.*',
					'!node_modules/**/*.*',
				],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Banner
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		font: {
			options: {
				space: false,
				colors: ['white', 'gray'],
			},

			title: {
				text: '| GUI BASE',
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


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// server
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		connect: {
			server: {
				options: {
					open: false,
					hostname: '127.0.0.1',
					port: 1337,
				},
			},
		},

	});



	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Tasks breakdown
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('build', [
		'lintspaces',
		'buildVersions',
		'wakeup',
	]);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Build tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('default', [
		'font',
		'build',
		'connect',
		'watchVersions',
	]);

};