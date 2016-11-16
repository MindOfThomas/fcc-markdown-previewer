'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
           transform: [['babelify', {presets: ['es2015', 'react']}]],
           watch: true
        },
        src: 'app/jsx/App.jsx',
        dest: 'build/js/min.js'
      }
    },
    copy: {
      css: {
        src: 'app/css/style.css',
        dest: 'build/css/style.css'
      },
      html: {
        src: 'app/index.html',
        dest: 'build/index.html'
      }
    },
    connect: {
      server: {
        options: {
          port: 80,
          base: 'build'
        }
      }
    },
    watch: {
      html: {
        files: ['app/**/*.html'],
        tasks: ['copy:html']
      },
      css: {
        files: ['app/**/*.css'],
        tasks: ['copy:css'],
      },
      options: {
        spawn: false
      }
    }
  });
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['browserify', 'copy']);
  grunt.registerTask('dev', ['connect:server', 'browserify', 'watch']);
};
