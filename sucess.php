<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->

<style type="text/css">
 body:after{
      content:"";
      position:fixed; /* stretch a fixed position to the whole screen */
      top:0;
      height:100vh; /* fix for mobile browser address bar appearing disappearing */
      left:0;
      right:0;
      z-index:-1; /* needed to keep in the background */
      background: url(img/background.jpg) center center;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
}
</style>



<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb18030">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/2962143.css">

    </head>
    <body>
        <div class="content" style="text-align: center;vertical-align:  middle;margin-top: 300px">
                <div class="media">
                </div>
                <div class="text" style="font-size: 20px;color: #FFFFFF;font-family: Helvetica Neue,Helvetica,arial,sans-serif;">
                    ¡Hecho! Tu información se ha enviado correctamente. Gracias por unirte a Adecco.
                </div>
            </div>
    </body>
</html>


<?php
 
header('Cache-Control: no-cache');
header('Pragma: no-cache');
header('Refresh: 10; URL=index.php');


?>