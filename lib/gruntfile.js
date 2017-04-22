module.exports = function(grunt) {
 // The `matchdep` package configuration, short for `match dependencies`,
 // looks in your node_modules directory and finds any npm package that
 // begins with `grunt-`. It will then load those packages for execution.
 require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


 // The initConfig method is where you will configure a series
 // of tasks that you want Grunt to automatically run for you
 grunt.initConfig({
   jshint: {
         files: ['../javascripts/**/*.js']
  },
 });

  // Set up the default Grunt task. The default task is executed
 // when you type `grunt`, without any additional parameters in the
 // command line.
 grunt.registerTask('default', ['jshint']);
};
