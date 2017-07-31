'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [['babelify', {presets: ['babel-preset-es2015', 'babel-preset-react']}]],
          watch: process.env.NODE_ENV !== 'production',
          keepAlive: process.env.NODE_ENV !== 'production',
          browserifyOptions: {
            debug: process.env.NODE_ENV !== 'production',
            extensions: ['.jsx']
          },
        },
        src: './src/App.jsx',
        dest: './dist/bundle.js',
      },
    },
    uglify: {
      options: {
        mangle: true,
        compress: true,
      },
      target: {
        src: './dist/bundle.js',
        dest: './dist/bundle.js',
      },
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: './',
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['browserify', 'uglify']);
  grunt.registerTask('dev', ['connect:server', 'browserify']);
};
