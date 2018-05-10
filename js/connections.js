var express = require('express'),
    path = require('path'),
    bodyParser = require('bodyParser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app = express();

var conString = "postgress://postgress:Kortstokk1@localhost/uno/public";