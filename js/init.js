/**
 * Ann Chota Legal Practitioners
 * Main JavaScript Initialization
 */
(function ($) {
    'use strict';

    // ========================================
    // Helper: Close Mobile Menu
    // ========================================
    function closeMobileMenu() {
        $('.mobile-menu-holder').removeClass('is-active');
        $('.menu-mask').removeClass('is-active');
        $('body').removeClass('has-active-menu');
        $('.nav-button').attr('aria-expanded', 'false');
    }

    // ========================================
    // Helper: Open Mobile Menu
    // ========================================
    function openMobileMenu() {
        $('.mobile-menu-holder').addClass('is-active');
        $('.menu-mask').addClass('is-active');
        $('body').addClass('has-active-menu');
        $('.nav-button').attr('aria-expanded', 'true');
    }

    // Document Ready
    $(document).ready(function () {

        // ========================================
        // Mobile Menu Toggle
        // ========================================
        $('.nav-button').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var isOpen = $('.mobile-menu-holder').hasClass('is-active');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close on X button or mask click
        $('.exit-mobile').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });

        $('.menu-mask').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });

        // Close menu when clicking a normal menu link (non-dropdown)
        $('.menu-mobile > li:not(.menu-item-has-children) > a').on('click', function () {
            closeMobileMenu();
        });

        // Handle dropdown toggle in mobile menu
        $('.menu-mobile > li.menu-item-has-children > a').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).parent().toggleClass('menu-open');
        });

        // Close menu on ESC key
        $(document).on('keydown', function (e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                if ($('.mobile-menu-holder').hasClass('is-active')) {
                    closeMobileMenu();
                }
            }
        });

        // ========================================
        // Smooth Scrolling for Anchor Links
        // ========================================
        $('a[href^="#"]').on('click', function (e) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                var headerHeight = $('#header-bar').outerHeight() || 110;
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - headerHeight + 10
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
        // Header Sticky/Fixed on Scroll
        // ========================================
        var header = $('#header-bar');
        var headerOffset = header.length ? header.offset().top : 0;

        $(window).scroll(function () {
            if ($(window).scrollTop() > headerOffset + 50) {
                header.addClass('header-sticky nav-fixed-top');
            } else {
                header.removeClass('header-sticky nav-fixed-top');
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

        // ========================================
        // Theme Toggle (Light/Dark)
        // ========================================
        var savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            $('body').addClass('light-theme');
        }

        $('#theme-toggle').on('click', function () {
            $('body').toggleClass('light-theme');
            if ($('body').hasClass('light-theme')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });

        // ========================================
        // Scroll Animations (Intersection Observer)
        // ========================================
        function animateOnScroll() {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('animated');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe elements with animation class
            $('.animate-on-scroll, .core-value-card, .practice-item.card-minimal, .vm-card').each(function () {
                observer.observe(this);
            });
        }

        // Initialize animations
        animateOnScroll();

    });

    // Window Load
    $(window).on('load', function () {
        // Trigger animations for elements already in view
        setTimeout(function () {
            $('.animate-on-scroll, .core-value-card, .practice-item.card-minimal, .vm-card').each(function () {
                var rect = this.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    $(this).addClass('animated');
                }
            });
        }, 100);
    });

})(jQuery);
