# keyframe-animation-lib

This keyframe animation library is for creating and rendering keyframe animations on the HTML5 Canvas. It is recommended that GSAP timelines are used in the construction of animations. The original library was created in 2023. In 2025, I began revising the code using my improved skill set. The revised code is intentionally left in an unfinished state, and can be found in the "modernization" branch. No generative AI was used to write any of the library's code or documentation. Some AI was used to review the other documents in this repository. 

## Asset Notice

Plants vs. Zombies artwork used in the demonstration is property of Electronic Arts Inc./PopCap Games. These assets are included solely to demonstrate the animation system. The animation and animation system were created by Nathan Montgomery. This project is not endorsed by or affiliated with EA or its licensors.

## [Live Demo](https://keyframe-animation-lib.vercel.app/demo/)

This demo showcases an animation made from scratch via the keyframe animation library. All images used in the animation belong to Electronic Arts Inc., as stated in the Asset Notice above.

## Highlights

 - Designed and implemented an HTML5 Canvas animation library from scratch.
 - Created thorough, readable documentation with jsdoc.
 - Revisited the original design years later and began a class-based architectural redesign.

## Modernization

The "modernization" branch showcases the beginnings of a complete overhaul of the library. It is preserved in an unfinished state to document how my approach to software architecture evolved over time.

Modernization highlights:

 - Organized code into reusable, easy to understand classes.
 - Developed a variety of helper functions to reduce repeated code and improve readability.
 - Contained drawKeyframe within each animation object rather than passing the object into a global function.

Modernization remaining todo:

 - Complete remaining helper functions
 - Check for infinite loops
 - Condense repeated logic for the summation of rotation references into a single reusable helper function.

## Setup

1. Download `src\keyframe-animation-lib.js` and link the library in an HTML file of your choosing, or add the following script tag to your HTML file:

    ```html
    <script src="https://keyframe-animation-lib.vercel.app/src/keyframe-animation-lib.js"></script>
    ```

2. (Optional) Add the GSAP library to your project. It is recommended to use GSAP timelines to program the animations themselves. You can find the GSAP docs [here](https://gsap.com/docs/v3/Installation).

3. Create an animation object. Animation objects store the current images, coordinates, width/height, rotation, and opacity of each image in the animation. The animation object itself does not store how these images move through time. Each animation object must have the required properties as listed in the [library documentation](./doc/library-jsdoc.md).

4. Create the animation timeline. This is the timeline that changes the values of the animation object in real time, thus creating the animation. You can use any system you'd like to do this, but GSAP timelines are recommended.

5. To draw the current frame of an animation object to the HTML5 canvas, use the following function call:

    ```javascript
    drawKeyFrame(ctx, animation, x, y);
    ```