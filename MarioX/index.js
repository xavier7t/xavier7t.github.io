// 1 - Project Setup Start
// 1.1 select the canvas element in the html doc
const canvas = document.querySelector('canvas');
// 1.2 access context
const context = canvas.getContext('2d');
// console.log(context);
// 1 - Project Setup End

// 2- Character Creation Start

//2.0 Preparation - change canvas width to window width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// (without this step, an element with both H&W as 100 wont look like a square)
const gravity = .7; //3.5 acceleration of gravity
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
        //3 - Gravity for the character Start
        //3.1 - add a velocity field
        this.velocity = {
            x:0,
            y:0
        }
    }
    draw() {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    //3.2 - create a new function to enable vertical gravity by adding velocity to the position-y
    update() {
        this.draw();
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }
        //4.2.0 enable horizontal movement
        this.position.x += this.velocity.x;
    }
}
//5 - Platform
//5.1 create a platform class
class Platform {
    constructor() {
        this.position = {
            x:210,
            y:140
        }
        this.width = 210;
        this.height = 21;
    }
    draw() {
        context.fillStyle = 'blue';
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//4.2.0 Create a const object keys to define the status of direction keys
const keys = {
    right:{
        pressed: false
    },
    left:{
        pressed: false
    }
}
//2.2 Implement the character class
const character = new Character();
// character.draw();

//5.2 create a new platform
const platform = new Platform();

//3.4 call the update function instead of draw to enable vertical movement
// animate(); //3.3 function defined at the bottom
//3 - Gravity for the character Start End
// 2- Character Creation End

//3.3 define a function for gravity animation
function animate() {
    requestAnimationFrame(animate);
    // console.log("test function animate()");
    //make the square to drop instead of drawing a vertical line
    context.clearRect(0,0, canvas.width, canvas.height);
    character.update();
    //5.3 draw the platform created in 5.2
    platform.draw();
    //4.2.3 change x velocity when pressed A/D keys
    // if (keys.right.pressed) {
    //     character.velocity.x = 5;
    // } else if (keys.left.pressed) {
    //     character.velocity.x = -5;
    // } else {
    //     character.velocity.x = 0;
    // }
    if (keys.right.pressed) {
        character.velocity.x = 5
    } else if (keys.left.pressed) {
        character.velocity.x = -5
    } else character.velocity.x *= 0.9

    //5.4 determine if the character is above a platform
    if ((character.position.y + character.height <= platform.position.y)
        && (character.position.y + character.height + character.velocity.y >= platform.position.y) //when the character is above the platform
        &&(character.position.x + character.width >= platform.position.x)
        &&(character.position.x <= platform.position.x + platform.width)){ //AND when the character is not on the right or left side of the platform
        character.velocity.y = 0;
    }
}

animate();
//4- movement for the character - Start
//4.1 Add the event listener to capture key presses
// window.addEventListener('keydown', (event) => {
//     console.log(event)
// });
//we need the properties within the event instead of the event element itself
//we can also leave about "window."
addEventListener('keydown', ({ keyCode }) => {
    // console.log(keyCode); //console log will show the key codes of keys we pressed

    //4.2.1 use switch statements to cope with key down cases (key presses)
    switch (keyCode) {
        case 65:
            // console.log('left');
            keys.left.pressed = true;
            break;
        case 83:
            // console.log('down');
            break;
        case 68:
            // console.log('right');
            keys.right.pressed = true;
            break;
        case 87:
            // console.log('up');
            character.velocity.y -= 10; //going up for 10 units
            break;
    }
    // console.log(keys.left.pressed);
    // console.log(keys.right.pressed);
})
//4.2.2 use another listen with switch statements to capture and cope with key up cases (key released)
addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            // console.log('left');
            keys.left.pressed = false;
            break;
        case 83:
            // console.log('down');
            break;
        case 68:
            // console.log('right');
            keys.right.pressed = false;
            break;
        case 87:
            // console.log('up');
            character.velocity.y -= 10; //going up for 10 units
            break;
    }
    // console.log(keys.left.pressed);
    // console.log(keys.right.pressed);
})