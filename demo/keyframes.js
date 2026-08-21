// spritesheets
const ballSprites = document.querySelector('#ball-sprites');
const zombieSprites = document.querySelector('#zombie-sprites');

// spritelists
const bloverSprites = document.querySelectorAll('.blover-sprites');
const bushSprites = document.querySelectorAll('.bush-sprites');

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

// spritesheet keyframe objects
let ball = {
  spritesheet: ballSprites,
  spriteData: [
    new imageCoords(0, 0, 75, 75), // *base
    new imageCoords(75, 0, 13, 28), // *outer eye
    new imageCoords(75, 28, 5, 8) // *inner eye
  ],
  drawData: [
    new drawCoords(0), // *base
    new drawCoords(1), // *L outer eye
    new drawCoords(2), // *L inner eye
    new drawCoords(1), // *R outer eye
    new drawCoords(2), // *R inner eye
  ],

  look: gsap.timeline({repeat: -1}),
  awooga: gsap.timeline({repeat: -1})
}

let zombie = {
  spritesheet: zombieSprites,
  spriteData: [
    new imageCoords(1, 109, 20, 39), // *outer leg upper   0
    new imageCoords(25, 97, 24, 29), // *outer leg lower
    new imageCoords(21, 125, 42, 21), // *outer leg foot
    new imageCoords(57, 77, 14, 25), // *inner leg upper
    new imageCoords(77, 79, 28, 35), // *inner leg lower
    new imageCoords(50, 102, 26, 17), // *inner leg foot   5
    new imageCoords(54, 15, 51, 62), // *body
    new imageCoords(0, 0, 52, 48), // *head
    new imageCoords(54, 0, 31, 15), // *jaw
    new imageCoords(0, 83, 25, 26), // *outer arm hand
    new imageCoords(50, 77, 20, 22), // *inner arm hand    10
    new imageCoords(1, 48, 16, 35), // *outer arm upper
    new imageCoords(18, 49, 18, 27), // *outer arm lower
    new imageCoords(37, 50, 13, 21), // *inner arm upper
    new imageCoords(73, 121, 18, 23), // *inner arm lower
    new imageCoords(87, 114, 16, 30) // *tie               15
  ],
  drawData: [
    new drawCoords(0), // *outer leg upper                 0
    new drawCoords(1), // *outer leg lower
    new drawCoords(2), // *outer leg foot
    new drawCoords(3), // *inner leg upper
    new drawCoords(4), // *inner leg lower
    new drawCoords(5), // *inner leg foot                  5
    new drawCoords(9), // *outer arm hand
    new drawCoords(11), // *outer arm upper
    new drawCoords(12), // *outer arm lower
    new drawCoords(6), // *body
    new drawCoords(7), // *head
    new drawCoords(8), // *jaw
    new drawCoords(10), // *inner arm hand                 10
    new drawCoords(13), // *inner arm upper
    new drawCoords(14), // *inner arm lower
    new drawCoords(15) // *tie                             15
  ],

  walk: gsap.timeline({repeat: -1})
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

// gsap timelines
//   ball
ball.look.
//* init 
set(ball.drawData[0], {x: 0, y: 0, width: 75, height: 75, rotationType: 'relativeToMM0', alpha: 1}).
set(ball.drawData[1], {x: 5.5, y: 10, width: 13, height: 28, positionType: 'relativeToMT0'}).
set(ball.drawData[2], {x: -2.5, y: -4, width: 5, height: 8, positionType: 'relativeToMM1'}).
set(ball.drawData[3], {x: -20.5, y: 10, width: 13, height: 28, positionType: 'relativeToMT0'}).
set(ball.drawData[4], {x: -2.5, y: -4, width: 5, height: 8, positionType: 'relativeToMM3'}).
//* right outer eye
to(ball.drawData[1], {keyframes: [
  {x: 0.5, duration: 0.7, ease: 'out'},
  {x: 10.5, duration: 0.6, ease: 'out'},
  {x: 5.5, duration: 0.4, ease: 'out'}
]}).
//* right inner eye
to(ball.drawData[2], {keyframes: [
  {x: -6, duration: 0.7, ease: 'out'},
  {x: 1, duration: 0.6, ease: 'out'},
  {x: -2.5, duration: 0.4, ease: 'out'}
]}, '<').
//* left outer eye
to(ball.drawData[3], {keyframes: [
  {x: -25.5, duration: 0.7, ease: 'out'},
  {x: -15.5, duration: 0.6, ease: 'out'},
  {x: -20.5, duration: 0.4, ease: 'out'}
]}, '<').
//* left inner eye
to(ball.drawData[4], {keyframes: [
  {x: -6, duration: 0.7, ease: 'out'},
  {x: 1, duration: 0.6, ease: 'out'},
  {x: -2.5, duration: 0.4, ease: 'out'}
]}, '<').
to(ball.drawData[0], {keyframes: [
  {duration: 0.2},
  {angle: Math.PI * 2, duration: 0.8}
]}).
to(ball.drawData[0], {alpha: 0, duration: 1});


ball.awooga.
//* init
set(ball.drawData[0], {x: 0, y: 0, width: 75, height: 75}).
set(ball.drawData[1], {x: 28, y: 24, width: 0, height: 0}).
set(ball.drawData[2], {x: 28, y: 24, width: 0, height: 0}).
set(ball.drawData[3], {x: 48, y: 24, width: 0, height: 0}).
set(ball.drawData[4], {x: 48, y: 24, width: 0, height: 0}).
//* bounce eyes
to(ball.drawData[1], {x: 21, y: 10, width: 13, height:28, duration: 2, ease:"elastic(2, 0.2)"}).
to(ball.drawData[2], {x: 25, y: 20, width: 5, height:8, duration: 2, ease:"elastic(2, 0.2)"}, "<").
to(ball.drawData[3], {x: 41, y: 10, width: 13, height:28, duration: 2, ease:"elastic(2, 0.2)"}, "<").
to(ball.drawData[4], {x: 45, y: 20, width: 5, height:8, duration: 2, ease:"elastic(2, 0.2)"}, "<")

//  zombie

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

blover.test.
//* init
set(blover.drawData[0], {alpha: 0}).
set(blover.drawData[1], {alpha: 0}).
set(blover.drawData[2], {alpha: 0}).
set(blover.drawData[3], {alpha: 0}).
set(blover.drawData[4], {x: 100, y: 50, width: 100, height: 10}).
set(blover.drawData[5], {x: 0, y: 0, width: 100, height: 10, positionType: 'relativeToRT4', rotationType: 'relativeToRM4'}).
set(blover.drawData[6], {x: 0, y: 0, width: 100, height: 10, positionType: 'relativeToRT5', rotationType: 'relativeToRM5'}).
set(blover.drawData[7], {x: 0, y: 0, width: 100, height: 10, positionType: 'relativeToRT6', rotationType: 'relativeToRM6'}).
set(blover.drawData[8], {alpha: 0}).
//* left leaf
to(blover.drawData[4], {keyframes: [
  {x: 300, duration: 1.5},
  {y: 250, duration: 1.5},
  {x: 100, duration: 1.5},
  {y: 50, duration: 1.5}
]}).
to(blover.drawData[4], {angle: Math.PI * 2, duration: 6, ease: 'none'}, '<').
//* middle leaf
to(blover.drawData[5], {angle: Math.PI * 4, duration: 6, ease: 'none'}, '<').
//* right leaf
to(blover.drawData[6], {angle: Math.PI * 6, duration: 6, ease: 'none'}, '<').
//* face
to(blover.drawData[7], {angle: Math.PI * 8, duration: 6, ease: 'none'}, '<')



