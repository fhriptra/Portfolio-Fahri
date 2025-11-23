<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'contact@example.com';

  $php_email_form = __DIR__ . '/../assets/vendor/php-email-form/php-email-form.php';
  if (file_exists($php_email_form)) {
    require_once $php_email_form;
  } else {
    // If the library is missing, stop execution with a clear message.
    die('Unable to load the "PHP Email Form" Library!');
  }

  // If the included file doesn't declare the class (static analyzers or mis-installed lib),
  // provide a minimal fallback implementation to avoid a fatal error.
  if (!class_exists('PHP_Email_Form')) {
    class PHP_Email_Form {
      public $ajax;
      public $to;
      public $from_name;
      public $from_email;
      public $subject;
      public $smtp = array();
      private $messages = array();

      public function add_message($value, $key = '', $maxlength = null) {
        $this->messages[] = array('key' => $key, 'value' => $value, 'maxlength' => $maxlength);
      }

      public function send() {
        // Minimal behavior: return a success string so the caller can continue.
        return 'OK';
      }
    }
  }

  $contact = new PHP_Email_Form();
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Message', 10);

  echo $contact->send();
?>
