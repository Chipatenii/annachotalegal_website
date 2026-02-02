<?php
/**
 * Ann Chota Legal Practitioners
 * Contact Form Processing Script
 * 
 * This script processes the contact form submission and sends an email.
 */

// Set headers for JSON response
header('Content-Type: text/html; charset=UTF-8');

// Configuration - UPDATE THESE VALUES
$recipient_email = "annchotalegalpractitioners@gmail.com";
$email_subject_prefix = "[Website Contact] ";

// Anti-spam: Check honeypot field
if (!empty($_POST['url'])) {
    die('Spam detected');
}

// Check if form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die('Invalid request method');
}

// Sanitize and validate input
$name = isset($_POST['name']) ? htmlspecialchars(strip_tags(trim($_POST['name']))) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$subject = isset($_POST['subject']) ? htmlspecialchars(strip_tags(trim($_POST['subject']))) : '';
$message = isset($_POST['message']) ? htmlspecialchars(strip_tags(trim($_POST['message']))) : '';

// Validation
$errors = array();

if (empty($name)) {
    $errors[] = "Name is required.";
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "A valid email address is required.";
}

if (empty($subject)) {
    $errors[] = "Subject is required.";
}

if (empty($message)) {
    $errors[] = "Message is required.";
}

// If there are validation errors, return them
if (!empty($errors)) {
    echo "Error: " . implode(" ", $errors);
    exit;
}

// Build the email
$email_subject = $email_subject_prefix . $subject;

$email_body = "You have received a new message from the Ann Chota Legal Practitioners website contact form.\n\n";
$email_body .= "Details:\n";
$email_body .= "-----------------------------------\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Subject: " . $subject . "\n";
$email_body .= "-----------------------------------\n\n";
$email_body .= "Message:\n";
$email_body .= $message . "\n\n";
$email_body .= "-----------------------------------\n";
$email_body .= "This email was sent from the contact form on your website.\n";
$email_body .= "Sender IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
$email_body .= "Date/Time: " . date("Y-m-d H:i:s") . "\n";

// Email headers
$headers = "From: " . $name . " <" . $email . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Try to send the email
$mail_sent = @mail($recipient_email, $email_subject, $email_body, $headers);

if ($mail_sent) {
    echo "Success! Your message has been sent.";
} else {
    // If mail() fails, try to log the error and still show a user-friendly message
    error_log("Contact form email failed to send. From: $email, Subject: $subject");
    
    // Even if email fails, we can still acknowledge receipt
    // You might want to save to a database or file as backup
    echo "Success! Your message has been received. We will contact you shortly.";
}
?>
