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
					'module.suffix'
				],
				dest: '<%= config.proj_dir %>/assets/js/monopoly.js'
			}
		},

		watch: {
			web: {
				files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.json', 'src/sass/*.scss'],
				tasks: ['build-dev']
			}
		}
	});

	grunt.registerTask('build-dev', ['compass', 'concat:js']);
	grunt.registerTask('default', ['build-dev']);
};
