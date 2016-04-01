'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//                                    ██████╗  ██╗   ██╗ ██╗     ███╗   ███╗  ██████╗  ██████╗  ██╗   ██╗ ██╗      ███████╗
//                                   ██╔════╝  ██║   ██║ ██║     ████╗ ████║ ██╔═══██╗ ██╔══██╗ ██║   ██║ ██║      ██╔════╝
//                                   ██║  ███╗ ██║   ██║ ██║     ██╔████╔██║ ██║   ██║ ██║  ██║ ██║   ██║ ██║      █████╗
//                                   ██║   ██║ ██║   ██║ ██║     ██║╚██╔╝██║ ██║   ██║ ██║  ██║ ██║   ██║ ██║      ██╔══╝
//                                   ╚██████╔╝ ╚██████╔╝ ██║     ██║ ╚═╝ ██║ ╚██████╔╝ ██████╔╝ ╚██████╔╝ ███████╗ ███████╗
//                                    ╚═════╝   ╚═════╝  ╚═╝     ╚═╝     ╚═╝  ╚═════╝  ╚═════╝   ╚═════╝  ╚══════╝ ╚══════╝
//                                                                       Created by Westpac Design Delivery Team
// @desc     GUI source compiling a module
// @author   Dominik Wilkowski
// @website  https://github.com/WestpacCXTeam/
// @issues   https://github.com/WestpacCXTeam/GUI-source/issues
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// External dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var MultiStream = require('multistream')
var Crypto = require('crypto');
var Path = require('path');
var Du = require('du');
var Fs = require('fs');


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
 * Create a checksum for a string
 *
 * @param   str        [string]  String to be decoded
 * @param   algorithm  [string]  Algorithm to be used, Default: sha1
 * @param   encoding   [string]  Encoding to be used, Default: hex
 *
 * @return  [array]  All files needed
 */
