/*
 * This is a work in progress project. The purpose of this project was to recreate an existing keyframe animation library that I had created a few years prior.
 * I am remaking this framework to better implement object oriented programming practices. I hope this file gives you a good idea of my programming and 
 * documentation style.
*/


/**
 * 
 * Contains all properties and functions necessary to create a keyframe animation. 
 * 
 * Sprites used in the animation can either be stored as a spritesheet with an accompanying spriteData list; otherwise, they must be stored as a spritelist. 
 * Each sprite is represented by its index in each list. Sprites are drawn onto the canvas in the order that they appear in obj.drawData. It's recommended
 * to use GSAP timelines to manipulate the values in obj.drawData (https://gsap.com/).
 * 
 * @author Nathan Montgomery
 * @version 1.0.0
 * 
 * @requires DrawCoords
 * 
 */
class KeyframeAnimation {

    /**
     * 
     * @param {number[]}       spriteIndices List of indices of images in spritelist or spritesheet. Order of indices determines z-order of images in animation.
     * @param {?Image[]}       spritelist    List of images used in animation. Required if spritesheet is not present.
     * @param {?Image}         spritesheet   Spritesheet containing all images used in animation. Required if spritelist is not present.
     * @param {?imageCoords[]} spriteData    List of coordinates of each image in spritesheet. One entry required for each sprite in spritesheet.
     *                                          Required if spritesheet is present.
     */
    constructor(spriteIndices, spritelist = null, spritesheet = null, spriteData = null) {
        this.drawData = [];
        this.spritelist = spritelist;
        this.spritesheet = spritesheet;
        this.spriteData = spriteData;

        // populate drawData
        for (const index of spriteIndices) {
            this.drawData.push(new DrawCoords(index));
        }

        // init drawData
        if (this.spritelist !== null) {
            for (let i = 0; i < this.drawData.length; i++) {
                this.drawData[i].width = this.spritelist[this.drawData[i].sprite].width;
                this.drawData[i].height = this.spritelist[this.drawData[i].sprite].height;
            }
        } else if (this.spriteData !== null) {
            for (let i = 0; i < this.drawData.length; i++) {
                this.drawData[i].width = this.spriteData[this.drawData[i].sprite].width;
                this.drawData[i].height = this.spriteData[this.drawData[i].sprite].height;
            }
        }

    }

