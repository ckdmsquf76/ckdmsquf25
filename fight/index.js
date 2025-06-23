const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor( { position, velocity }){
        this.position = position;
    }
}

// 1p 선언
const player = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
})

console.log(player);