'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//                                                ██████╗  ██╗   ██╗ ██╗      ██████╗  ██████╗  ██████╗  ███████╗
//                                               ██╔════╝  ██║   ██║ ██║     ██╔════╝ ██╔═══██╗ ██╔══██╗ ██╔════╝
//                                               ██║  ███╗ ██║   ██║ ██║     ██║      ██║   ██║ ██████╔╝ █████╗
//                                               ██║   ██║ ██║   ██║ ██║     ██║      ██║   ██║ ██╔══██╗ ██╔══╝
//                                               ╚██████╔╝ ╚██████╔╝ ██║     ╚██████╗ ╚██████╔╝ ██║  ██║ ███████╗
//                                                ╚═════╝   ╚═════╝  ╚═╝      ╚═════╝  ╚═════╝  ╚═╝  ╚═╝ ╚══════╝
//                                                                       Created by Westpac Design Delivery Team
// @desc     GUI source running core module
// @author   Dominik Wilkowski
// @website  https://github.com/WestpacCXTeam/GUI-source
// @issues   https://github.com/WestpacCXTeam/GUI-source/issues
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// External dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var Path = require('path');
var Du = require('du');
var Fs = require('fs');


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
 * Get latest version of a module
 *
 * @param   module  [string]  Module name
 *
 * @return  [string]  Version string for latest version
 */
