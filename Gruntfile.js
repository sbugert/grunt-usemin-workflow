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
        },
        {
          expand: true,
          cwd:'public/dev',
          src: ['**', '!**/*.js', '!**/*.css'],
          dest: 'public/prod',
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
      main: {
        files: {
          source: ['public/prod/**/*.{js,css}']
        }
      }
    },
    htmlmin: {
      main: {
        files: [{
          expand: true,
          cwd: 'templates/prod',
          src: '{,*/}*.html',
          dest: 'templates/prod'
        }],
        options: {
          removeComments: true,
          collapseWhitespace: true
        }
      }
    },
    imagemin: {
      main: {
        files: [{
          expand: true,
          cwd: 'public/prod',
          src: ['**/*.{.png,jpg,jpeg,gif}'],
          dest: 'public/prod'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-rev');

  grunt.registerTask('build', ['clean:before', 'copy', 'useminPrepare',
    'concat', 'uglify', 'cssmin', 'rev', 'usemin', 'htmlmin', 'clean:after']);
};