    /**
     * 
     * Reads current state of animation object and draws current frame to the canvas context.
     *
     * @version 1.1.2
     * @since   1.0.0
     * 
     * @param {CanvasRenderingContext2D} ctx                  Context of the canvas the frame should be drawn on.
     * @param {number}                   x                    X coordinate of the origin of the animation object on the canvas.
     * @param {number}                   y                    Y coordinate of the origin of the animation object on the canvas.
     * @param {number}                   [width = 1]          The multiplier of the animation object's width. Defaults to 1 for the default width.
     * @param {number}                   [height = 1]         The multiplier of the animation object's height. Defaults to 1 for the default height.
     * 
     * @returns {undefined}
     * 
     */
    drawKeyFrame(ctx, x, y, width = 1, height = 1) {

        // local vars (whole function)
        let partialNetXs = [];
        let partialNetYs = [];
        let relativePositionReferences = [[]];

        for (let i = 0; i < this.drawData.length; i++) {
            // calculate partial positions of each image separately
            partialNetXs[i] = 0;
            partialNetYs[i] = 0;
            relativePositionReferences[i] = [];

            // only execute if visible
            if (this.drawData[i].alpha > 0) {

                // local vars (loop)
                let positionReferencePlaceholder;
                relativePositionReferences[i] = this.fetchRelPosTree(i);

                // determine x/y coords based off position type for each nested relative
                partialNetXs[i] = this.convertPosXToAbs(this.drawData[i].x, this.drawData[i].positionType);

                if (this.drawData[i].positionType.slice(0, 10) === 'relativeTo') {

                    // image must not be anchored to itself
                    if (parseInt(this.drawData[i].positionType.slice(12)) !== i) {

                        // set partialNetX and partialNetY to the image coords with absolute positioning
                        // temporarily splice image with absolute positioning from the array
                        partialNetYs[i] = this.drawData[relativePositionReferences[i][0]].y
                        positionReferencePlaceholder = relativePositionReferences[i].splice(0, 1);

                        // add remaining relative position references to partialNetX and partialNetY
                        relativePositionReferences[i].forEach((objRef) => {

                            // determine y
                            if (this.drawData[objRef].positionType.slice(11, 12) === 'T') {
                                partialNetYs[i] += this.drawData[objRef].y;
                            } else if (this.drawData[objRef].positionType.slice(11, 12) === 'M') {
                                partialNetYs[i] += (this.drawData[parseInt(this.drawData[objRef].positionType.slice(12))].height / 2) + this.drawData[objRef].y;
                            } else if (this.drawData[i].positionType.slice(11, 12) === 'B') {
                                partialNetYs[i] += this.drawData[parseInt(this.drawData[objRef].positionType.slice(12))].height + this.drawData[objRef].y;
                            } else {
                                console.error(this.constructor.name + ' failed to draw keyframe: invalid relative position anchor at index ' + objRef, this);
                            }
                        });

                        // add back image with absolute positioning
                        relativePositionReferences[i].unshift(positionReferencePlaceholder);
                    }

                } else if (this.drawData[i].positionType === 'absolute') {
                    partialNetYs[i] = this.drawData[i].y;
                } else {
                    console.error(this.constructor.name + ' failed to draw keyframe: invalid positionType at index ' + i, this);
                }
            }
        }

        for (let i = 0; i < this.drawData.length; i++) {
            // calculate rotation point and rotation of each image
            // draw each image

            // only execute if visible
            if (this.drawData[i].alpha > 0) {

                // local vars (loop)
                let netRotationPointX = 0;
                let netRotationPointY = 0;

                // set width and height
                ctx.setTransform(width, 0, 0, height, 0, 0);

                // rotate
                // apply rotation for each reference in relativePositionReferences
                relativePositionReferences[i].forEach((objRef) => {

                    if (this.drawData[objRef].angle % (2 * Math.PI) !== 0) {

                        // determine point of rotation
                        if (this.drawData[objRef].rotationType === 'relative') {
                            //* rotation point is relative to current image's origin 
                            netRotationPointX = partialNetXs[objRef] + (x / width) + this.drawData[objRef].rotationPointX;
                            netRotationPointY = partialNetYs[objRef] + (y / height) + this.drawData[objRef].rotationPointY;
                        } else if (this.drawData[objRef].rotationType.slice(0, 10) === 'relativeTo') {

                            // determine X
                            if (this.drawData[objRef].rotationType.slice(10, 11) === 'L') {
                                netRotationPointX = partialNetXs[parseInt(this.drawData[objRef].rotationType.slice(12))] + (x / width) + this.drawData[objRef].rotationPointX;
                            } else if (this.drawData[objRef].rotationType.slice(10, 11) === 'M') {
                                netRotationPointX = partialNetXs[parseInt(this.drawData[objRef].rotationType.slice(12))] + (this.drawData[parseInt(this.drawData[objRef].rotationType.slice(12))].width / 2) + (x / width) + this.drawData[objRef].rotationPointX;
                            } else if (this.drawData[objRef].rotationType.slice(10, 11) === 'R') {
                                netRotationPointX = partialNetXs[parseInt(this.drawData[objRef].rotationType.slice(12))] + this.drawData[parseInt(this.drawData[objRef].rotationType.slice(12))].width + (x / width) + this.drawData[objRef].rotationPointX;
                            } else {
                                console.error(this.constructor.name + ' failed to draw keyframe: invalid relative angle anchor at index ' + objRef, this);
                            }

                            // determine Y
                            if (this.drawData[objRef].rotationType.slice(11, 12) === 'T') {
                                netRotationPointY = partialNetYs[parseInt(this.drawData[objRef].rotationType.slice(12))] + (y / height) + this.drawData[objRef].rotationPointY;
                            } else if (this.drawData[objRef].rotationType.slice(11, 12) === 'M') {
                                netRotationPointY = partialNetYs[parseInt(this.drawData[objRef].rotationType.slice(12))] + (this.drawData[parseInt(this.drawData[objRef].rotationType.slice(12))].height / 2) + (y / height) + this.drawData[objRef].rotationPointY;
                            } else if (this.drawData[objRef].rotationType.slice(11, 12) === 'B') {
                                netRotationPointY = partialNetYs[parseInt(this.drawData[objRef].rotationType.slice(12))] + this.drawData[parseInt(this.drawData[objRef].rotationType.slice(12))].height + (y / height) + this.drawData[objRef].rotationPointY;
                            } else {
                                console.error(this.constructor.name + ' failed to draw keyframe: invalid relative angle anchor at index ' + objRef, this);
                            }

                        } else if (this.drawData[objRef].rotationType === 'absolute') {
                            netRotationPointX = (x / width) + this.drawData[objRef].rotationPointX;
                            netRotationPointY = (y / height) + this.drawData[objRef].rotationPointY;
                        } else {
                            console.error(this.constructor.name + ' failed to draw keyframe: invalid rotationType at index ' + objRef, this);
                        }

                        // rotate
                        ctx.translate(netRotationPointX, netRotationPointY);
                        ctx.rotate(this.drawData[objRef].angle);
                        ctx.translate(-netRotationPointX, -netRotationPointY)
                    }
                });



                // draw
                // set globalAlpha
                ctx.globalAlpha = this.drawData[i].alpha;

                // draw keyframe with x/y coords determined above
                if (this.spritelist) {
                    ctx.drawImage(
                        this.spritelist[this.drawData[i].sprite],
                        partialNetXs[i] + (x / width),
                        partialNetYs[i] + (y / height),
                        this.drawData[i].width,
                        this.drawData[i].height
                    )
                } else if (this.spritesheet) {
                    ctx.drawImage(
                        this.spritesheet,
                        this.spriteData[this.drawData[i].sprite].x,
                        this.spriteData[this.drawData[i].sprite].y,
                        this.spriteData[this.drawData[i].sprite].width,
                        this.spriteData[this.drawData[i].sprite].height,
                        partialNetXs[i] + (x / width),
                        partialNetYs[i] + (y / height),
                        this.drawData[i].width,
                        this.drawData[i].height
                    );
                } else {
                    console.error(this.constructor.name + ' failed to draw keyframe: No spritesheet or spritelist found', this)
                }

                // restore context
                ctx.globalAlpha = 1;
                ctx.resetTransform();
            }
        }
    }

