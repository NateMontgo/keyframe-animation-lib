// spritelists
const bloverSprites = document.querySelectorAll('.blover-sprites');

// object constructors
class imageCoords {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
class drawCoords {
  constructor(sprite) {
    this.sprite = sprite;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.angle = 0;
    this.rotationPointX = 0;
    this.rotationPointY = 0;
    this.positionType = 'absolute'; // OR 'relativeTo'
    this.rotationType = 'relative'; // OR 'absolute' OR 'relativeTo'
    this.alpha = 1;
  } 
}

// spritelist keyframe objects
let blover = {
  spritelist: bloverSprites,
  drawData: [
    new drawCoords(6), // *stem1                            0
    new drawCoords(7), // *stem2                            
    new drawCoords(1), // *dirt_back                        
    new drawCoords(2), // *dirt_front                                                
    new drawCoords(5), // *petal1                           
    new drawCoords(5), // *petal2                           5
    new drawCoords(5), // *petal3                           
    new drawCoords(3), // *head                             
    new drawCoords(0), // *blink                            8
  ],

  blow: gsap.timeline({repeat: -1}),
  test: gsap.timeline({repeat: -1})
}

// blover
blover.blow.
//* init
set(blover.drawData[0], {x:26.100, y:31.000, width:17.6, height:16.8, rotationPointX: 14.7,  rotationPointY: 12.6, rotationType: 'relativeToLT7'}).
set(blover.drawData[1], {x:27.600, y:46.300, width:13.6, height:9.6, rotationPointX:10, rotationPointY: 9.6, rotationType: 'relative'}).
set(blover.drawData[2], {x:35.400, y:54.300, width:9.6, height:4.8}).
set(blover.drawData[3], {x:34.300, y:56.700, width:12, height:3.2}).
set(blover.drawData[4], {x:-16.5, y:-33, width:33, height:34, positionType: 'relativeToMT7', rotationType: 'relativeToMM7'}).
set(blover.drawData[5], {x:-16.5, y:-33, width:33, height:34, angle:4.189, positionType: 'relativeToMT7', rotationType: 'relativeToMM7'}).
set(blover.drawData[6], {x:-16.5, y:-33, width:33, height:34, angle:2.094, positionType: 'relativeToMT7', rotationType: 'relativeToMM7'}).
set(blover.drawData[7], {x:21.900, y:15.300, width:29.4, height:25.2}).
set(blover.drawData[8], {alpha: 0}).

//* petal1
to(blover.drawData[4], {keyframes: [
  {duration: 0.3},
  {x: -25.5, y: -49, width: 49.5, height: 51, duration: 0.25},
  {angle: (8 * Math.PI), duration: 2}
]}).
//* petal2
to(blover.drawData[5], {keyframes: [
  {duration: 0.3},
  {x: -25.5, y: -49, width: 49.5, height: 51, duration: 0.25},
  {angle: (8 * Math.PI) + 4.189, duration: 2}
]}, '<').
//* petal3
to(blover.drawData[6], {keyframes: [
  {duration: 0.3},
  {x: -25.5, y: -49, width: 49.5, height: 51, duration: 0.25},
  {angle: (8 * Math.PI) + 2.094, duration: 2},
]}, '<').
//* head
to(blover.drawData[7], {keyframes: [
  {x: 11, y: 18, ease: 'out', duration: 0.3},
  {sprite: 4, duration: 0},
  {x: 41, y: 10, width: 44.1, height: 37.8, duration: 0.25}
]}, '<').
to(blover.drawData[0], {keyframes: [
  {x: 15.2, y: 33.7, ease: 'out', angle: -0.5, duration: 0.3},
  {x: 56.05, y: 43.8, duration: 0.25, rotationPointX: 22.05, rotationPointY: 18.9, angle: 0.8}
]}, '<').
to(blover.drawData[1], {keyframes: [
  {angle: -0.2, duration: 0.3, ease: 'out'},
  {angle: 1.1, duration: 0.2}
]}, '<')



