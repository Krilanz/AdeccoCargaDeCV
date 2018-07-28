<link rel="stylesheet" href="css/sweetalert2.css">
<script src="js/sweetalert2.all.js"></script>
<!-- Include a polyfill for ES6 Promises (optional) for IE11, UC Browser and Android browser support -->
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>
<?php
include 'Mobile-Detect/Mobile_Detect.php';
$detect = new Mobile_Detect();

// Check for any mobile device.
if ($detect->isMobile())
   include("mobile.html");//header("Location: mobile.html");
else
   include("desktop.html"); //header("Location: desktop.html");


?>


