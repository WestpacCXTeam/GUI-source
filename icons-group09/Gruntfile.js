'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//                                                             ██████╗  ██╗   ██╗ ██╗
//                                                            ██╔════╝  ██║   ██║ ██║
//                                                            ██║  ███╗ ██║   ██║ ██║
//                                                            ██║   ██║ ██║   ██║ ██║
//                                                            ╚██████╔╝ ╚██████╔╝ ██║
//                                                             ╚═════╝   ╚═════╝  ╚═╝
//                                                                       Created by Westpac Design Delivery Team
// @desc     GUI source running each module
// @author   Dominik Wilkowski
// @website  https://github.com/WestpacCXTeam/GUI-source
// @issues   https://github.com/WestpacCXTeam/GUI-source/issues
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// External dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var Path = require('path');
var Fs = require('fs');


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
 * Get latest base version
 *
 * @return  [string]  Version string for latest base version
 */
function GetLastestBase() {
	var dir = '../_base';
	var result = '';

	Fs.readdirSync( dir ).some(function(name) {
		var filePath = Path.join(dir, name);
		var stat = Fs.statSync(filePath);

		if(stat.isDirectory() && name != 'node_modules') {
			result = name;
			return;
		}
	});

	return result;
}

/*
 * Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved. https://github.com/mcavage/node-dirsum
 */
