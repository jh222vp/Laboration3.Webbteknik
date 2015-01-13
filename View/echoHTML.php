<?php
/**
 * Created by PhpStorm.
 * User: Jonas
 * Date: 2014-12-11
 * Time: 11:36
 */
class echoHTML
{
    public function echoHTML()
    {
        $ret = "<!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <link href='./Style/style.css' rel='stylesheet'>
            <link href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css' rel='stylesheet'>
            <title>Jonas Trafikapplikation</title>
        </head>
        <body>
        <div class='container container-fluid'>
        <div class='row'>
        <div class='col-md-12'>
        <div class='page-header'>
            <h1>Jonas Trafiksida</h1>
        </div>
        </div>
        </div>
        <div class='row'>
        <div class='col-md-12'>
        </div>
        </div>
        <div class='row'>
        <div class='col-md-4'>
        <div class='panel panel-info' id='panel'>
            <div class='panel-heading'>
            <h3>Trafikmeddelanden</h3>
        <select id='SelectList' class='btn btn-primary'>
            <option value='4'>Alla meddelanden</option>
            <option value='0'>Vägtrafik</option>
            <option value='1'>Kollektivtrafik</option>
            <option value='2'>Planerade störningar</option>
            <option value='3'>Övrigt</option>
        </select>
        </div>
            <div class='panel-body' id='box'>
            </div>
        </div>
        </div>
        <div id='map-canvas' class='col-md-8'>
        </div>
        </div>
        </div>
        </div>
        </div>
        <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAXnIpJZtmtzoky9ba0KLXhk-PsT7vRb8E'></script>
        <script src='js/Map.js'></script>
        <script src='js/jquery-1.10.2.min.js'></script>
        <script src='js/Traffic.js'></script>
        </body>
        </html>";

        return $ret;
    }
}