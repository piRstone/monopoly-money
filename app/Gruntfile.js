module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	var date = new Date();
	grunt.initConfig({
		config: grunt.file.readJSON('config.json'),
		env: grunt.file.readJSON('env.json'),
		pkg: grunt.file.readJSON('package.json'),

		compass: {
			dist: {
				options: {
					sassDir: '<%= config.merge_dir %>/sass',
					cssDir: '<%= config.merge_dir %>/assets/css'
				}
			}
		},

		clean: {
			build: [
				'<%= config.build_dir %>'
			],
			compile: [
				'<%= config.compile_dir %>'
			],
			merge: [
				'<%= config.merge_dir %>'
			]
		},

		concat: {
			js: {
				src: [
					'<%= config.vendor_files.js %>',
					'module.prefix',
					'<%= config.build_dir %>/assets/js/*.js',
					'module.suffix'
				],
				dest: '<%= config.build_dir %>/assets/js/braineet.js'
			},
			css: {
				src: [
					'<%= config.build_dir %>/assets/css/reset.css',
					'<%= config.build_dir %>/assets/css/bootstrap-additions.min.css',
					'<%= config.build_dir %>/assets/css/angular-motion.css'
				],
				dest: '<%= config.build_dir %>/assets/css/braineet.css'
			}
		},

		copy: {
			merge: {
				src: '**',
				dest: '<%= config.merge_dir %>/',
				cwd: 'src',
				expand: true,
				dot: true
			},
			assets: {
				src: '**',
				dest: '<%= config.build_dir %>/assets/',
				cwd: '<%= config.merge_dir %>/assets',
				expand: true
			},
			js: {
				src: '**/*.js',
				dest: '<%= config.build_dir %>/assets/js',
				cwd: '<%= config.merge_dir %>',
				expand: true,
				flatten: true
			}
		},
		
		html2js: {
			options: {
				base: '<%= config.merge_dir %>/app',
				module: 'braineet.templates'
			},
			braineet: {
				src: ['<%= config.merge_dir %>/**/*.tpl.html'],
				dest: '<%= config.merge_dir %>/app/templates.js'
			},
		},

		template: {
			app: {
				options: {
					data: {
						appId: '<%= env.appId %>',
						host: '<%= env.host %>',
						hostUpload: '<%= env.hostUpload %>',
						baseUrl: '',
						baseUrlDev: 'http://developers.local.brainoot.com',
						apiUrl: '<%= config.apiBaseUrl %>',
						stripeToken: '<%= config.stripe_token %>',
						domainName: '<%= config.domainName %>'
					}
				},
				files: {
					'<%= config.build_dir %>/assets/js/app.js': ['<%= config.build_dir %>/assets/js/app.js'],
					/*'<%= config.build_dir %>/assets/js/user.js': ['<%= config.build_dir %>/assets/js/user.js'],
					'<%= config.build_dir %>/assets/js/templates.js': ['<%= config.build_dir %>/assets/js/templates.js'],
					'<%= config.build_dir %>/assets/js/accountServices.js': ['<%= config.build_dir %>/assets/js/accountServices.js'],*/
					'<%= config.build_dir %>/assets/js/directives.js': ['<%= config.build_dir %>/assets/js/directives.js'],
				}
			},
			index: {
				options: {
					data: {
						host: '<%= env.host %>',
						hostUpload: '<%= env.hostUpload %>',
						baseUrl: '',
						baseUrlDev: 'http://developers.local.brainoot.com',
						apiUrl: '<%= config.apiBaseUrl %>',
						domainName: '<%= config.domainName %>'
					}
				},
				files: {
					'<%= config.build_dir %>/index.php': ['<%= config.merge_dir %>/index.php'],
					/*<%= config.build_dir %>/.htaccess': ['<%= config.merge_dir %>/.htaccess']*/
				}
			}
		},

		uglify: {
			js: {
				options: {
					report: 'min',
					mangle: false
				},
				files: {
					'<%= config.build_dir %>/assets/js/monopoly.min.js': ['<%= config.build_dir %>/assets/js/monopoly.js']
				}
			}
		},

		cssmin: {
			css: {
				options: {
					report: 'min'
				},
				files: {
					'<%= config.build_dir %>/assets/css/monopoly.min.css': '<%= config.build_dir %>/assets/css/monopoly.css'
				}
			}
		},
		
		compress: {
			css: {
				options: {
					mode: 'gzip'
				},
				files: [
					{
						expand: true,
						src: ['<%= config.build_dir %>/assets/css/monopoly.min.css'],
						dest: '',
						ext: '.css.cgz'
					}
				]
			},
			js: {
				options: {
					mode: 'gzip'
				},
				files: [
					{
						expand: true,
						src: ['<%= config.build_dir %>/assets/js/monopoly.min.js'],
						dest: '',
						ext: '.js.jgz'
					}
				]
			}
		},

		watch: {
			web: {
				files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.json', 'src/sass/*.scss'],
				tasks: ['build-dev']
			}
		}
	});

	grunt.registerTask('build', ['clean:build', 'clean:compile', 'clean:merge', 'copy:merge', 'compass', 'html2js', 'copy:assets', 'copy:js', 'template:app', 'template:index', 'concat:js', 'concat:css', 'uglify', 'cssmin', 'compress', 's3:prod', 'clean:merge']);
	grunt.registerTask('build-dev', ['clean:build', 'clean:compile', 'clean:merge', 'copy:merge', 'compass', 'html2js', 'copy:assets', 'copy:js', 'template:app', 'template:index', 'concat:js', 'clean:merge']);
	grunt.registerTask('default', ['build-dev']);
};
