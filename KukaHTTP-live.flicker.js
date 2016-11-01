//Lets do all of the imports first
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require('fs')
var path = require('path')
// This is the draw js code for 2 objects
var draw = require('./draw_badge');
// Global variables for the 2 objects
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
 
// GET call
app.get('/', function (req, res) {
 
  console.log("Xcoord: " + robot1_xcoord);
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Refresh','1'); // refresh browser

  // redraw everything
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
app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening !');
});
