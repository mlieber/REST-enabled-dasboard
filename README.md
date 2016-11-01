# REST-enabled-dasboard

## Goal 
The goal of this little app is to have the ability to show widgets on a web page and control their position through a REST API, i.e. POSTs in real-time, which will redraw the widgets via an image-stream (the request to the picture drawing is never closed).

## Usage
```
node KukaHTTP-live.js & 
```
then
```
curl -k -H "Content-Type: application/json" -d '{ "id":"1", "xcoordinate":250, "ycoordinate":300 }' http://localhost:5000
```

## Stack
This uses node.js, node-canvas.js.

For now only Safari & Firefox are supported (Chrome support has been dropped for image streaming apparently).

There is also a buildpack to enable this app on Heroku.
