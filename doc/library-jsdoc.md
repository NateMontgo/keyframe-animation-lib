<a name="drawKeyFrame"></a>

## drawKeyFrame(ctx, obj, x, y, [width], [height]) ⇒ <code>undefined</code>
All animation data is passed through obj. The sprites can either be stored as a spritesheet with an accompanying spriteData list, otherwise they must be stored as a spritelist. Each sprite is represented by its index in each list. Sprites are drawn onto the canvas in the order that they appear in obj.dto use GSAP timelines to manipulate the values in obj.drawData (https://gsap.com/).

**Kind**: global function  
**Version**: 1.1.0  
**Author**: Nathan Montgomery  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctx | <code>CanvasRenderingContext2D</code> |  | Context of the canvas the frame should be drawn on. |
| obj | <code>Object</code> |  | Object containing animation data. |
| obj.spritesheet | <code>Image</code> |  | Image containing all animation sprites. Required if obj.spritelist is not present. |
| obj.spritelist | <code>Array.&lt;Image&gt;</code> |  | List of all animation sprites. Required if obj.spritesheet is not present. |
| obj.spriteData | <code>Array.&lt;Object&gt;</code> |  | List of coordinates of each sprite in obj.spritesheet. One object per sprite. Required if                                                                  obj.spritesheet is present. |
| obj.spriteData[].x | <code>number</code> |  | Source x coordinate of a sprite in obj.spritesheet. |
| obj.spriteData[].y | <code>number</code> |  | Source y coordinate of a sprite in obj.spritesheet. |
| obj.spriteData[].width | <code>number</code> |  | Source width of a sprite in obj.spritesheet. |
| obj.spriteData[].height | <code>number</code> |  | Source height of a sprite in obj.spritesheet. |
| obj.drawData | <code>Array.&lt;Object&gt;</code> |  | List of objects containing information on how a particular sprite should be drawn to the canvas. Each                                                                 object represents a sprite, but duplicate sprites are allowed. |
| obj.drawData[].sprite | <code>number</code> |  | Index of sprite in either obj.spriteData or obj.spritelist to draw. |
| obj.drawData[].x | <code>number</code> |  | Destination x coordinate of the sprite based on obj.drawData[].positionType. |
| obj.drawData[].y | <code>number</code> |  | Destination y coordinate of the sprite based on obj.drawData[].positionType. |
| obj.drawData[].width | <code>number</code> |  | Destination width coordinate of the sprite. |
| obj.drawData[].height | <code>number</code> |  | Destination height coordinate of the sprite. |
| obj.drawData[].angle | <code>number</code> |  | Angle (in radians) at which to draw the sprite. |
| obj.drawData[].rotationPointX | <code>number</code> |  | X coordinate of the point of rotation of the sprite based on obj.drawData[].rotationType. |
| obj.drawData[].rotationPointY | <code>number</code> |  | Y coordinate of the point of rotation of the sprite based on obj.drawData[].rotationType. |
| obj.drawData[].positionType | <code>string</code> |  | Determines how obj.drawData[].x and obj.drawData[].y are interpreted. Can be set to "absolute" or "relativeToXYI" <br> - "absolute" means coordinates are relative to the origin of the animation object. <br> - "relativeToXYI" means coordinates are relative to the position of the sprite at index "I" based on "X" and "Y".<br> - "X" must be either "L", "M", or "R" referring to the "Left", "Middle", or "Right" of the anchor sprite respectively <br> - "Y" must be either "T", "M", or "B" referring to the "Top", "Middle", or "Bottom" of the anchor sprite respectively <br> - "I" must be an integer referring to the index of the anchor sprite. |
| obj.drawData[].rotationType | <code>string</code> |  | Determines how obj.drawData[].rotationPointX and obj.drawData[].rotationPointY are interpreted. Can be set to "absolute", "relative" or "relativeToXYI". <br> - "absolute" means coordinates are relative to the origin of the animation object. <br> - "relative" means coordinates are relative to the origin of the current sprite. <br> - "relativeToXYI" means coordinates are relative to the position of the sprite at index "I" based on "X" and "Y". <br> - "X" must be either "L", "M", or "R" referring to the "Left", "Middle", or "Right" of the anchor sprite respectively. <br> - "Y" must be either "T", "M", or "B" referring to the "Top", "Middle", or "Bottom" of the anchor sprite respectively. <br> - "I" must be an integer referring to the index of the anchor sprite. |
| obj.drawData[].alpha | <code>number</code> |  | Opacity of sprite. Must be a value between 0.0 and 1.0 inclusive. |
| x | <code>number</code> |  | X coordinate of the origin of the animation object on the canvas. |
| y | <code>number</code> |  | Y coordinate of the origin of the animation object on the canvas. |
| [width] | <code>number</code> | <code>1</code> | The multiplier of the animation object's width. Defaults to 1 for the default width. |
| [height] | <code>number</code> | <code>1</code> | The multiplier of the animation object's height. Defaults to 1 for the default height. |