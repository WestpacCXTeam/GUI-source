'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//                               ██████╗  ██╗   ██╗ ██╗     ███╗   ███╗  ██████╗  ██████╗  ██╗   ██╗ ██╗      ███████╗ ███████╗
//                              ██╔════╝  ██║   ██║ ██║     ████╗ ████║ ██╔═══██╗ ██╔══██╗ ██║   ██║ ██║      ██╔════╝ ██╔════╝
//                              ██║  ███╗ ██║   ██║ ██║     ██╔████╔██║ ██║   ██║ ██║  ██║ ██║   ██║ ██║      █████╗   ███████╗
//                              ██║   ██║ ██║   ██║ ██║     ██║╚██╔╝██║ ██║   ██║ ██║  ██║ ██║   ██║ ██║      ██╔══╝   ╚════██║
//                              ╚██████╔╝ ╚██████╔╝ ██║     ██║ ╚═╝ ██║ ╚██████╔╝ ██████╔╝ ╚██████╔╝ ███████╗ ███████╗ ███████║
//                               ╚═════╝   ╚═════╝  ╚═╝     ╚═╝     ╚═╝  ╚═════╝  ╚═════╝   ╚═════╝  ╚══════╝ ╚══════╝ ╚══════╝
//                                                                       Created by Westpac Design Delivery Team
// @desc     GUI modules commiting base changes automatically
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


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Grunt module
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = function(grunt) {

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Dependencies
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.loadNpmTasks('grunt-wakeup');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-font');
	grunt.loadNpmTasks('grunt-hub');
	require('time-grunt')(grunt);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Globals
	//------------------------------------------------------------------------------------------------------------------------------------------------------------


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt task to commit all files
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('commitCoreLess', 'Commit and push all core less files.', function() {

		var input = this.async();

		Prompt.start();

		Prompt.get({
			properties: {
				answer: {
					description: '\n\n' + Chalk.bold.bgRed.white('\n  - Are you really sure you want this? - ') + '\n',
					required: true,
				},
			}
		}, function(err, result) {
			if( result.answer === 'YES' ) {
				input(true);

				var exec = {};

				//create tasks for each module
				grunt.file.expand({ filter: 'isDirectory' }, [
					'*',
					'!node_modules',
				]).forEach(function( folder ) {

					// if( folder.substring(0, 15) === 'GUI-icons-group' && folder !== 'GUI-icons-group01' ) {

						//////////////////////////////////////| DEV ROUND
						exec[ 'dev-checkout' + folder ] = { //CHECKOUT
							options: {
								stderr: false,
								cwd: folder,
								stdout: true,
							},
							command: 'git checkout dev',
						};

						exec[ 'dev-add' + folder ] = { //ADD
							options: {
								stderr: false,
								cwd: folder,
								stdout: true,
							},
							command: 'git add' +
								' Gruntfile.js' +
								' .editorconfig' +
								' _core/less/*.less' +
								' tests/BOM/assets/*' +
								' tests/BSA/assets/*' +
								' tests/STG/assets/*' +
								' tests/WBC/assets/*',
						};

						exec[ 'dev-commit' + folder ] = { //COMMIT
							options: {
								stderr: false,
								cwd: folder,
								stdout: true,
							},
							command: '_automated merging/commiting core/build"',
						};

						exec[ 'dev-push' + folder ] = { //PUSH
							options: {
								stderr: false,
								cwd: folder,
								stdout: true,
							},
							command: 'git push origin dev',
						};

						//////////////////////////////////////| GH-PAGES ROUND
						exec[ 'gh-checkout' + folder ] = { //CHECKOUT
							options: {
								stderr: false,
								cwd: folder,
								stdout: true,
							},
							command: 'git checkout gh-pages',
						};

						exec[ 'gh-merge' + folder ] = { //MERGE
							options: {
								stderr: false,
								cwd: folder,
								stdout: true,
							},
							command: 'git merge dev',
						};

						exec[ 'gh-push' + folder ] = { //PUSH
							options: {
								stderr: false,
								cwd: folder,
								stdout: true,
							},
							command: 'git push origin gh-pages',
						};

						//////////////////////////////////////| MASTER ROUND
						exec[ 'master-checkout' + folder ] = { //CHECKOUT
							options: {
								stderr: false,
								cwd: folder,
								stdout: true,
							},
							command: 'git checkout master',
						};

						exec[ 'master-merge' + folder ] = { //MERGE
							options: {
								stderr: false,
								cwd: folder,
								stdout: true,
							},
							command: 'git merge dev',
						};

						exec[ 'master-push' + folder ] = { //PUSH
							options: {
								stderr: false,
								cwd: folder,
								stdout: true,
							},
							command: 'git push origin master',
						};

						//////////////////////////////////////| DEFAULT ROUND
						exec[ 'default-checkout' + folder ] = { //CHECKOUT
							options: {
								stderr: false,
								cwd: folder,
								stdout: true,
							},
							command: 'git checkout dev',
						};


						grunt.config.set('exec', exec);

						//////////////////////////////////////| DEV ROUND
						grunt.task.run('exec:dev-checkout' + folder);
						grunt.task.run('exec:dev-add' + folder);
						grunt.task.run('exec:dev-commit' + folder);
						grunt.task.run('exec:dev-push' + folder);

						//////////////////////////////////////| GH-PAGES ROUND
						grunt.task.run('exec:gh-checkout' + folder);
						grunt.task.run('exec:gh-merge' + folder);
						grunt.task.run('exec:gh-push' + folder);

						//////////////////////////////////////| MASTER ROUND
						grunt.task.run('exec:master-checkout' + folder);
						grunt.task.run('exec:master-merge' + folder);
						grunt.task.run('exec:master-push' + folder);

						//////////////////////////////////////| DEFAULT ROUND
						grunt.task.run('exec:default-checkout' + folder);
					// }
				});

				grunt.task.run('font:finished');
			}
			else {
				console.log(' That\'s ok... :) ');
				input(true);
			}
		});
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Grunt tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.initConfig({


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// GLOBALS
		//----------------------------------------------------------------------------------------------------------------------------------------------------------


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// UBERGRUNT
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		hub: {
			all: {
				options: {
					concurrent: 1,
				},
				src: [
					'*/Gruntfile.js',
					'!node_modules',
					'!Gruntfile.js',
				],
				tasks: ['_ubergrunt'],
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

			finished: {
				text: 'finished',
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
	// Private tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Public tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('default', [
		'font',
	]);

	grunt.registerTask('ubergrunt', [
		'hub',
		'font',
		'wakeup',
	]);

	grunt.registerTask('core', [
		'commitCoreLess',
		'wakeup',
	]);

};