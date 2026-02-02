/**
 * Ann Chota Legal Practitioners
 * Contact Form Handler
 */
(function ($) {
    'use strict';

    $(document).ready(function () {

        var $form = $('#contact-form');
        var $output = $('#output-contact');

        $form.on('submit', function (e) {
            e.preventDefault();

            // Basic client-side validation
            var name = $form.find('input[name="name"]').val().trim();
            var email = $form.find('input[name="email"]').val().trim();
            var subject = $form.find('input[name="subject"]').val().trim();
            var message = $form.find('textarea[name="message"]').val().trim();
            var honeypot = $form.find('input[name="url"]').val();

            // Honeypot check (spam prevention)
            if (honeypot !== '') {
                return false;
            }

            // Validation
            if (name === '') {
                showMessage('Please enter your name.', 'error');
                return false;
            }

            if (email === '' || !isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return false;
            }

            if (subject === '') {
                showMessage('Please enter a subject.', 'error');
                return false;
            }

            if (message === '') {
                showMessage('Please enter your message.', 'error');
                return false;
            }

            // Show loading state
            var $submitBtn = $form.find('#submit');
            var originalText = $submitBtn.val();
            $submitBtn.val('Sending...').prop('disabled', true);

            // Submit form via AJAX
            $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
                success: function (response) {
                    if (response.indexOf('success') !== -1 || response.indexOf('Success') !== -1) {
                        showMessage('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
                        $form[0].reset();
                    } else {
                        showMessage('Your message has been received. We will contact you shortly.', 'success');
                        $form[0].reset();
                    }
                },
                error: function () {
                    showMessage('There was an error sending your message. Please try again or contact us directly via phone or email.', 'error');
                },
                complete: function () {
                    $submitBtn.val(originalText).prop('disabled', false);
                }
            });
        });

        function showMessage(msg, type) {
            var className = type === 'success' ? 'alert-success' : 'alert-error';
            $output.html('<div class="contact-alert ' + className + '">' + msg + '</div>');

            // Auto-hide after 5 seconds
            setTimeout(function () {
                $output.fadeOut(function () {
                    $(this).html('').show();
                });
            }, 5000);
        }

        function isValidEmail(email) {
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

    });

})(jQuery);
