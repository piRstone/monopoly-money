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

		watch: {
			web: {
				files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.json', 'src/sass/*.scss'],
				tasks: ['build-dev']
			}
		}
	});

	grunt.registerTask('build-dev', ['compass']);
	grunt.registerTask('default', ['build-dev']);
};
