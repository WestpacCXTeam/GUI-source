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
var Prompt = require('prompt');
var Chalk = require('chalk');
var Path = require('path');
var Fs = require('fs');


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
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-wakeup');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-font');
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
		grunt.verbose.writeln( 'Copying latest readme and module.json' );
		grunt.file.expand({ filter: 'isDirectory' }, [
			'*',
			'!node_modules',
			'!docs',
			'!._templates',
			'!_sandbox',
			'!.git',
			'!.github',
		]).forEach(function(dir) {
			grunt.verbose.writeln( 'Reading directory: ' + dir );

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
		grunt.verbose.writeln( 'Building GUI.json' );
		grunt.file.expand({ filter: 'isDirectory' }, [
			'*',
			'!node_modules',
			'!docs',
			'!._templates',
			'!_sandbox',
			'!.github',
			'!.git',
		]).forEach(function(dir) {
			grunt.verbose.writeln( 'Reading directory: ' + dir );

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
		grunt.verbose.writeln( 'Building index.html' );
		Object.keys( GUI.modules ).forEach(function iterateCategories( category ) {
			grunt.verbose.writeln( 'Iterating category: ' + category );

			Object.keys( GUI.modules[category] ).forEach(function iterateModules( moduleKey ) {
				grunt.verbose.writeln( 'Iterating module: ' + moduleKey );

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
						grunt.verbose.writeln( 'Iterating version: ' + version );

						var subdir = './' + module.ID + '/' + version + '/tests/';

						//adding the modules into the index
						replaceStr += '			<li>' + "\n" +
							'				<h4 class="body-font version-headline">v' + version + '</h4>' + "\n" +
							'				<ul class="gui-list-version-brand">' + "\n";

						//adding brand links
						module.versions[version].brands.forEach(function( brand ) {
							grunt.verbose.writeln( 'Iterating brand: ' + brand );

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
			dest: 'docs/index.html',
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
	// Custom grunt task to copy all module/version tests to docs
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('copyTests', 'Copy all submodule test folders to docs folder.', function() {
		grunt.task.requires('clean:docs');

		var copy = {};

		//copying submodules to docs folder
		grunt.verbose.writeln( 'Copying submodule tests to docs folder' );
		copy[ 'Copy' ] = {
			files: [{
				expand: true,
				src: [
					'**/tests/*/index.html',
					'**/tests/*/assets/css/*',
					'**/tests/*/assets/js/*',
					'**/tests/*/assets/font/*',
					'!node_modules',
					'!docs',
					'!._templates',
					'!_sandbox',
					'!.git',
					'!.github',
				],
				dest: 'docs',
			}]
		};

		//running tasks
		grunt.config.set('copy', copy);
		grunt.task.run('copy');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to synchronize submodules' remote URL configuration setting to the value specified in .gitmodules.
	// Running this ensures submodule updates are sync'd between developers
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('submoduleSync', 'Git sync the submodules.', function() {

		var exec = {};

		// Running git submodule sync
		grunt.verbose.writeln( 'Running git submodule sync' );
		exec[ 'submodule-sync' ] = { //SYNC
			options: {
				stderr: false,
				stdout: true,
			},
			command: 'git submodule sync',
		};

		//running tasks
		grunt.config.set('exec', exec);
		grunt.task.run('exec:submodule-sync');
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to create a page for all modules
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('buildEverything', 'Build a page to test all the latest versions in one site.', function() {
		var GUI = grunt.file.readJSON('GUI.json');
		var lessIncludes = '@import "core.less";' + "\n";
		var replace = {};
		var concat = {};
		var less = {};
		var copy = {};

		// grunt.task.run('clean:sandboxLess'); //clean less/modules folder
		// grunt.task.run('clean:sandboxJS'); //clean js/modules folder

		Object.keys( GUI.modules ).forEach(function iterateCategories( category ) {
			Object.keys( GUI.modules[category] ).forEach(function iterateModules( module ) {

				if( category != '_testing' && GUI.modules[category][module].core !== true && GUI.modules[category][module].deprecated !== true) { //exclude _testing and _core categories, and deprecated modules
					var latestVersion = '1.0.0';

					//getting latest version
					latestVersion = (latestVersion = Object.keys( GUI.modules[category][module].versions ))[latestVersion.length-1];

					grunt.log.oklns( 'Going through: ' + module + ':' + latestVersion );

					//LESS
					if( GUI.modules[category][module].versions[latestVersion].less ) {
						grunt.verbose.writeln( 'LESS ENABLED' );

						copy[ 'Less-' + module ] = {
							files: [{
								cwd: module + '/' + latestVersion + '/less/',
								src: [
									'module-mixins.less',
								],
								dest: 'docs/_sandbox/_assets/less/modules/',
								rename: function(dest, src) {
									return dest + '/' + module + '.less';
								},
								filter: 'isFile',
								expand: true,
							}],
						};

						replace[ 'Less-' + module ] = {
							src: ['docs/_sandbox/_assets/less/modules/' + module + '.less'],
							overwrite: true,
							replacements: [
								{
									from: '[Module-Version-Brand]',
									to: ' ' + GUI.modules[category][module].name + ' v' + latestVersion + ' WBC',
								},
								{
									from: '[Brand]',
									to: 'WBC',
								},
							],
						};

						lessIncludes += '@import "modules/' + module + '.less";' + "\n"; //building less file to include all modules
					}

					//SVG
					if( GUI.modules[category][module].versions[latestVersion].svg ) {
						grunt.verbose.writeln( 'SVG ENABLED' );

						SETTINGS( grunt ).brands.forEach(function iterateBrands( brand ) {
							try {
								var symbolsPNG = grunt.file.read( 'docs/_sandbox/' + brand.ID + '/assets/css/symbols.data.png.css' );
								var symbolsSVG = grunt.file.read( 'docs/_sandbox/' + brand.ID + '/assets/css/symbols.data.svg.css' );
								var symbolsFallback = grunt.file.read( 'docs/_sandbox/' + brand.ID + '/assets/css/symbols.fallback.css' );
							}
							catch(e) {
								grunt.verbose.writeln( 'No SVG files found in sandbox folder. Starting from scratch!' );
								var symbolsPNG = '';
								var symbolsSVG = '';
								var symbolsFallback = '';
							}

							symbolsPNG += grunt.file.read( module + '/' + latestVersion + '/tests/' + brand.ID + '/assets/css/symbols.data.png.css' );
							symbolsSVG += grunt.file.read( module + '/' + latestVersion + '/tests/' + brand.ID + '/assets/css/symbols.data.svg.css' );
							symbolsFallback += grunt.file.read( module + '/' + latestVersion + '/tests/' + brand.ID + '/assets/css/symbols.fallback.css' );

							grunt.file.write( 'docs/_sandbox/' + brand.ID + '/assets/css/symbols.data.png.css', symbolsPNG );
							grunt.file.write( 'docs/_sandbox/' + brand.ID + '/assets/css/symbols.data.svg.css', symbolsSVG );
							grunt.file.write( 'docs/_sandbox/' + brand.ID + '/assets/css/symbols.fallback.css', symbolsFallback );

							copy[ 'SVGFallback-' + module ] = {
								files: [{
									cwd: module + '/' + latestVersion + '/tests/' + brand.ID + '/assets/img/',
									src: [
										'*.png',
									],
									dest: 'docs/_sandbox/' + brand.ID + '/assets/img/',
									filter: 'isFile',
									expand: true,
								}],
							};
						});
					}

					//JS
					if( GUI.modules[category][module].versions[latestVersion].js ) {
						grunt.verbose.writeln( 'JS ENABLED' );

						copy[ 'js-' + module ] = {
							files: [{
								cwd: module + '/' + latestVersion + '/js/',
								src: [
									'*.js',
								],
								dest: 'docs/_sandbox/_assets/js/modules/',
								filter: 'isFile',
								expand: true,
							}],
						};

						replace[ 'JS-' + module ] = {
							src: ['docs/_sandbox/_assets/js/modules/' + module + '.js'],
							overwrite: true,
							replacements: [
								{
									from: '[Module-Version]',
									to: ' ' + GUI.modules[category][module].name + ' v' + latestVersion + ' ',
								},
							],
						};
					}

					//FONT
					if( GUI.modules[category][module].versions[latestVersion].font ) {
						grunt.verbose.writeln( 'FONT ENABLED' );

						SETTINGS( grunt ).brands.forEach(function iterateBrands( brand ) {
							copy[ 'fonts-' + module + brand.ID ] = {
								files: [{
									cwd: module + '/' + latestVersion + '/_assets/' + brand.ID + '/font/',
									src: [
										'*.ttf',
										'*.woff',
										'*.woff2',
										'*.eot',
										'*.svg',
									],
									dest: 'docs/_sandbox/' + brand.ID + '/assets/font/',
									filter: 'isFile',
									expand: true,
								}],
							};
						});
					}

				}
			});
		});

		//LESS
		grunt.file.write( 'docs/_sandbox/_assets/less/gui.less', lessIncludes ); //writing less file

		SETTINGS( grunt ).brands.forEach(function iterateBrands( brand ) {
			less[ 'sandbox' + brand.ID ] = {
				options: {
					cleancss: true,
					compress: true,
					ieCompat: true,
					report: 'min',
					modifyVars: {
						'brand': brand.ID,
					},
					plugins : [ new (require('less-plugin-autoprefix'))({ browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'ie 10' ] }) ],
				},
				src: ['docs/_sandbox/_assets/less/gui.less'],
				dest: 'docs/_sandbox/' + brand.ID + '/assets/css/gui.min.css',
			};
		});

		//JS
		SETTINGS( grunt ).brands.forEach(function iterateBrands( brand ) {
			concat[ 'js-' + brand.ID ] = {
				src: [
					'docs/_sandbox/_assets/js/*.js',
					'docs/_sandbox/_assets/js/modules/*.js',
				],
				dest: 'docs/_sandbox/' + brand.ID + '/assets/js/gui.js',
			};
		});

		//FONTS
		SETTINGS( grunt ).brands.forEach(function iterateBrands( brand ) {
			copy[ 'fontsCore-' + brand.ID ] = {
				files: [{
					cwd: 'docs/_sandbox/_assets/font/' + brand.ID + '/',
					src: [
						'*.ttf',
						'*.woff',
						'*.woff2',
						'*.eot',
						'*.svg',
					],
					dest: 'docs/_sandbox/' + brand.ID + '/assets/font/',
					filter: 'isFile',
					expand: true,
				}],
			};
		});

		//HTML
		SETTINGS( grunt ).brands.forEach(function iterateBrands( brand ) {
			replace[ 'html-' + brand.ID ] = {
				src: ['docs/_sandbox/_assets/html/index.html'],
				dest: 'docs/_sandbox/' + brand.ID + '/index.html',
				overwrite: false,
				replacements: [
					{
						from: '[Brand]',
						to: brand.ID.toUpperCase(),
					},
					{
						from: '[brand]',
						to: brand.ID.toLowerCase(),
					},
				],
			};
		});

		//running tasks
		grunt.config.set('copy', copy);
		grunt.task.run('copy');

		grunt.config.set('replace', replace);
		grunt.task.run('replace');

		grunt.config.set('less', less);
		grunt.task.run('less');

		grunt.config.set('concat', concat);
		grunt.task.run('concat');
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
				align: 'center',
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

			buildEverything: {
				options: {
					font: 'simple',
					maxLength: 30,
					colors: ['magenta'],
				},
				text: ' building all the things',
			},

			add: {
				options: {
					font: 'simple',
					maxLength: 30,
					colors: ['magenta'],
				},
				text: ' adding new module',
			},

			cleanDocs: {
				options: {
					font: 'simple',
					maxLength: 30,
					colors: ['magenta'],
				},
				text: ' cleaning docs',
			},

			copy: {
				options: {
					font: 'simple',
					maxLength: 30,
					colors: ['magenta'],
				},
				text: ' copying tests',
			},

			submoduleSync: {
				options: {
					font: 'simple',
					maxLength: 30,
					colors: ['magenta'],
				},
				text: ' syncing submodules',
			},

			finished: {
				text: 'finished',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Clean task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		clean: {
			sandboxBrands: [
				'docs/_sandbox/**/*', //all subdirs (incl brand folders)
				'!docs/_sandbox/_assets/**' //except /_assets
			],
			sandboxLess: [
				'docs/_sandbox/_assets/less/modules/',
			],
			sandboxJS: [
				'docs/_sandbox/_assets/js/modules/',
			],
			docs: [
				'docs/*',
				'!docs/_config.yml'
			]
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

		// 'font:submoduleSync',
		// 'submoduleSync',

		'font:cleanDocs',
		'clean:docs',

		'font:copy',
		'copyTests',

		'font:index',
		'buildIndex',

		'font:finished',
		'wakeup',
	]);

	grunt.registerTask('all', [ //build index, gui.json and _sandbox
		'font:title',

		'font:submoduleSync',
		'submoduleSync',

		'font:cleanDocs',
		'clean:docs',

		'font:copy',
		'copyTests',

		'font:index',
		'buildIndex',

		'font:buildEverything',
		'buildEverything',

		'font:finished',
		'wakeup',
	]);

};