//Lets require/import the HTTP module
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var fs = require('fs')
var path = require('path')

var draw = require('./draw_badge');

var robot1;
var robot1_xcoord = 30;
var robot1_ycoord = 100;

var robot2;
var robot2_xcoord = 50;
var robot2_ycoord = 30;

var Canvas = require('canvas')
var canvas = new Canvas(600, 600)

// An array to hold a list of active clients
var clients = [];

// draw an initial version of your buffer
var imageData = draw(robot1_xcoord, robot1_ycoord, robot2_xcoord, robot2_ycoord).toBuffer(undefined, 3, canvas.PNG_FILTER_NONE);
// get the size in bytes as well, we'll need it
var length = imageData.byteLength;

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

app.get('/', function(req, res) {
  // prepare header so that the browser will wait for arbitray updates
  res.writeHead(200, {
    'Content-Type': 'multipart/x-mixed-replace; boundary=--NEW_IMAGE_HERE',
    'Cache-Control': 'no-cache',
    'Connection': 'close',
    'Pragma': 'no-cache'
  });
  var on_update = function(imageData, length) {
      try {
        console.log("Updating client.. bytes:", length)
        res.write("--NEW_IMAGE_HERE\r\n");
        res.write("Content-Type: image/png\r\n");
        res.write("Content-Length: " + length + "\r\n\r\n");
        res.write(imageData);
      } catch (e) { // in case of an error remove from the clients array
        console.log("Error: ", e);
        clients.splice(clients.indexOf(on_update), 1);
      }
    }
    // remove on disconnect
  res.on('close', function() {
    console.log("Disconnected");
    clients.splice(clients.indexOf(on_update), 1);
  });
  // send the client our last cached version of the image
  on_update(imageData, length);
  // add our update function to the array of clients
  clients.push(on_update);
});

// Getting a POST
app.post('/', function(req, res) {
  console.log(req.body.id);
  if (req.body.id == "1") {
    console.log("robot1 change");
    robot1_xcoord = req.body.xcoordinate;
    robot1_ycoord = req.body.ycoordinate;
  } else
  if (req.body.id == "2") {
    console.log("robot2 change");
    robot2_xcoord = req.body.xcoordinate;
    robot2_ycoord = req.body.ycoordinate;
  }
  res.send('Got a POST request');
  // redraw everything into the buffer
  imageData = draw(robot1_xcoord, robot1_ycoord, robot2_xcoord, robot2_ycoord).toBuffer(undefined, 3, canvas.PNG_FILTER_NONE);
  length = imageData.byteLength;
  // notify active clients
  for (on_update of clients) {
    on_update(imageData, length);
  }
});
// Main app - Listen
app.listen(process.env.PORT || 5000, function() {
  console.log('Example app listening !');
});