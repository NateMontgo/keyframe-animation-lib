/**
 *
 * Reads current state of animation object and draws current frame to the canvas context.
 *
 * All animation data is passed through obj. The sprites can either be stored as a spritesheet with an accompanying spriteData list, otherwise they must be stored as a 
 * spritelist. Each sprite is represented by its index in each list. Sprites are drawn onto the canvas in the order that they appear in obj.drawData. It's recommended
 * to use GSAP timelines to manipulate the values in obj.drawData (https://gsap.com/).
 *
 * @author Nathan Montgomery
 * @version 1.1.0
 *  
 * @param {CanvasRenderingContext2D} ctx                           Context of the canvas the frame should be drawn on.
 * @param {Object}                   obj                           Object containing animation data.
 * @param {?Image}                   obj.spritesheet               Image containing all animation sprites. Required if obj.spritelist is not present.
 * @param {?Image[]}                 obj.spritelist                List of all animation sprites. Required if obj.spritesheet is not present.
 * @param {?Object[]}                obj.spriteData                List of coordinates of each sprite in obj.spritesheet. One object per sprite. Required if 
 *                                                                 obj.spritesheet is present.
 * @param {number}                   obj.spriteData[].x            Source x coordinate of a sprite in obj.spritesheet.
 * @param {number}                   obj.spriteData[].y            Source y coordinate of a sprite in obj.spritesheet.
 * @param {number}                   obj.spriteData[].width        Source width of a sprite in obj.spritesheet.
 * @param {number}                   obj.spriteData[].height       Source height of a sprite in obj.spritesheet.
 * @param {Object[]}                 obj.drawData                  List of objects containing information on how a particular sprite should be drawn to the canvas. Each
 *                                                                 object represents a sprite, but duplicate sprites are allowed.
 * @param {number}                   obj.drawData[].sprite         Index of sprite in either obj.spriteData or obj.spritelist to draw.
 * @param {number}                   obj.drawData[].x              Destination x coordinate of the sprite based on obj.drawData[].positionType.
 * @param {number}                   obj.drawData[].y              Destination y coordinate of the sprite based on obj.drawData[].positionType.
 * @param {number}                   obj.drawData[].width          Destination width coordinate of the sprite.
 * @param {number}                   obj.drawData[].height         Destination height coordinate of the sprite.
 * @param {number}                   obj.drawData[].angle          Angle (in radians) at which to draw the sprite.
 * @param {number}                   obj.drawData[].rotationPointX X coordinate of the point of rotation of the sprite based on obj.drawData[].rotationType.
 * @param {number}                   obj.drawData[].rotationPointY Y coordinate of the point of rotation of the sprite based on obj.drawData[].rotationType.
 * @param {string}                   obj.drawData[].positionType   Determines how obj.drawData[].x and obj.drawData[].y are interpreted. Can be set to "absolute" or 
 *                                                                 "relativeToXYI".
 *                                                                   - "absolute" means coordinates are relative to the origin of the animation object.
 *                                                                   - "relativeToXYI" means coordinates are relative to the position of the sprite at index "I" based on 
 *                                                                     "X" and "Y".
 *                                                                      - "X" must be either "L", "M", or "R" referring to the "Left", "Middle", or "Right" of the anchor 
 *                                                                        sprite respectively.
 *                                                                      - "Y" must be either "T", "M", or "B" referring to the "Top", "Middle", or "Bottom" of the anchor 
 *                                                                        sprite respectively.
 *                                                                      - "I" must be an integer referring to the index of the anchor sprite.
 * @param {string}                   obj.drawData[].rotationType   Determines how obj.drawData[].rotationPointX and obj.drawData[].rotationPointY are interpreted. Can 
 *                                                                 be set to "absolute", "relative" or "relativeToXYI".
 *                                                                   - "absolute" means coordinates are relative to the origin of the animation object.
 *                                                                   - "relative" means coordinates are relative to the origin of the current sprite.
 *                                                                   - "relativeToXYI" means coordinates are relative to the position of the sprite at index "I" based on 
 *                                                                     "X" and "Y".
 *                                                                      - "X" must be either "L", "M", or "R" referring to the "Left", "Middle", or "Right" of the anchor 
 *                                                                        sprite respectively.
 *                                                                      - "Y" must be either "T", "M", or "B" referring to the "Top", "Middle", or "Bottom" of the anchor 
 *                                                                        sprite respectively.
 *                                                                      - "I" must be an integer referring to the index of the anchor sprite.
 * @param {number}                   obj.drawData[].alpha          Opacity of sprite. Must be a value between 0.0 and 1.0 inclusive.
 * @param {number}                   x                             X coordinate of the origin of the animation object on the canvas.
 * @param {number}                   y                             Y coordinate of the origin of the animation object on the canvas.
 * @param {number}                   [width = 1]                   The multiplier of the animation object's width. Defaults to 1 for the default width.
 * @param {number}                   [height = 1]                  The multiplier of the animation object's height. Defaults to 1 for the default height.
 * 
 * 
 * @returns {undefined}
*/
function drawKeyFrame(ctx, obj, x, y, width = 1, height = 1) {
                 
  // local vars (whole function)
  let partialNetXs = [];
  let partialNetYs = [];
  let relativePositionReferences = [ [] ];
  
  for (let i = 0; i < obj.drawData.length; i++) {
      // calculate partial positions of each image separately
      partialNetXs[i] = 0;
      partialNetYs[i] = 0;
      relativePositionReferences[i] = [];
  
      // only execute if visible
      if (obj.drawData[i].alpha > 0) {

          // local vars (loop)
          let foundRelativePositionReference = false;
          let positionReferencePlaceholder;
      
          // determine nested relative coords and store in relativePositionReferences
          relativePositionReferences[i].unshift(i);
          foundRelativePositionReference = true;
          while (foundRelativePositionReference) {
              if (obj.drawData[relativePositionReferences[i][0]].positionType.slice(0, 10) === 'relativeTo') {
              // image must not be anchored to itself
              if (parseInt(obj.drawData[i].positionType.slice(12)) !== i) {
                  relativePositionReferences[i].unshift(parseInt(obj.drawData[relativePositionReferences[i][0]].positionType.slice(12)));
              } else {
                  foundRelativePositionReference = false;
                  console.error('Error drawing keyframe: image cannot be anchored to itself -- index ' + i, obj);
              }
              } else {
              foundRelativePositionReference = false;
              }
          }
      
          // determine x/y coords based off position type for each nested relative
          if (obj.drawData[i].positionType.slice(0, 10) === 'relativeTo') {
              
              // image must not be anchored to itself
              if (parseInt(obj.drawData[i].positionType.slice(12)) !== i) {
              
              // set partialNetX and partialNetY to the image coords with absolute positioning
              // temporarily splice image with absolute positioning from the array
              partialNetXs[i] = obj.drawData[relativePositionReferences[i][0]].x;
              partialNetYs[i] = obj.drawData[relativePositionReferences[i][0]].y
              positionReferencePlaceholder = relativePositionReferences[i].splice(0, 1);
      
              // add remaining relative position references to partialNetX and partialNetY
              relativePositionReferences[i].forEach((objRef) => {
                  // determine x
                  if (obj.drawData[objRef].positionType.slice(10, 11) === 'L') {
                      partialNetXs[i] += obj.drawData[objRef].x;
                  } else if (obj.drawData[objRef].positionType.slice(10, 11) === 'M') {
                      partialNetXs[i] += (obj.drawData[parseInt(obj.drawData[objRef].positionType.slice(12))].width / 2) + obj.drawData[objRef].x;
                  } else if (obj.drawData[objRef].positionType.slice(10, 11) === 'R') {
                      partialNetXs[i] += obj.drawData[parseInt(obj.drawData[objRef].positionType.slice(12))].width + obj.drawData[objRef].x;
                  } else {
                      console.error('Error drawing keyframe: invalid relative position anchor at index ' + objRef, obj);
                  }
      
                  // determine y
                  if (obj.drawData[objRef].positionType.slice(11, 12) === 'T') {
                      partialNetYs[i] += obj.drawData[objRef].y;
                  } else if (obj.drawData[objRef].positionType.slice(11, 12) === 'M') {
                      partialNetYs[i] += (obj.drawData[parseInt(obj.drawData[objRef].positionType.slice(12))].height / 2) + obj.drawData[objRef].y;
                  } else if (obj.drawData[i].positionType.slice(11, 12) === 'B') {
                      partialNetYs[i] += obj.drawData[parseInt(obj.drawData[objRef].positionType.slice(12))].height + obj.drawData[objRef].y;
                  } else {
                  console.error('Error drawing keyframe: invalid relative position anchor at index ' + objRef, obj);
                  }
              });
      
              // add back image with absolute positioning
              relativePositionReferences[i].unshift(positionReferencePlaceholder);
              }
      
          } else if (obj.drawData[i].positionType === 'absolute') {
              partialNetXs[i] = obj.drawData[i].x;
              partialNetYs[i] = obj.drawData[i].y;
          } else {
              console.error('Error drawing keyframe: invalid positionType at index ' + i, obj);
          }
      }
  }
  
  for (let i = 0; i < obj.drawData.length; i++) {
      // calculate rotation point and rotation of each image
      // draw each image
  
      // only execute if visible
      if (obj.drawData[i].alpha > 0) {
      
          // local vars (loop)
          let netRotationPointX = 0;
          let netRotationPointY = 0;
      
          // set width and height
          ctx.setTransform(width, 0, 0, height, 0, 0);
      
          // rotate
          // apply rotation for each reference in relativePositionReferences
          relativePositionReferences[i].forEach((objRef) => {
      
              if (obj.drawData[objRef].angle % (2 * Math.PI) !== 0) {
      
              // determine point of rotation
              if (obj.drawData[objRef].rotationType === 'relative') {
                  //* rotation point is relative to current image's origin 
                  netRotationPointX = partialNetXs[objRef] + (x / width) + obj.drawData[objRef].rotationPointX;
                  netRotationPointY = partialNetYs[objRef] + (y / height) + obj.drawData[objRef].rotationPointY;
              } else if (obj.drawData[objRef].rotationType.slice(0, 10) === 'relativeTo') {
      
                  // determine X
                  if (obj.drawData[objRef].rotationType.slice(10, 11) === 'L') {
                  netRotationPointX = partialNetXs[parseInt(obj.drawData[objRef].rotationType.slice(12))] + (x / width) + obj.drawData[objRef].rotationPointX;
                  } else if (obj.drawData[objRef].rotationType.slice(10, 11) === 'M') {
                  netRotationPointX = partialNetXs[parseInt(obj.drawData[objRef].rotationType.slice(12))] + (obj.drawData[parseInt(obj.drawData[objRef].rotationType.slice(12))].width / 2) + (x / width) + obj.drawData[objRef].rotationPointX;
                  } else if (obj.drawData[objRef].rotationType.slice(10, 11) === 'R') {
                  netRotationPointX = partialNetXs[parseInt(obj.drawData[objRef].rotationType.slice(12))] + obj.drawData[parseInt(obj.drawData[objRef].rotationType.slice(12))].width + (x / width) + obj.drawData[objRef].rotationPointX;
                  } else {
                  console.error('Error drawing keyframe: invalid relative angle anchor at index ' + objRef, obj);
                  }
                  
                  // determine Y
                  if (obj.drawData[objRef].rotationType.slice(11, 12) === 'T') {
                  netRotationPointY = partialNetYs[parseInt(obj.drawData[objRef].rotationType.slice(12))] + (y / height) + obj.drawData[objRef].rotationPointY;
                  } else if (obj.drawData[objRef].rotationType.slice(11, 12) === 'M') {
                  netRotationPointY = partialNetYs[parseInt(obj.drawData[objRef].rotationType.slice(12))] + (obj.drawData[parseInt(obj.drawData[objRef].rotationType.slice(12))].height / 2) + (y / height) + obj.drawData[objRef].rotationPointY;
                  } else if (obj.drawData[objRef].rotationType.slice(11, 12) === 'B') {
                  netRotationPointY = partialNetYs[parseInt(obj.drawData[objRef].rotationType.slice(12))] + obj.drawData[parseInt(obj.drawData[objRef].rotationType.slice(12))].height + (y / height) + obj.drawData[objRef].rotationPointY;
                  } else {
                  console.error('Error drawing keyframe: invalid relative angle anchor at index ' + objRef, obj);
                  }
                  
              } else if (obj.drawData[objRef].rotationType === 'absolute') {
                  netRotationPointX = (x / width) + obj.drawData[objRef].rotationPointX;
                  netRotationPointY = (y / height) + obj.drawData[objRef].rotationPointY;
              } else {
                  console.error('Error drawing keyframe: invalid rotationType at index ' + objRef, obj);
              }
              
              // rotate
              ctx.translate(netRotationPointX, netRotationPointY);
              ctx.rotate(obj.drawData[objRef].angle);
              ctx.translate(-netRotationPointX, -netRotationPointY)
              }
          });
      
      
      
          // draw
          // set globalAlpha
          ctx.globalAlpha = obj.drawData[i].alpha;
  
          // draw keyframe with x/y coords determined above
          if (obj.spritelist) {
              ctx.drawImage(
              obj.spritelist[obj.drawData[i].sprite],
              partialNetXs[i] + (x / width),
              partialNetYs[i] + (y / height),
              obj.drawData[i].width,
              obj.drawData[i].height
              )
          } else if (obj.spritesheet) {
              ctx.drawImage(
              obj.spritesheet,
              obj.spriteData[obj.drawData[i].sprite].x,
              obj.spriteData[obj.drawData[i].sprite].y,
              obj.spriteData[obj.drawData[i].sprite].width,
              obj.spriteData[obj.drawData[i].sprite].height,
              partialNetXs[i] + (x / width),
              partialNetYs[i] + (y / height),
              obj.drawData[i].width,
              obj.drawData[i].height
              );
          } else {
              console.error('Error drawing keyframe: No spritesheet or spritelist found', obj)
          }
      
          // restore context
          ctx.globalAlpha = 1;
          ctx.resetTransform();
      }
  }
}