    /**
     * Helper function that fetches the tree of relatively positioned images, beginning at the specified index.
     * 
     * @version 1.0.0
     * @since   1.0.0
     * 
     * @param {number} index index of root of relative image tree.
     * @returns {number[]} list of indices that make up the relative image tree.
     */
    fetchRelPosTree(index) {
        // local vars
        let foundRelativePositionReference = true;
        let relativePositionReferences = [];

        // determine nested relative coords and store in relativePositionReferences
        relativePositionReferences.unshift(index);
        while (foundRelativePositionReference) {
            if (this.drawData[relativePositionReferences[0]].positionType.slice(0, 10) === 'relativeTo') {

                // image must not be anchored to itself
                if (!relativePositionReferences.includes(parseInt(this.drawData[relativePositionReferences[0]].positionType.slice(12)))) {
                    relativePositionReferences.unshift(parseInt(this.drawData[relativePositionReferences[0]].positionType.slice(12)));
                } else {
                    console.error(this.constructor.name + ' failed to fetch relative image tree: image cannot be anchored to itself -- index ' + index, this);
                    return [];
                }
            } else {
                foundRelativePositionReference = false;
            }
        }

        return relativePositionReferences;
    }

    parseRelXOffset(positionType) {

    }
 
    /**
     * Helper function that calculates the absolute positioning of an image based on how it is positioned relative to other images.
     * 
     * @version 1.0.0
     * @since   1.0.0
     * 
     * @param {number}    x            x coordinate of sprite.
     * @param {string}    positionType position type of sprite as described in the documentation of the DrawCoords class.
     * @param {?number[]} prevAnchors  list of indices of images that have been anchored to in previous recursive function calls.
     * 
     * @returns {number} absolute x position in animation.
     * 
     */
    convertPosXToAbs(x, positionType, prevAnchors = []) {
        //! TODO: CHECK FOR IMAGE ANCHORED TO ITSELF
        //* Idea: pass only current id and list of previous id anchors. recursively keep track of id anchors and check with each iteration.

        if (positionType.slice(0, 10) === 'relativeTo') {
            let nextIndex = parseInt(positionType.slice(12));
            let offset = -1;

            // check for image anchored to itself
            prevAnchors.push()

            // calculate next offset
            switch (positionType.slice(10, 11)) {
                case 'L':
                    offset = x;
                    break;
                case 'M':
                    offset = (this.drawData[nextIndex].width / 2) + x;
                    break;
                case 'R':
                    offset = this.drawData[nextIndex].width + x;
                    break;
                default:
                    console.error(this.constructor.name + ' failed to convert x coordinate to an absolute coordinate: invalid relative position anchor', positionType);
            }

            return offset + this.convertPosXToAbs(this.drawData[nextIndex].x, this.drawData[nextIndex].positionType);

        } else if (positionType.slice(0, 10) === 'absolute') {
            return x;
        }

        // invalid position type
        console.error(this.constructor.name + ' failed to draw keyframe: invalid positionType', positionType);
        return -1;
    }


