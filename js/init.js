/**
 * Ann Chota Legal Practitioners
 * Main JavaScript Initialization
 */
(function ($) {
    'use strict';

    // Document Ready
    $(document).ready(function () {

        // ========================================
        // Mobile Menu Toggle
        // ========================================
        $('.nav-button').on('click', function (e) {
            e.preventDefault();
            $('.mobile-menu-holder').addClass('active');
            $('.menu-mask').addClass('active');
            $('body').addClass('menu-open');
        });

        $('.exit-mobile, .menu-mask').on('click', function (e) {
            e.preventDefault();
            $('.mobile-menu-holder').removeClass('active');
            $('.menu-mask').removeClass('active');
            $('body').removeClass('menu-open');
        });

        // Close mobile menu when clicking a link
        $('.menu-mobile a').on('click', function () {
            $('.mobile-menu-holder').removeClass('active');
            $('.menu-mask').removeClass('active');
            $('body').removeClass('menu-open');
        });

        // ========================================
        // Smooth Scrolling for Anchor Links
        // ========================================
        $('a[href^="#"]').on('click', function (e) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                var headerHeight = $('#header-bar').outerHeight() || 100;
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - headerHeight
                }, 800, 'easeInOutQuad');
            }
        });

        // ========================================
        // Scroll to Top Button
        // ========================================
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                $('.scrolltop').fadeIn();
            } else {
                $('.scrolltop').fadeOut();
            }
        });

        $('.scrolltop').on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800, 'easeInOutQuad');
        });

        // ========================================
        // Header Sticky/Fixed on Scroll (Optional)
        // ========================================
        var header = $('#header-bar');
        var headerOffset = header.offset().top;

        $(window).scroll(function () {
            if ($(window).scrollTop() > headerOffset + 50) {
                header.addClass('header-sticky');
            } else {
                header.removeClass('header-sticky');
            }
        });

        // ========================================
        // Active Menu Item Highlight on Scroll
        // ========================================
        var sections = $('section[id]');

        $(window).on('scroll', function () {
            var scrollPos = $(window).scrollTop() + 150;

            sections.each(function () {
                var section = $(this);
                var sectionTop = section.offset().top;
                var sectionBottom = sectionTop + section.outerHeight();
                var sectionId = section.attr('id');

                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    $('.menu-nav a, .menu-mobile a').removeClass('active');
                    $('.menu-nav a[href="#' + sectionId + '"], .menu-mobile a[href="#' + sectionId + '"]').addClass('active');
                }
            });
        });

        // ========================================
        // Form Input Focus Effects
        // ========================================
        $('.comm-field, #contact-form textarea').on('focus', function () {
            $(this).parent().addClass('input-focused');
        }).on('blur', function () {
            $(this).parent().removeClass('input-focused');
        });

    });

    // Window Load
    $(window).on('load', function () {
        // Page fully loaded - can add preloader hide here if needed
    });

})(jQuery);
