<?php

    $guid = getGUID();
    $url = 'http://69.28.248.249:3000/api/can/register';
    //$url = 'https://empleo.adecco.com.co/api/can/register';
    $params = array(
        'id'=> "823cf15a-5727-11e8-9c2d-fa7ae01bbeba",
        'primer_nombre'=> $_POST['nombre'],
        'segundo_nombre'=> "N/A",
        'primer_apellido'=> $_POST['apellido'],
        'segundo_apellido'=> "N/A",
        'email'=> $_POST['email'],
        'password'=> $_POST['password'],
        'area_laboral'=>"sistemas",
        'pais'=> "argentina"
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);

    // This should be the default Content-type for POST requests
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: application/x-www-form-urlencoded"));

    $result = curl_exec($ch);
    if(curl_errno($ch) !== 0) {
        error_log('cURL error when connecting to ' . $url . ': ' . curl_error($ch));
    }

    curl_close($ch);
    echo  json_encode($result, JSON_UNESCAPED_UNICODE);	

    
function getGUID(){
    if (function_exists('com_create_guid')){
        return com_create_guid();
    }
    else {
        mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);// "-"
        $uuid = substr($charid, 0, 8).$hyphen
            .substr($charid, 8, 4).$hyphen
            .substr($charid,12, 4).$hyphen
            .substr($charid,16, 4).$hyphen
            .substr($charid,20,12);// ""
        return $uuid;
    }
}

?>