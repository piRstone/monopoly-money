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
					sassDir: '<%= config.proj_dir %>/sass',
					cssDir: '<%= config.proj_dir %>/assets/css'
				}
			}
		},

		concat: {
			js: {
				src: [
					'<%= config.vendor_files.js %>',
					'module.prefix',
					'<%= config.proj_dir %>/app/*.js',
					'<%= config.proj_dir %>/app/*/*.js',
					'<%= config.proj_dir %>/common/*.js',
					'<%= config.proj_dir %>/common/*/*.js',
					'module.suffix'
				],
				dest: '<%= config.build_dir %>/monopoly.js'
			}
		},

		clean: {
			build: [
				'<%= config.build_dir %>'
			]
		},

		copy: {
			templates: {
				src: '**',
				dest: '<%= config.build_dir %>',
				cwd: 'src/app',
				expand: true,
				dot: true
			},
			assets: {
				src: '**',
				dest: '<%= config.build_dir %>/assets/',
				cwd: '<%= config.proj_dir %>/assets',
				expand: true
			},
			index:{
				src: 'index.php',
				dest: '<%= config.build_dir %>',
				cwd: 'src/',
				expand: true,
				dot: true
			}
		},

		watch: {
			web: {
				files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.json', 'src/sass/*.scss'],
				tasks: ['build-dev']
			}
		}
	});

	grunt.registerTask('build-dev', ['clean:build', 'compass', 'concat:js', 'copy']);
	grunt.registerTask('default', ['build-dev']);
};
