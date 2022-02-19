// 1 - Project Setup Start
// 1.1 select the canvas element in the html doc
const canvas = document.querySelector('canvas');
// 1.2 access context
const context = canvas.getContext('2d');
console.log(context);
// 1 - Project Setup End

// 2- Character Creation Start

//2.0 Preparation - change canvas width to window width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// (without this step, an element with both H&W as 100 wont look like a square)

//2.1 Define the character class
class Character {
    constructor() {
        //set fields in the constructors
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 30;
        this.height = 30;
    }
    draw() {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

//2.2 Implement the character class
const character = new Character();
character.draw();
// 2- Character Creation End