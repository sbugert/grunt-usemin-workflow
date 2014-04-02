'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      before: ['templates/prod', 'public/prod'],
      after: ['.tmp']
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd:'templates/dev',
          src: ['**'],
          dest: 'templates/prod',
          filter: 'isFile'
        }]
      }
    },
    useminPrepare: {
      html: 'templates/prod/**/*.{html,dust,jade}',
      options: {
        root: './',
        dest: 'public/prod/'
      }
    },
    usemin: {
      html: 'templates/prod/**/*.{html,dust,jade}',
      options: {
        assetsDirs: ['public/prod/']
      }
    },
    rev: {
      assets: {
        files: {
          source: ['public/prod/**/*.{js,css}']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-rev');

  grunt.registerTask('build', ['clean:before', 'copy', 'useminPrepare',
    'concat', 'uglify', 'cssmin', 'rev', 'usemin', 'clean:after']);
};