function _summarize(e,r){var t=Object.keys(r);t.sort();var i={};i.files=r;for(var o=crypto.createHash(e),n=0;n<t.length;n++)"string"==typeof r[t[n]]?o.update(r[t[n]]):"object"==typeof r[t[n]]?o.update(r[t[n]].hash):console.error("Unknown type found in hash: "+typeof r[t[n]]);return i.hash=o.digest("hex"),i}function digest(e,r,t,i){if(!e||"string"!=typeof e)throw new TypeError("root is required (string)");if(!r)throw new TypeError("callback is required (function)");if("string"==typeof r){if("function"==typeof t)i=t,t=[];else if("object"!=typeof t)throw new TypeError("exclude must be an object")}else{if("function"!=typeof r)throw new TypeError("hash must be a string");i=r,r="md5",t=[]}if(!i)throw new TypeError("callback is required (function)");var o={};fs.readdir(e,function(n,f){if(n)return i(n);if(t.forEach(function(e){var r=f.indexOf(e);-1!=r&&f.splice(r,1)}),0===f.length)return i(void 0,{hash:"",files:{}});var s=0;f.forEach(function(t){var n=e+"/"+t;fs.stat(n,function(e,u){if(e)return i(e);if(u.isDirectory())return digest(n,r,function(e,n){return e?n:(o[t]=n,++s>=f.length?i(void 0,_summarize(r,o)):void 0)});if(u.isFile())fs.readFile(n,"utf8",function(e,n){if(e)return i(e);var u=crypto.createHash(r);return u.update(n),o[t]=u.digest("hex"),++s>=f.length?i(void 0,_summarize(r,o)):void 0});else if(console.error("Skipping hash of %s",t),++s>f.length)return i(void 0,_summarize(r,o))})})})}var crypto=require("crypto"),fs=require("fs");
var Dirsum = {
	digest: digest
};


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Grunt module
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = function(grunt) {
	require('../node_modules/grunt-recursively-load-tasks')(grunt);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Dependencies
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.recursivelyLoadTasks('grunt-contrib-imagemin', '../node_modules');
	grunt.recursivelyLoadTasks('grunt-contrib-connect', '../node_modules');
	grunt.recursivelyLoadTasks('grunt-contrib-concat', '../node_modules');
	grunt.recursivelyLoadTasks('grunt-contrib-watch', '../node_modules');
	grunt.recursivelyLoadTasks('grunt-contrib-clean', '../node_modules');
	grunt.recursivelyLoadTasks('grunt-contrib-copy', '../node_modules');
	grunt.recursivelyLoadTasks('grunt-contrib-less', '../node_modules');
	grunt.recursivelyLoadTasks('grunt-text-replace', '../node_modules');
	grunt.recursivelyLoadTasks('grunt-lintspaces', '../node_modules');
	grunt.recursivelyLoadTasks('grunt-grunticon', '../node_modules');
	grunt.recursivelyLoadTasks('grunt-font', '../node_modules');
	grunt.recursivelyLoadTasks('grunt-wakeup', '../node_modules');


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Globals
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	moduleName: process.cwd().split('/')[( process.cwd().split('/').length - 1 )], //module name


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to build all files for each version
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('createChecksum', 'Add a checksum of all folders to the module.json.', function() {
		var done = this.async();

		Dirsum.digest( './', 'sha1', ['module.json'], function(err, hashes) {

			var module = grunt.file.readJSON( 'module.json' );

			module['hash'] = hashes.hash;

			grunt.file.write( 'module.json', JSON.stringify( module, null, "\t" ) );

			grunt.log.ok('Hash successfully generated');

			done(true);
		});

	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to build all files for each version
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('buildVersions', 'Build all versions in this module.', function() {

		var concat = {};
		var less = {};
		var copy = {};
		var font = {};
		var replace = {};
		var imagemin = {};
		var grunticon = {};
		var clean = {};
		var brands = ['BOM', 'BSA', 'STG', 'WBC'];

		//iterate over all modules
		grunt.file.expand({ filter: 'isDirectory' }, ['./*', '!./node_modules']).forEach(function(dir) {

			var moduleName = process.cwd().split('/')[( process.cwd().split('/').length - 1 )];
			var baseVersion = GetLastestBase();
			var version = dir.substr( dir.lastIndexOf('/') + 1 );


			//concat files
			brands.forEach(function(brand) {
				concat[ version + 'JS' + brand ] = { //js
					src: [
						'../_base/' + baseVersion + '/js/*.js',
						'./' + version + '/js/*.js',
					],
					dest: './' + version + '/tests/' + brand + '/assets/js/gui.js',
				};

				concat[ version + 'Less' + brand ] = { //less
					src: [
						'../_base/' + baseVersion + '/less/base-mixins.less',
						'../_base/' + baseVersion + '/less/settings.less',
						'./' + version + '/less/module-mixins.less',
						'./' + version + '/less/settings.less',
					],
					dest: './' + version + '/tests/' + brand + '/assets/less/gui.less',
				};

				concat[ version + 'HTML' + brand ] = { //html
					src: [
						'./' + version + '/html/header.html',
						'./' + version + '/html/source.html',
						'./' + version + '/html/footer.html',
					],
					dest: './' + version + '/tests/' + brand + '/index.html',
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
						plugins : [ new (require('less-plugin-autoprefix'))({ browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'ie 10' ] }) ],
					},
					src: [
						'./' + version + '/tests/' + brand + '/assets/less/gui.less',
					],
					dest: './' + version + '/tests/' + brand + '/assets/css/gui.css',
				};
			});


			//add versioning to files
			brands.forEach(function(brand) {
				replace[ version + 'Replace' + brand ] = {
					src: [
						'./' + version + '/tests/' + brand + '/assets/js/*.js',
						'./' + version + '/tests/' + brand + '/assets/less/*.less',
						'./' + version + '/tests/' + brand + '/*.html',
					],
					overwrite: true,
					replacements: [{
						from: '[Module-Version-Brand]',
						to: moduleName + ' v' + version + ' ' + brand,
					}, {
						from: '[Module-Version]',
						to: moduleName + ' v' + version,
					}, {
						from: '[Brand]',
						to: brand,
					}, {
						from: '[Debug]',
						to: 'true',
					}],
				};
			});


			//copy font assets
			brands.forEach(function(brand) {
				copy[ version + 'BaseFont' + brand ] = {
					expand: true,
					cwd: '../_base/' + baseVersion + '/_assets/' + brand + '/font',
					src: '*',
					dest: './' + version + '/tests/' + brand + '/assets/font',
				};

				copy[ version + 'Font' + brand ] = {
					expand: true,
					cwd: './' + version + '/_assets/' + brand + '/font',
					src: '*',
					dest: './' + version + '/tests/' + brand + '/assets/font',
				};
			});


			//optimise images
			brands.forEach(function(brand) {
				imagemin[ version + 'Images' + brand ] = {
					options: {
						optimizationLevel: 4,
					},
					files: [{
						expand: true,
						cwd: './' + version + '/_assets/' + brand + '/img/',
						src: ['**/*.{png,jpg,gif}'],
						dest: './' + version + '/tests/' + brand + '/assets/img/',
					}],
				};
			});


			//handle svgs
			var svgselectors = grunt.file.readJSON('./' + version + '/_assets/grunticon.json');

			brands.forEach(function(brand) {
				grunticon[ version + 'SVG' + brand ] = {
					files: [{
						expand: true,
						cwd: './' + version + '/_assets/' + brand + '/svg',
						src: '*.svg',
						dest: './' + version + '/tests/' + brand + '/assets/css',
					}],

					options: {
						datasvgcss: 'symbols.data.svg.css',
						datapngcss: 'symbols.data.png.css',
						urlpngcss: 'symbols.fallback.css',
						cssprefix: '.symbol-',
						pngpath: '../img',
						enhanceSVG: true,
						customselectors: svgselectors,
					},
				};

				copy[ version + 'SVG' + brand ] = {
					expand: true,
					cwd: './' + version + '/tests/' + brand + '/assets/css/png',
					src: '*.png',
					dest: './' + version + '/tests/' + brand + '/assets/img',
				};

				clean[ version + 'SVG' + brand ] = [
					'./' + version + '/tests/' + brand + '/assets/css/preview.html',
					'./' + version + '/tests/' + brand + '/assets/css/grunticon.loader.js',
					'./' + version + '/tests/' + brand + '/assets/css/png/',
				];
			});


			//show current version build
			font[ version ] = {
				text: moduleName + '|' + version,
				options: {
					colors: ['white', 'gray'],
				},
			};

		});

		//running tasks
		grunt.config.set('concat', concat);
		grunt.task.run('concat');

		grunt.config.set('replace', replace);
		grunt.task.run('replace');

		grunt.config.set('less', less);
		grunt.task.run('less');

		grunt.config.set('imagemin', imagemin);
		grunt.task.run('imagemin');

		grunt.config.set('grunticon', grunticon);
		grunt.task.run('grunticon');

		grunt.config.set('copy', copy);
		grunt.task.run('copy');

		grunt.config.set('clean', clean);
		grunt.task.run('clean');

		grunt.config.set('font', font);
		grunt.task.run('font');

	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to watch all files for each version
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('watchVersions', 'Watch all files in each version.', function() {

		var watch = {};
		var brands = ['BOM', 'BSA', 'STG', 'WBC'];

		grunt.file.expand({ filter: 'isDirectory' }, ['./*', '!./node_modules']).forEach(function(dir) {

			var moduleName = process.cwd().split('/')[( process.cwd().split('/').length - 1 )];
			var baseVersion = GetLastestBase();
			var version = dir.substr( dir.lastIndexOf('/') + 1 );


			//create the watch
			watch[ version ] = {
				files: [
					'./' + version + '/**/*.*',
					'!./' + version + '/tests/**/*.*',
					'../_base/' + baseVersion + '/**/*.*',
				],
				tasks: [
					'_build',
				],
			};

		});


		//running tasks
		grunt.config.set('watch', watch);
		grunt.task.run('watch');

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

					'!**/tests/**/*.*',
					'!node_modules/**/*.*',
					'!**/*.svg',
					'!Gruntfile.js',
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
				text: '| GUI',
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
					directory: '../',
					base: '../',
				},
			},
		},

	});



	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Private tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('_build', [
		'lintspaces',
		'buildVersions',
		'createChecksum',
		'wakeup',
	]);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Public tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('default', [
		'font',
		'_build',
		'connect',
		'watchVersions',
	]);

};