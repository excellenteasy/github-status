###global module:false###
module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig
    coffee:
      compile:
        files:
          'extension/script.js': 'src/*.coffee'
    watch:
      files: 'src/*.coffee'
      tasks: ['default']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.registerTask 'default', ['coffee']

