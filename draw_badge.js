var Canvas = require('canvas')
var fs = require('fs')


function draw_badge(x,y) {
    

   var x, y, i

  ctx.clearRect(0, 0, 120, 120)

  ctx.save()

  ctx.translate(160, 160) 
  ctx.beginPath()
  ctx.lineWidth = 14
  ctx.strokeStyle = '#325FA2'
  ctx.fillStyle = '#eeeeee'
  
  ctx.arc(x, y, 42, 0, Math.PI * 2, true)
  ctx.stroke()
  ctx.fill()
  
  
 return canvas;
}


function draw_robot(x,y) {


var img = new Image()
img.src = canvas.toBuffer()
ctx.drawImage(img, 0, 0, 50, 50)
ctx.drawImage(img, 50, 0, 50, 50)
ctx.drawImage(img, 100, 0, 50, 50)

img = new Image()
img.src = fs.readFileSync('./kuka.png')
ctx.drawImage(img, 100, 0, img.width , img.height )

//img = new Image()
img.src = fs.readFileSync('./robot.jpeg')
ctx.drawImage(img, x, y, img.width / 2, img.height / 2)

canvas.createPNGStream().pipe(fs.createWriteStream('./image-robot.png'))
return canvas
}

function draw(x1,y1,x2,y2)
{
  Image = Canvas.Image,
      canvas = new Canvas(600, 600),
      ctx = canvas.getContext('2d');
  canvas = draw_robot(x1,y1);
  canvas = draw_badge(x2,y2);
  return canvas;
}

module.exports = draw;