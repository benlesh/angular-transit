module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            all: ['angular-transit.js']
        },
        uglify: {
            options: {
                banner: '/**\n' +
                    ' * angular-transit.js\n' +
                    ' * (c) 2013 Ben Lesh http://www.benlesh.com\n' +
                    ' * MIT Licensed\n' +
                    ' */\n\n'
            },
            all: {
                files: {
                    'angular-transit.min.js': ['angular-transit.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['angular-transit.js'],
                tasks: ['default']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'uglify']);
};