## Classes

<dl>
<dt><a href="#KeyframeAnimation">KeyframeAnimation</a></dt>
<dd><p>Contains all properties and functions necessary to create a keyframe animation. </p>
<p>Sprites used in the animation can either be stored as a spritesheet with an accompanying spriteData list; otherwise, they must be stored as a spritelist. 
Each sprite is represented by its index in each list. Sprites are drawn onto the canvas in the order that they appear in obj.drawData. It&#39;s recommended
to use GSAP timelines to manipulate the values in obj.drawData (<a href="https://gsap.com/">https://gsap.com/</a>).</p>
</dd>
<dt><a href="#DrawCoords">DrawCoords</a></dt>
<dd><p>Helper class used by the KeyframeAnimation parent class. Provides information on how to draw sprites in animation.</p>
</dd>
<dt><a href="#imageCoords">imageCoords</a></dt>
<dd><p>Helper class used by the KeyframeAnimation parent class. Provides source coordinates of images in a given spritesheet.</p>
</dd>
</dl>

<a name="KeyframeAnimation"></a>

## KeyframeAnimation
Sprites used in the animation can either be stored as a spritesheet with an accompanying spriteData list; otherwise, they they must be stored as a spritelist. Each sprite is represented by its index in each list. Sprites are drawn onto the canvas in the order that they appear in obto use GSAP timelines to manipulate the values in obj.drawData (https://gsap.com/).

**Kind**: global class  
**Requires**: <code>module:DrawCoords</code>  
**Version**: 1.0.0  
**Author**: Nathan Montgomery  

* [KeyframeAnimation](#KeyframeAnimation)
    * [new KeyframeAnimation(spriteIndices, spritelist, spritesheet, spriteData)](#new_KeyframeAnimation_new)
    * [.drawKeyFrame(ctx, x, y, [width], [height])](#KeyframeAnimation+drawKeyFrame) ⇒ <code>undefined</code>
    * [.fetchRelPosTree(index)](#KeyframeAnimation+fetchRelPosTree) ⇒ <code>Array.&lt;number&gt;</code>
    * [.convertPosXToAbs(x, positionType, prevAnchors)](#KeyframeAnimation+convertPosXToAbs) ⇒ <code>number</code>

<a name="new_KeyframeAnimation_new"></a>

### new KeyframeAnimation(spriteIndices, spritelist, spritesheet, spriteData)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| spriteIndices | <code>Array.&lt;number&gt;</code> |  | List of indices of images in spritelist or spritesheet. Order of indices determines z-order of images in animation. |
| spritelist | <code>Array.&lt;Image&gt;</code> | <code></code> | List of images used in animation. Required if spritesheet is not present. |
| spritesheet | <code>Image</code> | <code></code> | Spritesheet containing all images used in animation. Required if spritelist is not present. |
| spriteData | [<code>Array.&lt;imageCoords&gt;</code>](#imageCoords) | <code></code> | List of coordinates of each image in spritesheet. One entry required for each sprite in spritesheet.                                          Required if spritesheet is present. |

<a name="KeyframeAnimation+drawKeyFrame"></a>

### keyframeAnimation.drawKeyFrame(ctx, x, y, [width], [height]) ⇒ <code>undefined</code>
Reads current state of animation object and draws current frame to the canvas context.

**Kind**: instance method of [<code>KeyframeAnimation</code>](#KeyframeAnimation)  
**Since**: 1.0.0  
**Version**: 1.1.2  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctx | <code>CanvasRenderingContext2D</code> |  | Context of the canvas the frame should be drawn on. |
| x | <code>number</code> |  | X coordinate of the origin of the animation object on the canvas. |
| y | <code>number</code> |  | Y coordinate of the origin of the animation object on the canvas. |
| [width] | <code>number</code> | <code>1</code> | The multiplier of the animation object's width. Defaults to 1 for the default width. |
| [height] | <code>number</code> | <code>1</code> | The multiplier of the animation object's height. Defaults to 1 for thedefault height. |

<a name="KeyframeAnimation+fetchRelPosTree"></a>

### keyframeAnimation.fetchRelPosTree(index) ⇒ <code>Array.&lt;number&gt;</code>
Helper function that fetches the tree of relatively positioned images, beginning at the specified index.

**Kind**: instance method of [<code>KeyframeAnimation</code>](#KeyframeAnimation)  
**Returns**: <code>Array.&lt;number&gt;</code> - list of indices that make up the relative image tree.  
**Since**: 1.0.0  
**Version**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | index of root of relative image tree. |

<a name="KeyframeAnimation+convertPosXToAbs"></a>

### keyframeAnimation.convertPosXToAbs(x, positionType, prevAnchors) ⇒ <code>number</code>
Helper function that calculates the absolute positioning of an image based on how it is positioned relative to other images.

**Kind**: instance method of [<code>KeyframeAnimation</code>](#KeyframeAnimation)  
**Returns**: <code>number</code> - absolute x position in animation.  
**Since**: 1.0.0  
**Version**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | x coordinate of sprite. |
| positionType | <code>string</code> | position type of sprite as described in the documentation of the DrawCoords class. |
| prevAnchors | <code>Array.&lt;number&gt;</code> | list of indices of images that have been anchored to in previous recursive function calls. |

<a name="DrawCoords"></a>

## DrawCoords
Helper class used by the KeyframeAnimation parent class. Provides information on how to draw sprites in animation.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sprite | <code>number</code> | Index of sprite in either obj.spriteData or obj.spritelist to draw. |
| x | <code>number</code> | Destination x coordinate of the sprite based on obj.drawData[].positionType. |
| y | <code>number</code> | Destination y coordinate of the sprite based on obj.drawData[].positionType. |
| width | <code>number</code> | Destination width coordinate of the sprite. |
| height | <code>number</code> | Destination height coordinate of the sprite. |
| angle | <code>number</code> | Angle (in radians) at which to draw the sprite. |
| rotationPointX | <code>number</code> | X coordinate of the point of rotation of the sprite based on obj.drawData[].rotationType. |
| rotationPointY | <code>number</code> | Y coordinate of the point of rotation of the sprite based on obj.drawData[].rotationType. |
| positionType | <code>string</code> | Determines how obj.drawData[].x and obj.drawData[].y are interpreted. Can be set to"absolute" or "relativeToXYI". <br> - "absolute" means coordinates are relative to the origin of the animation object. <br>- "relativeToXYI" means coordinates are relative to the position of the sprite at index "I" based on "X" and "Y". <br> - "X" must be either "L", "M", or "R" referring to the "Left", "Middle", or "Right" of the anchor sprite respectively. <br> - "Y" must be either "T", "M", or "B" referring to the "Top", "Middle", or "Bottom" of the anchor sprite respectively. <br> - "I" must be an integer referring to the index of the anchor sprite. |
| rotationType | <code>string</code> | Determines how obj.drawData[].rotationPointX and obj.drawData[].rotationPointY are interpreted. Can be set to "absolute", "relative" or "relativeToXYI". <br> - "absolute" means coordinates are relative to the origin of the animation object. <br> - "relative" means coordinates are relative to the origin of the current sprite. <br> - "relativeToXYI" means coordinates are relative to the position of the sprite at index "I" based on "X" and "Y". <br> - "X" must be either "L", "M", or "R" referring to the "Left", "Middle", or "Right" of the anchor sprite respectively. <br> - "Y" must be either "T", "M", or "B" referring to the "Top", "Middle", or "Bottom" of the anchor sprite respectively. <br> - "I" must be an integer referring to the index of the anchor sprite. |
| alpha | <code>number</code> | Opacity of sprite. Must be a value between 0.0 and 1.0 inclusive. |

<a name="new_DrawCoords_new"></a>

### new DrawCoords(sprite)

| Param | Type | Description |
| --- | --- | --- |
| sprite | <code>Number</code> | index of sprite in spritelist or spritesheet |

<a name="imageCoords"></a>

## imageCoords
Helper class used by the KeyframeAnimation parent class. Provides source coordinates of images in a given spritesheet.

**Kind**: global class  
<a name="new_imageCoords_new"></a>

### new imageCoords(x, y, width, height)

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | Source x coordinate of a sprite in spritesheet. |
| y | <code>number</code> | Source y coordinate of a sprite in spritesheet. |
| width | <code>number</code> | Source width coordinate of a sprite in spritesheet. |
| height | <code>number</code> | Source height coordinate of a sprite in spritesheet. |