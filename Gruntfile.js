

module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {},
		uglify: {},
		replace: {},
		//clean: ["mobile"],
		// Deletes all .js files, but skips min.js files : "!path/to/dir/*.min.js"
		clean: {
			options:{force:true},
			main: ["app/resources"]
		},
		remove: {
			options: {
				trace: true
			},
			resources: {
				src : ["app/resources"]
			},
			resources_unused:{
				src:["app/resources/splashs/platforms/android/res/*-mdpi",
							"app/resources/splashs/platforms/ios/Test/Resources/splash/*h.png"]
			}
		},
		copy: {
		  resources: {
				expand: true,
				flatten: true,
				filter: 'isFile',
				src: 'resources/app-*',
				dest: 'app/resources/'
		  }
		},
		rename: {},
		ngtemplates:{
			ptvTemplates: {
				cwd: '',
				src: [
					'views/*.html',
					'views/dashboard/*.html',
					'views/login/*.html',
					'views/chore/*.html',
					'views/user/*.html'
				],
				dest: 'javascripts/templates/_templates.js',
				options: {
					standalone : true,
					htmlmin:  {
						collapseWhitespace: true,
						collapseBooleanAttributes: true,
						removeComments: true // Only if you don't use comment directives!
					}
				}
			}
		},
		nggettext_extract: {
			pot: {
				files: {
					'po/template.pot': ['app/views/**/*.html']
				}
			},
		},
		nggettext_compile: {
			all: {
				files: {
					'app/javascripts/languages/translation.js': ['po/*.po']
				}
			},
		},
		version: {
			project: {
				src: ['package.json', 'bower.json']
			},
			appconfig: {
				options: {
					prefix: 'appVersion","'
				},
				src: ['app/javascripts/config/config.js']
			},
			appxml: {
				options: {
					prefix: 'version\\s+=\\s+[\'"]'
				},
				src: ['app/config.xml']
			}
		},
		favicons: {
			options: {
				trueColor: true,
				precomposed: true,
				appleTouchBackgroundColor: "none",
				coast: true,
				windowsTile: false,
				tileBlackWhite: false,
				tileColor: "auto",
				androidHomescreen: false,
				apple: true,
				firefox: true
			},
			icons: {
				src: 'resources/icon.png',
				dest: 'app/resources/icons'
			}
		},
		phonegapsplash: {
			all_phones: {
				// Source file: the PNG.
				src: 'resources/splash.png',
				// Destination directory where are stored all splashscreens
				dest: 'app/resources/splashs',
				// Optionnal, it produces splashscreen and layout for all phonegap targets if not specified
				options: {
					// A list of layouts, it produces landscape and portrait if not specified
					layouts: ['landscape','portrait'],
					// A  list of phone targets, it produces android, bada, blackberry, ios, webos, windows-phone if not specified
					profiles: ['ios','android']
				}
			},
		},
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-version');

	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-rename');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-remove');

	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-angular-gettext');
	grunt.loadNpmTasks('grunt-favicons');
	grunt.loadNpmTasks('grunt-phonegapsplash');


	// grunt.registerTask('default', ['ngtemplates:ptvTemplates']);
	// grunt.registerTask('mobile', ['ngtemplates:ptvTemplates','concat:js']);
	// grunt.registerTask('mobile', ['ngtemplates:ptvTemplates']);

	grunt.registerTask('translate:in',['nggettext_extract']);
	grunt.registerTask('translate:out',['nggettext_compile']);
	grunt.registerTask('version:all',['version:project:patch','version:appconfig','version:appxml']);

//'clean',,'clean:resources_unused'
	grunt.registerTask('media:all',['phonegapsplash:all_phones','favicons:icons','copy:resources']);

};
