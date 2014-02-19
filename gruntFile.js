module.exports = function(grunt) {
  var style = require("grunt-cmd-transport").style.init(grunt);
	var css2jsParser = style.css2jsParser;
  
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    transport:{
	     options :{
		   idleading:'<%= pkg.name %>/<%= pkg.version %>/',
		   debug:false
	    },
	   chain :{
	    files: [{
                cwd: 'src',
                src: '*.js',
                dest: 'temp'
            }]
	   }
	},
	uglify: {
		options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		},
		build: {
			files:{
				"dist/<%= pkg.name %>.js":["temp/*.js"]
			}
      }
    }
	
  });


  
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Default task(s).
  grunt.registerTask('default', ['transport', "uglify"]);

};