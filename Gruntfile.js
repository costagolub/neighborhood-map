module.exports = function(grunt) {
	// set up grunt modules
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

	  connect: {
	    server: {
	      options: {
	        port: 8289,
	        hostname: 'localhost'
	      }
	    }
	  },
	  clean: ["dest"],
    requirejs: {
	    compile: {
	      options: {
	        baseUrl: "app/js",
	        mainConfigFile: "app/js/config.js",
	        findNestedDependencies: true,
	        fileExclusionRegExp: /^\./,
          inlineText: true,
	        name: 'main',
	        include: ['config'],
	        out: "dest/js/main.js"
	      }
	    }
	  },
	  jade: {
      compile: {
        options: {
          pretty: true,
        },
        files: {
          'index.html': 'app/*.jade'
        }
      }
    },
    sass: {
	    dist: {
	      options: {
	        style: 'expanded'
	      },
	      files: {
	        'dest/css/main.css':'app/sass/main.scss'
	      }
	    }
	  },
	  copy: {
	  	main: {
	  		files: [
	  			{
	  				expand: true,
	  				flatten: true,
	  				src: ['bower_components/bootstrap/dist/css/bootstrap.min.css', 'bower_components/jasny-bootstrap/dist/css/jasny-bootstrap.min.css'],
	  				dest: 'dest/css'
	  			}, {
	  				expand: true,
	  				flatten: true,
	  				src: ['bower_components/requirejs/require.js'],
	  				dest: 'dest/js'
	  			}]
	  	}
	  },
	  env: {
      src: {
          NODE_ENV : 'PRODUCTION'
      },
      dev : {
          NODE_ENV : 'DEVELOPMENT'
      }
    },
    preprocess : {
      src : {
        src : 'index.html',
        dest : 'index.html'
      }
    },
    watch: {
    	options: {
    		livereload: true
    	},
		  jade: {
		    files: 'app/*.jade',
		    tasks: ['jade']
		  },
		  requirejs: {
		  	files: ['app/js/{,*}**.js'],
		  	tasks: []
		  },
		  sass: {
		  	files: ['app/sass/{,*}**.scss'],
		  	tasks: ['sass']
		  }
		}
	});

	// load all required modules here 
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-env');

	// register tasks
	grunt.registerTask('default', ['env:dev', 'connect', 'jade', 'preprocess:src', 'watch']);
	grunt.registerTask('build', ['env:src', 'clean', 'sass', 'jade', 'preprocess:src', 'copy', 'requirejs']);
};