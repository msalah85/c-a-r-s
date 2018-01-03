var IRAQCARS = window.IRAQCARS || {},
IRAQCARS = function () {
    /* ==================================================
        Contact Form Validations
    ================================================== */
    ContactForm = function () {
        $('.contact-form').each(function () {
            var formInstance = $(this);
            formInstance.submit(function () {
                var action = $(this).attr('action');
                $("#message").slideUp(750, function () {
                    $('#message').hide();
                    var dta = {
                        fname: $('#fname').val(),
                        email: $('#email').val(),
                        phone: $('#phone').val(),
                        comments: $('#comments').val()
                    };
                    // validate data
                    if (dta.fname != '' && dta.email != '' && dta.phone != '' && dta.comments != '') {
                        $('#submit').after('<img src="/content/images/assets/ajax-loader.gif" class="loader" />').attr('disabled', 'disabled');
                        $.ajax({ // start sending message
                            type: "POST",
                            url: action,
                            data: JSON.stringify(dta),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: function (result) {                                
                                $('#message').removeClass('alert-danger').addClass('alert alert-success').text(result.d.message).slideDown('slow');
                                $('.contact-form img.loader').fadeOut('slow', function () { $(this).remove() });
                                if (result.d.status) $('.contact-form').slideUp('slow');
                            }
                        });
                    }
                    else { // error message
                        $('#message').removeClass('alert-success').addClass('alert alert-danger').text('برجاء ادخال جميع البيانات المطلوبة * ثم ارسل الرسالة.');
                        $('#message').slideDown('slow');
                    }

                    // reset
                    $('#submit').removeAttr('disabled');
                    $('.loader').remove();
                });
                return false;
            });
        });
    },
    /* ==================================================
        Scroll to Top
    ================================================== */
    scrollToTop = function () {
        var windowWidth = $(window).width(),
			didScroll = false;
        var $arrow = $('#back-to-top');
        $arrow.on("click", function (e) {
            $('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo');
            e.preventDefault();
        });
        $(window).scroll(function () {
            didScroll = true;
        });
        setInterval(function () {
            if (didScroll) {
                didScroll = false;
                if ($(window).scrollTop() > 200) {
                    $arrow.fadeIn();
                } else {
                    $arrow.fadeOut();
                }
            }
        }, 250);
    },
    /* ==================================================
       Accordion
    ================================================== */
    accordion = function () {
        var accordion_trigger = $('.accordion-heading.accordionize');
        accordion_trigger.delegate('.accordion-toggle', 'click', function (event) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).addClass('inactive');
            }
            else {
                accordion_trigger.find('.active').addClass('inactive');
                accordion_trigger.find('.active').removeClass('active');
                $(this).removeClass('inactive');
                $(this).addClass('active');
            }
            event.preventDefault();
        });
    },
    /* ==================================================
       Toggle
    ================================================== */
    toggle = function () {
        var accordion_trigger_toggle = $('.accordion-heading.togglize');
        accordion_trigger_toggle.delegate('.accordion-toggle', 'click', function (event) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).addClass('inactive');
            }
            else {
                $(this).removeClass('inactive');
                $(this).addClass('active');
            }
            event.preventDefault();
        });
    },
    /* ==================================================
       Tooltip
    ================================================== */
    toolTip = function () {
        $('[data-toggle=tooltip]').tooltip();
        //$('a[data-toggle=tooltip]').tooltip();
        $('a[data-toggle=popover]').popover({ html: true }).on("click", function (e) {
            e.preventDefault();
            $(this).focus();
        });
    },
    /* ==================================================
       Twitter Widget
    ================================================== */
    TwitterWidget = function () {
        $('.twitter-widget').each(function () {
            var twitterInstance = $(this);
            var twitterTweets = twitterInstance.attr("data-tweets-count") ? twitterInstance.attr("data-tweets-count") : "1"
            twitterInstance.twittie({
                dateFormat: '%b. %d, %Y',
                template: '<li><i class="fa fa-twitter"></i> {{tweet}} <span class="date">{{date}}</span></li>',
                count: twitterTweets,
                hideReplies: true
            });
        });
    },
    /* ==================================================
       Hero Flex Slider
    ================================================== */
    heroflex = function () {
        $('.heroflex').each(function () {
            var carouselInstance = $(this);
            var carouselAutoplay = carouselInstance.attr("data-autoplay") == 'yes' ? true : false
            var carouselPagination = carouselInstance.attr("data-pagination") == 'yes' ? true : false
            var carouselArrows = carouselInstance.attr("data-arrows") == 'yes' ? true : false
            var carouselDirection = carouselInstance.attr("data-direction") ? carouselInstance.attr("data-direction") : "horizontal"
            var carouselStyle = carouselInstance.attr("data-style") ? carouselInstance.attr("data-style") : "fade"
            var carouselSpeed = carouselInstance.attr("data-speed") ? carouselInstance.attr("data-speed") : "5000"
            var carouselPause = carouselInstance.attr("data-pause") == 'yes' ? true : false

            carouselInstance.flexslider({
                animation: carouselStyle,
                easing: "swing",
                direction: carouselDirection,
                slideshow: carouselAutoplay,
                slideshowSpeed: carouselSpeed,
                animationSpeed: 600,
                initDelay: 0,
                randomize: false,
                pauseOnHover: carouselPause,
                controlNav: carouselPagination,
                directionNav: carouselArrows,
                prevText: "",
                nextText: "",
                rtl: true
            });
        });
    },
    /* ==================================================
       Flex Slider
    ================================================== */
    galleryflex = function () {
        $('.galleryflex').each(function () {
            var carouselInstance = $(this);
            var carouselAutoplay = carouselInstance.attr("data-autoplay") == 'yes' ? true : false
            var carouselPagination = carouselInstance.attr("data-pagination") == 'yes' ? true : false
            var carouselArrows = carouselInstance.attr("data-arrows") == 'yes' ? true : false
            var carouselDirection = carouselInstance.attr("data-direction") ? carouselInstance.attr("data-direction") : "horizontal"
            var carouselStyle = carouselInstance.attr("data-style") ? carouselInstance.attr("data-style") : "fade"
            var carouselSpeed = carouselInstance.attr("data-speed") ? carouselInstance.attr("data-speed") : "5000"
            var carouselPause = carouselInstance.attr("data-pause") == 'yes' ? true : false

            carouselInstance.flexslider({
                animation: carouselStyle,
                easing: "swing",
                direction: carouselDirection,
                slideshow: carouselAutoplay,
                slideshowSpeed: carouselSpeed,
                animationSpeed: 600,
                initDelay: 0,
                randomize: false,
                pauseOnHover: carouselPause,
                controlNav: carouselPagination,
                directionNav: carouselArrows,
                prevText: "",
                nextText: "", rtl: true
            });
        });
    },
    /* ==================================================
       Owl Carousel
    ================================================== */
    OwlCarousel = function () {
        $('.owl-carousel').each(function () {
            var carouselInstance = $(this);
            var carouselColumns = carouselInstance.attr("data-columns") ? carouselInstance.attr("data-columns") : "1"
            var carouselitemsDesktop = carouselInstance.attr("data-items-desktop") ? carouselInstance.attr("data-items-desktop") : "4"
            var carouselitemsDesktopSmall = carouselInstance.attr("data-items-desktop-small") ? carouselInstance.attr("data-items-desktop-small") : "3"
            var carouselitemsTablet = carouselInstance.attr("data-items-tablet") ? carouselInstance.attr("data-items-tablet") : "2"
            var carouselitemsMobile = carouselInstance.attr("data-items-mobile") ? carouselInstance.attr("data-items-mobile") : "1"
            var carouselAutoplay = carouselInstance.attr("data-autoplay") ? carouselInstance.attr("data-autoplay") : true
            var carouselPagination = carouselInstance.attr("data-pagination") == 'yes' ? true : false
            var carouselArrows = carouselInstance.attr("data-arrows") == 'yes' ? true : false
            var carouselSingle = carouselInstance.attr("data-single-item") == 'yes' ? true : false
            var carouselStyle = carouselInstance.attr("data-style") ? carouselInstance.attr("data-style") : "fade"

            carouselInstance.owlCarousel({
                rtl: true,
                direction: 'rtl',
                items: carouselColumns,
                autoPlay: carouselAutoplay,
                navigation: carouselArrows,
                pagination: carouselPagination,
                itemsDesktop: [1199, carouselitemsDesktop],
                itemsDesktopSmall: [979, carouselitemsDesktopSmall],
                itemsTablet: [768, carouselitemsTablet],
                itemsMobile: [479, carouselitemsMobile],
                singleItem: carouselSingle,
                navigationText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                stopOnHover: true,
                lazyLoad: false,
                responsiveRefreshRate: 200,
                responsiveBaseWidth: window,
                slideSpeed: 999,
                transitionStyle: 'carouselStyle'
            });
        });
    },
    /* ==================================================
       PrettyPhoto
    ================================================== */
    PrettyPhoto = function () {
        $("a[data-rel^='prettyPhoto']").prettyPhoto({
            opacity: 0.5,
            social_tools: '<div class="pp_social"><div class="facebook"><iframe src="https://www.facebook.com/plugins/like.php?locale=en_US&href=' + location.href + '&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div></div>',
            deeplinking: false
        });
    },
    /* ==================================================
       Animated Counters
    ================================================== */
    Counters = function () {
        $('.counters').each(function () {
            $(".timer .count").appear(function () {
                var counter = $(this).html();
                $(this).countTo({
                    from: 0,
                    to: counter,
                    speed: 2000,
                    refreshInterval: 60
                });
            });
        });
    },
    /* ==================================================
       SuperFish menu
    ================================================== */
    //SuperFish = function () {
    //    $('.sf-menu').superfish({
    //        delay: 200,
    //        animation: { opacity: 'show', height: 'show' },
    //        speed: 'fast',
    //        cssArrows: false,
    //        disableHI: true
    //    });
    //    $(".dd-menu > ul > li:has(ul)").find("a:first").append(" <i class='fa fa-angle-down'></i>");
    //    $(".dd-menu > ul > li > ul > li:has(ul)").find("a:first").append(" <i class='fa fa-angle-right'></i>");
    //    $(".dd-menu > ul > li > ul > li > ul > li:has(ul)").find("a:first").append(" <i class='fa fa-angle-right'></i>");
    //},
    /* ==================================================
       Header Functions
    ================================================== */
    StickyHeader = function () {
        //Updates scroll position
        var $header = $('.site-header');
        var $headerW = $('.site-header-wrapper');
        var $logo = $('.site-logo img');
        var $topnav = $('.top-navigation');
        var $tagline = $('.site-tagline');
        var $userbtn = $('.user-login-btn');
        var $navbar = $('.navbar');
        var $searchform = $('.navbar .search-form');
        //var $bselect = $('.bootstrap-select .dropdown-menu');
        function menuScroll() {
            var lastScroll = 0;
            $(window).scroll(function (event) {
                //Sets the current scroll position
                var st = $(this).scrollTop();
                //Determines up-or-down scrolling
                if (st > lastScroll && $(window).width() > 992) {
                    //Replace this with your function call for downward-scrolling
                    $searchform.slideUp();
                    //$bselect.css('visibility', 'hidden');
                }
                else {
                }

                //Updates scroll position
                lastScroll = st;
            });
        }
        if ($(window).width() > 992) {
            menuScroll();
        }
        setInterval(function () {
            if ($(window).scrollTop() > 30) {
                $header.addClass('sticky-header');
            } else {
                $header.removeClass('sticky-header');
            }
        }, 250);
    },
    /* ==================================================
        Responsive Nav Menu
    ================================================== */
    MobileMenu = function () {
        // Responsive Menu Events
        $('#menu-toggle').on("click", function () {
            $(this).toggleClass("opened");
            $(".toggle-menu").slideToggle();
            $(".site-header-wrapper").toggleClass("sticktr");
            $(".body").toggleClass("sticktr");
            var SHHH = $(".site-header").innerHeight();
            var NBHH = $(".navbar").innerHeight();
            var THHH = $(".top-header").innerHeight();
            $(".toggle-menu").css("top", NBHH);
            $(".header-v2 .toggle-menu").css("top", SHHH);
            $(".header-v3 .toggle-menu").css("top", SHHH + THHH);
            return false;
        });
        $(window).resize(function () {
            if ($("#menu-toggle").hasClass("opened")) {
                $(".toggle-menu").css("display", "block");
            } else {
                $("#menu-toggle").css("display", "none");
            }
        });
    },
    /* ==================================================
       IsoTope Portfolio
    ================================================== */
    IsoTope = function () {
        $("ul.sort-source").each(function () {
            var source = $(this);
            var destination = $("ul.sort-destination[data-sort-id=" + $(this).attr("data-sort-id") + "]");
            if (destination.get(0)) {
                $(window).load(function () {
                    destination.isotope({
                        itemSelector: ".grid-item",
                        layoutMode: 'sloppyMasonry'
                    });
                    source.find("a").on("click", function (e) {
                        e.preventDefault();
                        var $this = $(this),
                    		filter = $this.parent().attr("data-option-value");

                        source.find("li.active").removeClass("active");
                        $this.parent().addClass("active");

                        destination.isotope({
                            filter: filter
                        });

                        if (window.location.hash != "" || filter.replace(".", "") != "*") {
                            self.location = "#" + filter.replace(".", "");
                        }
                        return false;
                    });
                    // show all filter
                    //$(document).on("click", '.mt-label a', function (e) {
                    //    e.preventDefault();
                    //    var $this = $(this), filter = $this.parent().attr("data-option-value");
                    //    destination.isotope({
                    //        filter: filter
                    //    });
                    //    if (window.location.hash != "" || filter.replace(".", "") != "*") {
                    //        self.location = "#" + filter.replace(".", "");
                    //    }
                    //    return false;
                    //});
                    $(window).on("hashchange", function (e) {
                        var hashFilter = "." + location.hash.replace("#", ""),
                    		hash = (hashFilter == "." || hashFilter == ".*" ? "*" : hashFilter);
                        source.find("li.active").removeClass("active");
                        source.find("li[data-option-value='" + hash + "']").addClass("active");
                        destination.isotope({
                            filter: hash
                        });
                    });
                    var hashFilter = "." + (location.hash.replace("#", "") || "*");
                    var initFilterEl = source.find("li[data-option-value='" + hashFilter + "'] a");
                    //if (initFilterEl.get(0)) {
                    //    source.find("li[data-option-value='" + hashFilter + "'] a").click();
                    //} else {
                    //    source.find("li:first-child a").click();
                    //}
                });
            }
        });
        $(window).load(function () {
            var IsoTopeCont = $(".isotope-grid");
            IsoTopeCont.isotope({
                itemSelector: ".grid-item",
                layoutMode: 'sloppyMasonry'
            });
            if ($(".grid-holder").length > 0) {
                var $container_blog = $('.grid-holder');
                $container_blog.isotope({
                    itemSelector: '.grid-item'
                });

                $(window).resize(function () {
                    var $container_blog = $('.grid-holder');
                    $container_blog.isotope({
                        itemSelector: '.grid-item'
                    });
                });
            }
        });
    },
    /* ==================================================
       IsoTope Portfolio
    ================================================== */
    //Password = function () {
    //    var $input = $('.password-input');
    //    var $output = $('.password-output');

    //    $.passy.requirements.length.min = 4;

    //    var feedback = [
    //        { width: '20%', color: '#d9534f' },
    //        { width: '50%', color: '#f0ad4e' },
    //        { width: '80%', color: '#5bc0de' },
    //        { width: '100%', color: '#5cb85c' }
    //    ];

    //    $input.passy(function (strength, valid) {
    //        $output.css('background-color', feedback[strength].color);
    //        $output.css('width', feedback[strength].width);

    //    });

    //    $('.password-generate').on("click", function () {
    //        $input.passy('generate', 8);
    //    });
    //    $('.password-input').hidePassword(true);
    //},
    /* ==================================================
       Search Results Listing
    ================================================== */
    $tallestCol = 0,
    RESULTS = function () {
        //var $tallestCol;
        $('#results-holder').each(function () {
            $tallestCol = 0;
            $(this).find('.result-item').each(function () {
                ($(this).height() > $tallestCol) ? $tallestCol = $(this).height() : $tallestCol = $tallestCol;
            });
            if ($tallestCol == 0) $tallestCol = 'auto';
            $(".result-item").css('height', $tallestCol);
        });
    },
    /* ==================================================
       Pricing Tables
    ================================================== */
    pricingTable = function () {
        $('.pricing-table').each(function () {
            $tallestCol = 0;
            $(this).find('> div .features').each(function () {
                ($(this).height() > $tallestCol) ? $tallestCol = $(this).height() : $tallestCol = $tallestCol;
            });
            if ($tallestCol == 0) $tallestCol = 'auto';
            $(this).find('> div .features').css('height', $tallestCol);
        });
    },

    /* ==================================================
           BxSlider
    ================================================== */
    filpBox = function () {
        $(".flip").on({
            mouseenter: function () {
                if ($(this).css('border-top-color') != 'rgb(0, 255, 0)') {
                    $(this).find('.card').addClass('flipped');
                }
            },
            mouseleave: function () {
                if ($(this).css('border-top-color') != 'rgb(0, 255, 0)') {
                    $(this).find('.card').removeClass('flipped');
                }
            }
        });


        function flip_card_size() {
            $(".flip").each(function (index, element) {
                var frontHeight = $(this).find('.front img').outerHeight();
                var frontWidth = $(this).find('.front img').outerWidth();

                $(this).find('.flip, .back, .front, .card').height(frontHeight);
                $(this).height(frontHeight);

                $(this).find('.flip, .back, .front, .card').width(frontWidth);
                $(this).width(frontWidth);
            });
        }

        function flip_card_reset_size() {
            $(".flip").each(function (index, element) {
                $(this).find('.flip, .back, .front, .card').removeAttr("style").css("width", "auto");
                $(this).removeAttr("style").css("width", "auto");
            });
        }
    },
    wowAnim = function () {
        // if wow exists
        if (typeof WOW == 'function') {
            WOW = new WOW({
                boxClass: 'scroll_effect',
                offset: 15
            });

            WOW.init();
        }
    },
    modernTicker = function () {
        $(".ticker").modernTicker({ effect: "scroll", scrollType: "continuous", scrollStart: "inside", scrollInterval: 20, transitionTime: 500, autoplay: true });
    },
    /* ==================================================
       Init Functions
    ================================================== */
    Init = function () {
        $(document).ready(function () {
            ContactForm();
            scrollToTop();
            accordion();
            toggle();
            toolTip();
            TwitterWidget();
            galleryflex();
            PrettyPhoto();
            Counters();
            StickyHeader();
            heroflex();
            pricingTable();
            MobileMenu();
            modernTicker();
        });

        // Any Button Scroll to section
        $('.scrollto').on("click", function () {
            $.scrollTo(this.hash, 800, { easing: 'easeOutQuint' });
            return false;
        });

        $(document).ready(function () {
            // Sticky Blocks
            var toffset = $(".site-header-wrapper").height() - 39;
            var soffset = $(".site-header-wrapper").height() + 89;
            var goffset = $(".site-header-wrapper").height() + 19;
            var boffset = $(".site-footer").height() + 90;
            if ($(window).width() > 767) {
                $(".tsticky").sticky({ topSpacing: toffset });
                $(".tbsticky").sticky({ topSpacing: soffset, bottomSpacing: boffset });
                $(".tbssticky").sticky({ topSpacing: goffset, bottomSpacing: boffset });
            }
            //$('.dropdown-toggle.selectpicker').on("click", function (e) {
            //    $('.bootstrap-select .dropdown-menu').css("visibility", "visible");
            //    e.preventDefault;
            //});
            // Add Listing Form Page
            $(".listing-form-steps li").on("click", function () {
                $(this).removeClass("completed");
                $(".listing-form-steps li").removeClass("active");
                $(this).addClass("active");
                $(this).prevAll().addClass("completed");
            });
            $(".listing-form-steps li:nth-child(1)").on("click", function () {
                $(".listing-form-progress .progress-bar").attr("data-appear-progress-animation", "0%").width("0%");
            });
            $(".listing-form-steps li:nth-child(2)").on("click", function () {
                $(".listing-form-progress .progress-bar").attr("data-appear-progress-animation", "25%").width("25%");
            });
            $(".listing-form-steps li:nth-child(3)").on("click", function () {
                $(".listing-form-progress .progress-bar").attr("data-appear-progress-animation", "50%").width("50%");
            });
            $(".listing-form-steps li:nth-child(4)").on("click", function () {
                $(".listing-form-progress .progress-bar").attr("data-appear-progress-animation", "75%").width("75%");
            });
            $(".listing-form-steps li:nth-child(5)").on("click", function () {
                $(".listing-form-progress .progress-bar").attr("data-appear-progress-animation", "100%").width("100%");
            });
            $('.listing-add-form .registeredv').on("click", function () {
                $(".registration-details").slideDown();
            });
            $('.listing-add-form .noregisteredv').on("click", function () {
                $(".registration-details").slideUp();
            });

            // Listing Page
            $(".toggle-make a").on("click", function () {
                $(".by-type-options").slideToggle();
                return false;
            });
            $(".search-trigger").on("click", function () {
                $(".search-form").slideToggle();
                return false;
            });
            var GridView;
            function GridViewFunction() {
                var GridView = setTimeout(function () {
                    $("#results-holder").removeClass("results-list-view");
                    $("#results-holder").addClass("results-grid-view");
                    $("#results-list-view").removeClass("active");
                    $("#results-grid-view").addClass("active");
                    IRAQCARS.RESULTS();
                    $(".waiting").hide();
                    //$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo');
                }, 800);
            }
            function GridViewStopFunction() {
                clearTimeout(GridView);
            }
            var ListView;
            function ListViewFunction() {
                var ListView = setTimeout(function () {
                    $("#results-holder").removeClass("results-grid-view");
                    $("#results-holder").addClass("results-list-view");
                    $("#results-grid-view").removeClass("active");
                    $("#results-list-view").addClass("active");
                    $("#results-holder").find(".result-item").css("height", "auto");
                    $(".waiting").hide();
                    //$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo');
                }, 800);
            }
            function ListViewStopFunction() {
                clearTimeout(ListView);
            }
            $("#results-grid-view").on("click", function () {
                $(".waiting").fadeIn();
                GridViewFunction();
                GridViewStopFunction();
                return false;
            });

            $("#results-list-view").on("click", function () {
                $(".waiting").fadeIn();
                ListViewFunction();
                ListViewStopFunction();
                return false;
            });

            if ($("#results-holder").hasClass("results-grid-view")) {
                IRAQCARS.RESULTS();
            }
            //* Advanced Search Trigger
            $('.search-advanced-trigger').on("click", function () {
                if ($(this).hasClass('advanced')) {
                    $(this).removeClass('advanced');
                    $(".advanced-search-row").slideDown();
                    $(this).html('Basic Search <i class="fa fa-arrow-up"></i>');
                } else {

                    $(this).addClass('advanced');
                    $(".advanced-search-row").slideUp();
                    $(this).html('Advanced Search <i class="fa fa-arrow-down"></i>');
                }
                return false;
            });

            $("#Show-Filters").on("click", function () {
                $("#Search-Filters").slideToggle();
            });

            // Tabs deep linking
            $('a[data-toggle="tab"]').on("click", function (e) {
                e.preventDefault();
                $('a[href="' + $(this).attr('href') + '"]').tab('show');
            });

            // Vehicle Details Clone
            $(".badge-premium-listing").clone().appendTo(".single-listing-actions");
        });

        // FITVIDS
        $(".fw-video, .format-video .post-media").fitVids();


        $(window).load(function () {
            $(".flex-viewport").each(function () { //.format-image
                $(this).find(".media-box").append("<span class='zoom'><span class='icon'><i class='icon-expand'></i></span></span>");
            });
            $(".format-standard").each(function () {
                $(this).find(".media-box").append("<span class='zoom'><span class='icon'><i class='icon-plus'></i></span></span>");
            });
            $(".format-video").each(function () {
                $(this).find(".media-box").append("<span class='zoom'><span class='icon'><i class='icon-music-play'></i></span></span>");
            });
            $(".format-link").each(function () {
                $(this).find(".media-box").append("<span class='zoom'><span class='icon'><i class='fa fa-link'></i></span></span>");
            });
            $(".additional-images .owl-carousel .item-video").each(function () {
                $(this).append("<span class='icon'><i class='fa fa-play'></i></span>");
            });
            IRAQCARS.StickyHeader();
        });

        // Icon Append
        $('.basic-link').append(' <i class="fa fa-angle-left"></i>');
        $('.basic-link.backward').prepend(' <i class="fa fa-angle-left"></i> ');
        $('ul.checks li, .add-features-list li').prepend('<i class="fa fa-check"></i> ');
        $('ul.angles li, .widget_categories ul li a, .widget_archive ul li a, .widget_recent_entries ul li a, .widget_recent_comments ul li a, .widget_links ul li a, .widget_meta ul li a').prepend('<i class="fa fa-angle-left"></i> ');
        $('ul.chevrons li').prepend('<i class="fa fa-chevron-right"></i> ');
        $('ul.carets li, ul.inline li, .filter-options-list li').prepend('<i class="fa fa-caret-left"></i> ');
        $('a.external').prepend('<i class="fa fa-external-link"></i> ');

        // Animation Appear
        var AppDel;
        function AppDelFunction($appd) {
            $appd.addClass("appear-animation");
            if (!$("html").hasClass("no-csstransitions") && $(window).width() > 767) {
                $appd.appear(function () {
                    var delay = ($appd.attr("data-appear-animation-delay") ? $appd.attr("data-appear-animation-delay") : 1);
                    if (delay > 1) $appd.css("animation-delay", delay + "ms");
                    $appd.addClass($appd.attr("data-appear-animation"));
                    setTimeout(function () {
                        $appd.addClass("appear-animation-visible");
                    }, delay);
                    clearTimeout();
                }, { accX: 0, accY: -150 });
            } else {
                $appd.addClass("appear-animation-visible");
            }
        }
        function AppDelStopFunction() {
            clearTimeout(AppDel);
        }
        $("[data-appear-animation]").each(function () {
            var $this = $(this);
            AppDelFunction($this);
            AppDelStopFunction();
        });
        // Animation Progress Bars

        var AppAni;
        function AppAniFunction($anim) {
            $anim.appear(function () {
                var delay = ($anim.attr("data-appear-animation-delay") ? $anim.attr("data-appear-animation-delay") : 1);
                if (delay > 1) $anim.css("animation-delay", delay + "ms");
                $anim.addClass($anim.attr("data-appear-animation"));
                setTimeout(function () {
                    $anim.animate({
                        width: $anim.attr("data-appear-progress-animation")
                    }, 1500, "easeOutQuad", function () {
                        $anim.find(".progress-bar-tooltip").animate({
                            opacity: 1
                        }, 500, "easeOutQuad");
                    });
                }, delay);
                clearTimeout();
            }, { accX: 0, accY: -50 });
        }
        function AppAniStopFunction() {
            clearTimeout(AppAni);
        }
        $("[data-appear-progress-animation]").each(function () {
            var $this = $(this);
            AppAniFunction($this);
            AppAniStopFunction();
        });

        // Parallax Jquery Callings
        //if (!Modernizr.touch) {
        //    $(window).on('load', function () {
        //        parallaxInit();
        //    });
        //}
        //function parallaxInit() {
        //    $('.parallax1').parallax("50%", 0.1);
        //    $('.parallax2').parallax("50%", 0.1);
        //    $('.parallax3').parallax("50%", 0.1);
        //    $('.parallax4').parallax("50%", 0.1);
        //    $('.parallax5').parallax("50%", 0.1);
        //    $('.parallax6').parallax("50%", 0.1);
        //    $('.parallax7').parallax("50%", 0.1);
        //    $('.parallax8').parallax("50%", 0.1);
        //    /*add as necessary*/
        //}

        // Window height/Width Getter Classes
        var wheighter = $(window).height();
        var wwidth = $(window).width();
        $(".wheighter").css("height", wheighter);
        $(".wwidth").css("width", wwidth);
        $(window).resize(function () {
            var wheighter = $(window).height();
            var wwidth = $(window).width();
            $(".wheighter").css("height", wheighter);
            $(".wwidth").css("width", wwidth);
        });
    };

    return {
        Init: Init,
        OwlCarousel: OwlCarousel,
        IsoTope: IsoTope,
        ContactForm: ContactForm,
        StickyHeader: StickyHeader,
        scrollToTop: scrollToTop,
        galleryflex: galleryflex,
        PrettyPhoto: PrettyPhoto,
        RESULTS: RESULTS,
        toolTip: toolTip,
        modernTicker: modernTicker
    };
}();

IRAQCARS.Init();