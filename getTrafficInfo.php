<?php
/**
 * Created by PhpStorm.
 * User: Jonas
 * Date: 2014-12-11
 * Time: 11:45
 */

require_once("./Requests.php");
Requests::register_autoloader();

$theTime = date("Y-m-d H:i:s");
$time = strtotime($theTime);

if (time() - $time > 15 * 60)
{
    $request = Requests::get("http://api.sr.se/api/v2/traffic/messages?format=json&indent=true&size=100");
    file_put_contents("cache.json", $request->body);
    echo file_get_contents("cache.json");
}
else
{
    echo file_get_contents("cache.json");
}