    convertYPosToAbs(y, positionType) {
        //! TODO: WRITE THIS FUNCTION
        return y;
    }
}








/**
 * Helper class used by the KeyframeAnimation parent class. Provides information on how to draw sprites in animation.
 * 
 * @property {number} sprite         Index of sprite in either obj.spriteData or obj.spritelist to draw.
 * @property {number} x              Destination x coordinate of the sprite based on obj.drawData[].positionType.
 * @property {number} y              Destination y coordinate of the sprite based on obj.drawData[].positionType.
 * @property {number} width          Destination width coordinate of the sprite.
 * @property {number} height         Destination height coordinate of the sprite.
 * @property {number} angle          Angle (in radians) at which to draw the sprite.
 * @property {number} rotationPointX X coordinate of the point of rotation of the sprite based on obj.drawData[].rotationType.
 * @property {number} rotationPointY Y coordinate of the point of rotation of the sprite based on obj.drawData[].rotationType.
 * @property {string} positionType   Determines how obj.drawData[].x and obj.drawData[].y are interpreted. Can be set to "absolute" or 
 *                                   "relativeToXYI".
 *                                    - "absolute" means coordinates are relative to the origin of the animation object.
 *                                    - "relativeToXYI" means coordinates are relative to the position of the sprite at index "I" based on 
 *                                      "X" and "Y".
 *                                       - "X" must be either "L", "M", or "R" referring to the "Left", "Middle", or "Right" of the anchor 
 *                                         sprite respectively.
 *                                       - "Y" must be either "T", "M", or "B" referring to the "Top", "Middle", or "Bottom" of the anchor 
 *                                         sprite respectively.
 *                                       - "I" must be an integer referring to the index of the anchor sprite.
 * @property {string} rotationType   Determines how obj.drawData[].rotationPointX and obj.drawData[].rotationPointY are interpreted. Can 
 *                                   be set to "absolute", "relative" or "relativeToXYI".
 *                                   - "absolute" means coordinates are relative to the origin of the animation object.
 *                                   - "relative" means coordinates are relative to the origin of the current sprite.
 *                                   - "relativeToXYI" means coordinates are relative to the position of the sprite at index "I" based on 
 *                                     "X" and "Y".
 *                                      - "X" must be either "L", "M", or "R" referring to the "Left", "Middle", or "Right" of the anchor 
 *                                        sprite respectively.
 *                                      - "Y" must be either "T", "M", or "B" referring to the "Top", "Middle", or "Bottom" of the anchor 
 *                                        sprite respectively.
 *                                      - "I" must be an integer referring to the index of the anchor sprite.
 * @property {number} alpha          Opacity of sprite. Must be a value between 0.0 and 1.0 inclusive.
 * 
 */
class DrawCoords {
    /**
     * 
     * @param {Number} sprite index of sprite in spritelist or spritesheet
     */
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








/**
 * Helper class used by the KeyframeAnimation parent class. Provides source coordinates of images in a given spritesheet.
 * 
 */
class imageCoords {
    /**
     * 
     * @param {number} x      Source x coordinate of a sprite in spritesheet.
     * @param {number} y      Source y coordinate of a sprite in spritesheet.
     * @param {number} width  Source width coordinate of a sprite in spritesheet.
     * @param {number} height Source height coordinate of a sprite in spritesheet.
     */
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}