function GetLastest( module ) {
	var dir = '../' + module;
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
 * Get all core modules
 *
 * @param   grunt    [object]  Grunt object
 * @param   exclude  [string]  ID of module to be excluded
 *
 * @return  [array]  All files needed
 */
function GetCore( grunt, exclude ) {
	var GUI = grunt.file.readJSON( '../GUI.json' );
	var core = {
		js: [],
		less: [],
		BOMfont: [],
		BSAfont: [],
		STGfont: [],
		WBCfont: [],
		size: 0,
	};

	Object.keys( GUI.modules._core ).forEach(function iterateCore( module ) {

		if( module !== exclude ) {
			var version = GetLastest(module);

			if( GUI.modules._core[module].versions[version].js ) {
				core.js.push('../' + module + '/' + version + '/js/*.js');
			}

			if( GUI.modules._core[module].versions[version].less ) {
				core.less.push('../' + module + '/' + version + '/less/module-mixins.less');
			}

			if( GUI.modules._core[module].versions[version].font ) {
				core.BOMfont.push('../' + module + '/' + version + '/_assets/BOM/font');
				core.BSAfont.push('../' + module + '/' + version + '/_assets/BSA/font');
				core.STGfont.push('../' + module + '/' + version + '/_assets/STG/font');
				core.WBCfont.push('../' + module + '/' + version + '/_assets/WBC/font');
			}

			core.size = parseInt( GUI.modules._core[module].versions[version].size );
		}
	});

	return core;
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
		var sumDone = this.async();
		var exclusion = ['module.json', 'Gruntfile.js', 'package.json']; //these are not relevant for the modules
		var module = grunt.file.readJSON( 'module.json' );

		//iterate over all versions
		Object.keys( module.versions ).forEach(function iterateCore( version ) {
			exclusion.push(version + '/tests/'); //exclude test folder as the core modules are compiled into them
		});

		//get checksum
		Dirsum.digest( '.', 'sha1', exclusion, function(err, hashes) {

			var module = grunt.file.readJSON( 'module.json' );
			module['hash'] = hashes.hash;

			grunt.file.write( 'module.json', JSON.stringify( module, null, "\t" ) );
			grunt.log.ok( hashes.hash + ' hash successfully generated' );

			sumDone(true);
		});

	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to calculate the size of each version
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('calculateSize', 'Calculate the size of each version and add it to the module.json.', function() {
		var calDone = this.async();

		var module = grunt.file.readJSON( 'module.json' );
		// var core = GetCore( grunt, module.ID );
		var counter = Object.keys(module.versions).length;

		//iterate over all versions
		Object.keys( module.versions ).forEach(function iterateCore( version ) {

			Du(version + '/tests/WBC/assets/', function(err, sizeAssets) {

				Du(version + '/tests/WBC/assets/css/test.css', function(err, sizeTest) {

					Du(version + '/tests/WBC/assets/font/', function(err, sizeFont) {

						Du(version + '/tests/WBC/assets/less/', function(err, sizeLess) {
							var size = Math.ceil( ( (sizeAssets - sizeLess - sizeFont - sizeTest - 96000) / 1000 ) ); //size of test/WBC folder minus core size

							var module = grunt.file.readJSON( 'module.json' );

							module.versions[version]['size'] = parseInt( size );
							grunt.file.write( 'module.json', JSON.stringify( module, null, "\t" ) );

							grunt.log.ok( size + 'kb size successfully calculated' );

							counter--;

							if( counter === 0 ) {
								calDone(true);
							}
						});
					});
				});
			});

		});

	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to build all files for each version
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('buildVersions', 'Build all versions in this module.', function() {

		var srcFiles = {};
		var concat = {};
		var less = {};
		var copy = {};
		var font = {};
		var replace = {};
		var imagemin = {};
		var grunticon = {};
		var clean = {};
		var brands = ['BOM', 'BSA', 'STG', 'WBC'];

		var module = grunt.file.readJSON( 'module.json' );
		var core = GetCore( grunt );

		//iterate over all versions
		Object.keys( module.versions ).forEach(function iterateCore( version ) {
			var moduleName = module.ID;
			var svgselectors = grunt.file.readJSON(version + '/_assets/grunticon.json');

			//create tasks for each brand
			brands.forEach(function( brand ) {

				//////////////////////////////////////| CONCAT FILES
				srcFiles = core.js; //js
				// srcFiles.push(version + '/js/*.js');

				concat[ version + 'JS' + brand ] = {
					src: srcFiles,
					dest: version + '/tests/' + brand + '/assets/js/gui.js',
				};

				srcFiles = core.less; //less
				// srcFiles.push(version + '/less/module-mixins.less');

				concat[ version + 'Less' + brand ] = {
					src: srcFiles,
					dest: version + '/tests/' + brand + '/assets/less/gui.less',
				};

				concat[ version + 'HTML' + brand ] = { //html
					src: [
						version + '/html/header.html',
						version + '/html/source.html',
						version + '/html/footer.html',
					],
					dest: version + '/tests/' + brand + '/index.html',
				};


				//////////////////////////////////////| ADD VERSIONING TO FILES
				replace[ version + 'Replace' + brand ] = {
					src: [
						version + '/tests/' + brand + '/assets/js/*.js',
						version + '/tests/' + brand + '/assets/less/*.less',
						version + '/tests/' + brand + '/*.html',
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

				replace[ version + 'ReplaceTest' + brand ] = {
					src: [
						version + '/less/test.less',
					],
					overwrite: false,
					dest: version + '/tests/' + brand + '/assets/less/test.less',
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


				//////////////////////////////////////| COMPILE LESS
				less[ version + 'Less' + brand ] = {
					options: {
						cleancss: true,
						compress: false,
						ieCompat: true,
						report: 'min',
						plugins : [ new (require('less-plugin-autoprefix'))({ browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'ie 10' ] }) ],
					},
					src: [
						version + '/tests/' + brand + '/assets/less/gui.less',
					],
					dest: version + '/tests/' + brand + '/assets/css/gui.css',
				};

				less[ version + 'LessTest' + brand ] = {
					options: {
						cleancss: true,
						compress: false,
						ieCompat: true,
						report: 'min',
						plugins : [ new (require('less-plugin-autoprefix'))({ browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'ie 10' ] }) ],
					},
					src: [
						version + '/tests/' + brand + '/assets/less/test.less',
					],
					dest: version + '/tests/' + brand + '/assets/css/test.css',
				};


				//////////////////////////////////////| COPY FONT ASSETS
				core[ brand + 'font' ].forEach(function( path ) {
					copy[ version + 'CoreFont' + brand ] = {
						expand: true,
						cwd: path,
						src: '*',
						dest: version + '/tests/' + brand + '/assets/font',
					};
				});

				// copy[ version + 'Font' + brand ] = {
				// 	expand: true,
				// 	cwd: version + '/_assets/' + brand + '/font',
				// 	src: '*',
				// 	dest: version + '/tests/' + brand + '/assets/font',
				// };


				//////////////////////////////////////| OPTIMISE IMAGES
				imagemin[ version + 'Images' + brand ] = {
					options: {
						optimizationLevel: 4,
					},
					files: [{
						expand: true,
						cwd: version + '/_assets/' + brand + '/img/',
						src: ['**/*.{png,jpg,gif}'],
						dest: version + '/tests/' + brand + '/assets/img/',
					}],
				};


				//////////////////////////////////////| HANDLE SVGS
				grunticon[ version + 'SVG' + brand ] = {
					files: [{
						expand: true,
						cwd: version + '/_assets/' + brand + '/svg',
						src: '*.svg',
						dest: version + '/tests/' + brand + '/assets/css',
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
					cwd: version + '/tests/' + brand + '/assets/css/png',
					src: '*.png',
					dest: version + '/tests/' + brand + '/assets/img',
				};

				clean[ version + 'SVG' + brand ] = [
					version + '/tests/' + brand + '/assets/css/preview.html',
					version + '/tests/' + brand + '/assets/css/grunticon.loader.js',
					version + '/tests/' + brand + '/assets/css/png/',
				];
			});


			//////////////////////////////////////| SHOW CURRENT VERSION BUILD
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

		grunt.task.run('calculateSize');
		grunt.task.run('createChecksum');

		grunt.config.set('font', font);
		grunt.task.run('font');

	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to watch all files for each version
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('watchVersions', 'Watch all files in each version.', function() {

		var watch = {};

		var module = grunt.file.readJSON( 'module.json' );

		//iterate over all versions
		Object.keys( module.versions ).forEach(function iterateCore( version ) {

			//create the watch
			watch[ version ] = {
				files: [
					'./' + version + '/**/*.*',
					'!./' + version + '/tests/**/*.*',
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
		// 'createChecksum',
		'wakeup',
	]);

	grunt.registerTask('_ubergrunt', [
		'buildVersions',
		// 'createChecksum',
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