function checksum(str, algorithm, encoding) {
	return crypto
		.createHash(algorithm || 'sha1')
		.update(str, 'utf8')
		.digest(encoding || 'hex');
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
	try { //see first if there is a node_modules folder in the parent before complaining about nothing being there
		Fs.statSync('../node_modules/grunt-contrib-less'); //I guess less is a good test no?

		require('../node_modules/grunt-recursively-load-tasks')(grunt); //recursively load dependencies(this way we don't have to install them in each module)

		grunt.recursivelyLoadTasks('grunt-contrib-imagemin', '../node_modules');
		grunt.recursivelyLoadTasks('grunt-contrib-connect', '../node_modules');
		grunt.recursivelyLoadTasks('grunt-contrib-uglify', '../node_modules');
		grunt.recursivelyLoadTasks('grunt-contrib-concat', '../node_modules');
		grunt.recursivelyLoadTasks('grunt-contrib-watch', '../node_modules');
		grunt.recursivelyLoadTasks('grunt-contrib-clean', '../node_modules');
		grunt.recursivelyLoadTasks('grunt-contrib-copy', '../node_modules');
		grunt.recursivelyLoadTasks('grunt-contrib-less', '../node_modules');
		grunt.recursivelyLoadTasks('grunt-text-replace', '../node_modules');
		grunt.recursivelyLoadTasks('grunt-lintspaces', '../node_modules');
		grunt.recursivelyLoadTasks('grunt-grunticon', '../node_modules');
		grunt.recursivelyLoadTasks('grunt-prompt', '../node_modules');
		grunt.recursivelyLoadTasks('grunt-wakeup', '../node_modules');
		grunt.recursivelyLoadTasks('grunt-font', '../node_modules');
		require('../node_modules/time-grunt')(grunt);
	}
	catch(e) { //well it looks like no parent, now fall back to local node_modules
		grunt.loadNpmTasks('grunt-contrib-imagemin');
		grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-contrib-less');
		grunt.loadNpmTasks('grunt-text-replace');
		grunt.loadNpmTasks('grunt-lintspaces');
		grunt.loadNpmTasks('grunt-grunticon');
		grunt.loadNpmTasks('grunt-prompt');
		grunt.loadNpmTasks('grunt-wakeup');
		grunt.loadNpmTasks('grunt-font');
		require('time-grunt')(grunt);
	}


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Globals
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	moduleName: process.cwd().split('/')[( process.cwd().split('/').length - 1 )], //module name


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to calculate checksum of all source files
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('createChecksum', 'Add a checksum of all folders to the module.json.', function() {
		var sumDone = this.async();
		var hasher = Crypto.createHash('md5');
		var module = grunt.file.readJSON( 'module.json' );
		var streams = [];

		grunt.file.expand({ filter: 'isFile' }, [
				'_assets/**/*',
				'less/**/*',
				'js/**/*',
			]).forEach(function( file ) {
				streams.push( Fs.createReadStream( file ) ); //get all relevant files
		});

		MultiStream( streams )
			.on('data', function( data ) {
				hasher.update(data, 'utf8'); //pipe content to hasher
			})
			.on('end', function() {
				var hash = hasher.digest('hex'); //get checksum

				module['hash'] = hash;

				grunt.file.write( 'module.json', JSON.stringify( module, null, "\t" ) );
				grunt.log.ok( hash + ' hash successfully generated' );

				sumDone(true);
			});

	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to calculate the size
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('calculateSize', 'Calculate the size and add it to the module.json.', function() {
		var calDone = this.async();

		var module = grunt.file.readJSON( 'module.json' );
		var version = '1.0.0';
		var sizeCSS = 0;
		var sizeGrunticon = 0;
		var sizeImg = 0;
		var sizeJs = 0;

		Object.keys( module.versions ).forEach(function iterateCore( ver ) {
			version = ver; //getting latest version
		});


		Du('tests/WBC/assets/size/size.css', function(err, sizeCSS) {

			Du('tests/WBC/assets/css/symbols.data.svg.css', function(err, sizeGrunticon) {

				Du('tests/WBC/assets/img/', function(err, sizeImg) {

					Du('tests/WBC/assets/size/size.js', function(err, sizeJs) {

						Du('tests/WBC/assets/size/coreSize.css', function(err, sizeCore) {
							sizeCSS = sizeCSS || 0;
							sizeGrunticon = sizeGrunticon || 0;
							sizeImg = sizeImg || 0;
							sizeJs = sizeJs || 0;

							var size = Math.ceil( //size of all important elements
								( ( sizeCSS + sizeGrunticon + sizeImg + sizeJs ) - sizeCore ) / 1000
							);

							if( size <= 0 ) {
								size = 1;
							}

							var module = grunt.file.readJSON( 'module.json' );

							module.versions[version]['size'] = parseInt( size );
							grunt.file.write( 'module.json', JSON.stringify( module, null, "\t" ) );

							grunt.log.ok( size + 'kb size successfully calculated' );


							calDone(true);
						});
					});
				});
			});

		});

	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to build all files in each brand
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('buildVersions', 'Build this module.', function() {

		var concat = {};
		var less = {};
		var uglify = {};
		var copy = {};
		var font = {};
		var replace = {};
		var imagemin = {};
		var grunticon = {};
		var clean = {};
		// var brands = ['BOM', 'BSA', 'STG', 'WBC'];

		var module = grunt.file.readJSON( 'module.json' );
		var moduleName = module.ID;
		var svgselectors = grunt.file.readJSON('_assets/grunticon.json');
		var version = '1.0.0';

		Object.keys( module.versions ).forEach(function iterateCore( ver ) {
			version = ver; //getting latest version
		});


		//creating task queue
		var tasks = (function() {
			return {
				queue: [],

				add: function(stuff) {
					tasks.queue.push( stuff );
				},

				get: function() {
					return tasks.queue;
				}
			}
		}());


		//create tasks for each brand
		SETTINGS(grunt).brands.forEach(function( brand ) {

			//////////////////////////////////////| UGLIFY JS
			uglify[ 'uglify' + brand ] = {
				files: [{
					expand: true,
					cwd: 'js/',
					src: '*.js',
					dest: 'tests/' + brand + '/assets/size/',
					rename: function(path, src, options) {
						return path + 'size.js';
					}
				}],
			};
			tasks.add( 'uglify:uglify' + brand );


			//////////////////////////////////////| CONCAT FILES
			var srcFiles = ['_core/js/*.js']; //js
			srcFiles.push('js/*.js');

			concat[ 'JS' + brand ] = {
				src: srcFiles,
				dest: 'tests/' + brand + '/assets/js/gui.js',
			};
			tasks.add( 'concat:JS' + brand );

			var srcFiles = ['_core/less/core.less']; //less
			srcFiles.push('less/module-mixins.less');
			srcFiles.push('_core/less/core-after.less');

			concat[ 'Less' + brand ] = {
				src: srcFiles,
				dest: 'tests/' + brand + '/assets/less/gui.less',
			};
			tasks.add( 'concat:Less' + brand );

			if( module.core === true ) { //if this is a core module
				if( module.ID === '_colors' ) {
					var srcFiles = [
						'less/module-mixins.less',
						'_core/less/core-after.less',
					];
				}
			}
			else { //all other modules
				var srcFiles = [
					'_core/less/core.less',
					'_core/less/core-after.less',
				];
			}

			concat[ 'coreSize' + brand ] = { //coreSize
				src: srcFiles,
				dest: 'tests/' + brand + '/assets/less/coreSize.less',
			};
			tasks.add( 'concat:coreSize' + brand );

			concat[ 'HTML' + brand ] = { //html
				src: [
					'html/header.html',
					'html/source.html',
					'html/footer.html',
				],
				dest: 'tests/' + brand + '/index.html',
			};
			tasks.add( 'concat:HTML' + brand );


			//////////////////////////////////////| ADD VERSIONING TO FILES
			replace[ 'Replace' + brand ] = { //brand all files
				src: [
					'tests/' + brand + '/assets/js/*.js',
					'tests/' + brand + '/assets/less/*.less',
					'tests/' + brand + '/*.html',
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
			tasks.add( 'replace:Replace' + brand );

			replace[ 'ReplaceTest' + brand ] = { //brand test files
				src: [
					'less/test.less',
				],
				overwrite: false,
				dest: 'tests/' + brand + '/assets/less/test.less',
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
			tasks.add( 'replace:ReplaceTest' + brand );

			replace[ 'ReplaceSize' + brand ] = { //brand size files
				src: [
					'tests/' + brand + '/assets/less/coreSize.less'
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
			tasks.add( 'replace:ReplaceSize' + brand );


			//////////////////////////////////////| COMPILE LESS
			less[ 'Less' + brand ] = {
				options: {
					cleancss: true,
					compress: false,
					ieCompat: true,
					report: 'min',
					plugins : [ new (require('less-plugin-autoprefix'))({ browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'ie 10' ] }) ],
				},
				src: [
					'tests/' + brand + '/assets/less/gui.less',
				],
				dest: 'tests/' + brand + '/assets/css/gui.css',
			};
			tasks.add( 'less:Less' + brand );

			less[ 'LessSize' + brand ] = { //minified css for size calculation
				options: {
					cleancss: true,
					compress: true,
					ieCompat: true,
					report: 'min',
					plugins : [ new (require('less-plugin-autoprefix'))({ browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'ie 10' ] }) ],
				},
				src: [
					'tests/' + brand + '/assets/less/gui.less',
				],
				dest: 'tests/' + brand + '/assets/size/size.css',
			};
			tasks.add( 'less:LessSize' + brand );

			less[ 'CoreSize' + brand ] = { //minified core css for size calculation
				options: {
					cleancss: true,
					compress: true,
					ieCompat: true,
					report: 'min',
					plugins : [ new (require('less-plugin-autoprefix'))({ browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'ie 10' ] }) ],
				},
				src: [
					'tests/' + brand + '/assets/less/coreSize.less',
				],
				dest: 'tests/' + brand + '/assets/size/coreSize.css',
			};
			tasks.add( 'less:CoreSize' + brand );

			less[ 'LessTest' + brand ] = {
				options: {
					cleancss: true,
					compress: false,
					ieCompat: true,
					report: 'min',
					plugins : [ new (require('less-plugin-autoprefix'))({ browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'ie 10' ] }) ],
				},
				src: [
					'tests/' + brand + '/assets/less/test.less',
				],
				dest: 'tests/' + brand + '/assets/css/test.css',
			};
			tasks.add( 'less:LessTest' + brand );


			//////////////////////////////////////| CLEAN SIZE FOLDER
			clean[ 'cleanSize' + brand ] = [
				'tests/' + brand + '/assets/size/sizeTemp.js',
			];
			tasks.add( 'clean:cleanSize' + brand );


			//////////////////////////////////////| COPY FONT ASSETS
			copy[ 'CoreFont' + brand ] = {
				expand: true,
				cwd: '_core/font/' + brand + '/',
				src: '**.*',
				dest: 'tests/' + brand + '/assets/font',
			};
			tasks.add( 'copy:CoreFont' + brand );

			copy[ 'Font' + brand ] = {
				expand: true,
				cwd: '_assets/' + brand + '/font/',
				src: '*',
				dest: 'tests/' + brand + '/assets/font',
			};
			tasks.add( 'copy:Font' + brand );


			//////////////////////////////////////| OPTIMISE IMAGES
			imagemin[ 'Images' + brand ] = {
				options: {
					optimizationLevel: 4,
				},
				files: [{
					expand: true,
					cwd: '_assets/' + brand + '/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'tests/' + brand + '/assets/img/',
				}],
			};
			tasks.add( 'imagemin:Images' + brand );


			//////////////////////////////////////| BRAND SVGS FOR IE8 FALLBACK
			replace[ 'ReplaceSVG' + brand ] = {
				src: [
					'_assets/_svgs/*.svg',
				],
				dest: 'tests/' + brand + '/assets/svg/',
				replacements: [{
					from: '[svg-color]',
					to: SETTINGS(grunt).colors[brand]['Color-Text'],
				}],
			};
			tasks.add( 'replace:ReplaceSVG' + brand );


			//////////////////////////////////////| COMPILE SVGS
			grunticon[ 'SVG' + brand ] = {
				files: [{
					expand: true,
					cwd: 'tests/' + brand + '/assets/svg',
					src: '*.svg',
					dest: 'tests/' + brand + '/assets/css',
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
			tasks.add( 'grunticon:SVG' + brand );


			//////////////////////////////////////| COPY FALLBACK PNGS
			copy[ 'SVG' + brand ] = {
				expand: true,
				cwd: 'tests/' + brand + '/assets/css/png',
				src: '*.png',
				dest: 'tests/' + brand + '/assets/img',
			};
			tasks.add( 'copy:SVG' + brand );


			//////////////////////////////////////| BRAND SVGS FOR REALZ NOW!
			replace[ 'ReplaceSVGAgain' + brand ] = {
				src: [
					'_assets/_svgs/*.svg',
				],
				dest: 'tests/' + brand + '/assets/svg/',
				replacements: [{
					from: '[svg-color]',
					to: SETTINGS(grunt).colors[brand]['Color-Muted'],
				}, {
					from: '[lists-link]',
					to: SETTINGS(grunt).colors[brand]['lists-link'],
				}, {
					from: '[lists-tick]',
					to: SETTINGS(grunt).colors[brand]['lists-tick'],
				}, {
					from: '[radcheck-active]',
					to: SETTINGS(grunt).colors[brand]['radcheck-active'],
				}, {
					from: '[radcheck-disbaled-bg]',
					to: SETTINGS(grunt).colors[brand]['radcheck-disbaled-bg'],
				}, {
					from: '[radcheck-disbaled-border]',
					to: SETTINGS(grunt).colors[brand]['radcheck-disbaled-border'],
				}],
			};
			tasks.add( 'replace:ReplaceSVGAgain' + brand );


			//////////////////////////////////////| ADD UNIQUE TITLES TO SVGS
			try {
				Fs.statSync( '_assets/_svgs/' );
				SVGfiles = '_assets/_svgs/*.svg';
			}
			catch(error) {
				var SVGfiles = 'tests/' + brand + '/assets/svg/*.svg';
			}

			grunt.file.expand({ filter: 'isFile' }, SVGfiles).forEach(function( file ) {
				var filename = Path.basename( file, '.svg' )

				replace[ 'ReplaceSVG-' + brand + '-' + filename ] = {
					src: [ 'tests/' + brand + '/assets/svg/' + filename + '.svg' ],
					overwrite: true,
					replacements: [{
						from: '[Filename]',
						to: '-' + filename,
					}],
				};

				tasks.add( 'replace:ReplaceSVG-' + brand + '-' + filename );
			});


			//////////////////////////////////////| COMPILE SVGS AGAIN
			tasks.add( 'grunticon:SVG' + brand );


			//////////////////////////////////////| CLEANING UP
			clean[ 'SVG' + brand ] = [
				'tests/' + brand + '/assets/css/preview.html',
				'tests/' + brand + '/assets/css/grunticon.loader.js',
				'tests/' + brand + '/assets/css/png/',
			];
			tasks.add( 'clean:SVG' + brand );
		});


		//////////////////////////////////////| SHOW CURRENT VERSION BUILD
		font[ version ] = {
			text: moduleName + '|' + version,
			options: {
				colors: ['white', 'gray'],
			},
		};


		//assigning tasks
		grunt.config.set('uglify', uglify);
		grunt.config.set('concat', concat);
		grunt.config.set('replace', replace);
		grunt.config.set('less', less);
		grunt.config.set('imagemin', imagemin);
		grunt.config.set('grunticon', grunticon);
		grunt.config.set('copy', copy);
		grunt.config.set('clean', clean);

		//running tasks in order
		var allTasks = tasks.get();

		allTasks.forEach(function iterateTasks( task ) {
			grunt.task.run( task );
		});

		grunt.task.run('calculateSize');
		grunt.task.run('createChecksum');

		grunt.config.set('font', font);
		grunt.task.run('font');

	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to copy symbole files
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('copySymbole', 'Build this module.', function() {

		var copy = {};

		//create tasks for each brand
		SETTINGS(grunt).brands.forEach(function( brand ) {

			copy[ 'SVGfiles' + brand ] = {
				expand: true,
				cwd: '_assets/' + brand + '/svg',
				src: '*.svg',
				dest: 'tests/' + brand + '/assets/svg',
			};

		});

		grunt.config.set('copy', copy);
		grunt.task.run('copy');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Grunt tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.initConfig({


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// GLOBALS
		//----------------------------------------------------------------------------------------------------------------------------------------------------------


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// LINT SPACES
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		lintspaces: {
			all: {
				options: {
					editorconfig: '.editorconfig',
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
		// Cleaning test folder
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		clean: {
			test: ['tests'],
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
		// watch for changes
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		watch: {
			options: {
				livereload: true,
			},

			All: {
				files: [
					'_assets/**/*',
					'_core/**/*',
					'less/**/*.less',
					'js/**/*.js',
					'html/**/*.html',
				],
				tasks: [
					'_build',
				],
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


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// server
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		connect: {
			server: {
				options: {
					open: false,
					hostname: '127.0.0.1',
					port: 1337,
					directory: 'tests/',
					base: 'tests/',
				},
			},
		},

	});



	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Private tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('_build', [
		// 'lintspaces',
		'clean',
		'copySymbole',
		'buildVersions',
		'wakeup',
	]);

	grunt.registerTask('_ubergrunt', [
		'clean',
		'copySymbole',
		'buildVersions',
	]);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Public tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('default', [
		'font',
		'_build',
		'connect',
		'watch',
	]);

};