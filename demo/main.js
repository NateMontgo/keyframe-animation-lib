const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let rows = 3;
let xOffset = 500;
let yOffset = 100;
let cellWidth = 150;
let cellHeight = 100;

function main() {
    blover.blow.play();
    blover.test.pause();
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawKeyFrame(c, blover, 100, 100, 2, 2);

    for (let i = 0; i < bloverSprites.length; i++) {
        c.drawImage(bloverSprites[i], xOffset + (i % 3) * cellWidth, yOffset + Math.floor(i / 3) * cellHeight, bloverSprites[i].width * 2, bloverSprites[i].height * 2);
    }
}
