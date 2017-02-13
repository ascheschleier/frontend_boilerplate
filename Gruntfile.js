module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                files: ['<%= pkg.src %>/scss/**/*.{scss,sass}'],
                tasks: ['buildCSS']
            },
            images: {
                files: ['<%= pkg.src %>/{img,rimg}/**/*.{png,jpg,jpeg,gif}'],
                tasks: ['buildImages']
            },
            icons: {
                files: ['<%= pkg.src %>/icons/*.svg'],
                tasks: ['buildIcons']
            },
            js : {
                files: ['<%= pkg.src %>/js/**/*.js'],
                tasks: ['buildJs']
            },
            html: {
                files: ['<%= pkg.src %>/templates/**/*.mustache' , '<%= pkg.src %>/data/*.json'],
                tasks: ['buildHtml']
            }
        },
        requirejs: {
            compile: {
                options: {
                    appDir: "<%= pkg.src %>/js",
                    baseUrl: './',
                    paths: {
                        requireLib: 'vendors/requirejs/require',
                        jquery: 'vendors/jquery/dist/jquery',
                        //modernizr: 'vendors/modernizr/bin/modernizr',
                        tweenmax:  'vendors/gsap/src/uncompressed/TweenMax',
                        tweenlite:  'vendors/gsap/src/uncompressed/TweenLite',
                        timelinelite:  'vendors/gsap/src/uncompressed/TimelineLite',
                        timelinemax:  'vendors/gsap/src/uncompressed/TimelineMax',
                        whitestorm:  'vendors/whitestorm/whitestorm',
                    },
                    name: "app",
                    dir: "<%= pkg.dist %>/js/",
                    include: 'requireLib',
                    findNestedDependencies: false, // includes all required files
                    //optimize: 'uglify2',
                    optimize: 'none',
                    useStrict: true,
                    normalizeDirDefines: 'all' // required for later external minification
                }
            }
        },
        sass: {
            style: {
                options: {                       // Target options
                    style: 'expanded',
                    sourceMap: true,
                    cacheLocation: '<%= pkg.source %>/scss/cache'
                },
                files: {
                    '<%= pkg.dist %>/css/style.css': '<%= pkg.src %>/scss/style.scss'
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: '<%= pkg.dist %>/css/',
                src: ['*.css', '!*.min.css', '!*-unprefixed.css'],
                dest: '<%= pkg.dist %>/css/',
                ext: '.min.css'
            },
            options: {
                report: 'min'
            }
        },
        clean: {
            css: ['<%= pkg.dist %>/css'],
            img: ['<%= pkg.dist %>/img'],
            options: {
                force: true
            }
        },
        copy: {
            img: {
                expand: true,
                cwd: '<%= pkg.src %>/img/',
                src: '**',
                dest: '<%= pkg.dist %>/img/'
            },
            js: {
                expand: true,
                cwd: '<%= pkg.src %>/js/',
                src: '**',
                dest: '<%= pkg.dist %>/js/'
            }
        },
        responsive_images: {
            build: {
                options: {
                    engine: 'im',
                    sizes: [{
                        name: 'small',
                        width: '50%',
                        height: '50%',
                        rename: false,
                    }, {
                        name: 'large',
                        width: '100%',
                        height: '100%',
                        rename: false,
                        suffix: '@2x'
                    }]
                },
                files: [{
                    expand: true,
                    src: ['rimg/**/*.{jpg,jpeg,gif,png}'],
                    cwd: '<%= pkg.src %>/',
                    dest: '<%= pkg.dist %>/'
                }]
            }
        },
        imagemin: {
            images: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.dist %>',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: '<%= pkg.dist %>'
                }],
                options: {
                    pngquant: true,
                    progressive: true,
                    interlaced: true
                }
            }
        },
        webfont: {
            icons: {
                src: '<%= pkg.src %>/icons/*.svg',
                dest: '<%= pkg.dist %>/fonts',
                destCss: '<%= pkg.src %>/scss',
                options: {
                    stylesheet: 'scss',
                    normalize: true,
                    codepoints: {
                        'download': 0xE001,
                        'angle-small-right': 0xE002,
                        'angle-small-up': 0xE003,
                        'angle-small-down': 0xE004,
                        'quote': 0xE005
                    },
                    templateOptions: {
                        classPrefix: 'icon-',
                        htmlDemo: false
                    }
                }
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {
                        convertStyleToAttrs: false
                    },
                    {
                        removeViewBox: false
                    }, {
                        removeUselessStrokeAndFill: false
                    }, {
                        removeAttrs: {
                            attrs: ['width' , 'height' , 'style']
                        }
                    }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.src %>/icons/src',
                    src: '**/*.svg',
                    dest: '<%= pkg.src %>/icons/min'
                }],
            }
        },
        grunticon: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.src %>/icons/min',
                    src: ['*.svg', '*.png'],
                    dest: '<%= pkg.dist %>/icons/'
                }],
                options: {
                    //datasvgcss: '_icons.data.svg.css',
                    //datapngcss: '_icons.data.png.css',
                    //urlpngcss: '_icons.fallback.css',
                    //loadersnippet: 'grunticon.loader.js'
                    cssprefix: ".icon-",
                    defaultWidth: '40px',
                    defaultHeight: '40px',
                    enhanceSVG: true,
                    previewTemplate: '<%= pkg.src %>/icons/preview_template.hbs'
                }
            },
        },
        autoprefixer: {
            options: {
                browsers: ['> 5%', 'last 2 versions', 'ie 9']
            },
            dist: {
                files: {
                    '<%= pkg.dist %>/css/style.css': '<%= pkg.dist %>/css/style.css'
                }
            }
        },
        mustache_render: {
            options: {
                // Task global options go here
                prefix_file: '_',
                prefix_dir: '',
                directory: '<%= pkg.src %>/templates/',
                escape: false

            },
            basic: {
                files : [
                    {
                        expand: true,
                        data: '<%= pkg.src %>/data/data.json',
                        cwd: '<%= pkg.src %>/templates/',
                        src: '*.mustache',
                        dest: '<%= pkg.dist %>/',
                        ext: '.html'
                    }
                ]
            },
        }
    });


    grunt.registerTask('default', 'watching for changes on configured files', function() {
        grunt.loadNpmTasks('grunt-contrib-watch');

        grunt.task.run('watch');
    });

    grunt.registerTask('buildCSS', 'processes scss-Files to CSS', function() {
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-sass');
        grunt.loadNpmTasks('grunt-autoprefixer');
        grunt.loadNpmTasks('grunt-contrib-cssmin');

        grunt.task.run(
            'clean:css',
            'sass:style',
            'autoprefixer',
            'cssmin:minify'
        );
    });

    grunt.registerTask('buildImages', 'compresses images', function() {
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-responsive-images');
        grunt.loadNpmTasks('grunt-contrib-imagemin');

        grunt.task.run(
            'clean:img',
            'copy:img',
            'responsive_images:build',
            'imagemin:images'
        );
    });

    grunt.registerTask('buildHtml', 'generate html from mustache templates', function() {
        grunt.loadNpmTasks('grunt-mustache-render');

        grunt.task.run(
            'mustache_render:basic'
        );
    });

    grunt.registerTask('buildIcons', 'build icons from svg files', function() {
        grunt.loadNpmTasks('grunt-svgmin');
        grunt.loadNpmTasks('grunt-grunticon');

        grunt.task.run(
            'svgmin',
            'grunticon:build'
        );
    });

    grunt.registerTask('buildJs', 'build js files, run require task ', function() {
        //grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-requirejs');

        grunt.task.run(
            'requirejs:compile'
        );
    });


    grunt.registerTask('build', ['buildJs', 'buildCSS', 'buildImages', 'buildIcons', 'buildHtml']);

};
