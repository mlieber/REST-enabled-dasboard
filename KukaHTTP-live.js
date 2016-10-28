//Lets require/import the HTTP module
var http = require('http');
//var dispatcher = require('httpdispatcher');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
//var fabric = require('fabric').fabric;
//var canvas = fabric.createCanvasForNode(200, 200);
var fs = require('fs')
var path = require('path')
//var canvas = require('canvas')
// var ctx = canvas.getContext('2d');
//var draw_robot = require('./draw_robot');
var draw = require('./draw_badge');

var robot1;
var robot1_xcoord = 30;    
var robot1_ycoord = 100;    

var robot2;
var robot2_xcoord = 50;
var robot2_ycoord = 30;    

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

/** -------- Start -----
 *
 */
 
//router.get('/show', function (req, res, next) {
app.get('/', function (req, res) {
 
 // var result = data.replace('boxx', i);
   console.log("Xcoord: " + robot1_xcoord);
  res.setHeader('Content-Type', 'image/png');
  // redraw everything
//  draw_badge(robot2_xcoord,robot2_ycoord).pngStream().pipe(res);
  draw(robot1_xcoord,robot1_ycoord, robot2_xcoord,robot2_ycoord).pngStream().pipe(res);

});


 // Getting a POST
app.post('/', function (req, res) {
  console.log(req.body.id);
if (req.body.id=="1")
{
  console.log("robot1 change");
  robot1_xcoord = req.body.xcoordinate;
  robot1_ycoord = req.body.ycoordinate;
}
else
 if (req.body.id=="2")
{
  console.log("robot2 change");

  robot2_xcoord = req.body.xcoordinate;
  robot2_ycoord = req.body.ycoordinate;
}
res.send('Got a POST request' );



});
 // Main app - Listen
app.listen(3000, function () {
  console.log('Example app listening !');
});
