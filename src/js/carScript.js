const canvas = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 900;
let gameSpeed = 4;
const moves = [];
let collision = false;
/* Background images : road and grass*/
const roadBackground = new Image();
roadBackground.src = 'src/images/road.png';
const grassBackground = new Image();
grassBackground.src = 'src/images/greengrass.png';

/* Player Car Image*/
const car1 = new Image();
car1.src = 'src/images/redcar.png';

/*Enemy car Images*/
const car2 = new Image();
car2.src = 'src/images/yellowDown.png';

const car5 = new Image();
car5.src = 'src/images/yellowUp.png';

const car4 = new Image();
car4.src = 'src/images/greenUp.png';

const car3 = new Image();
car3.src = 'src/images/greenDown.png';


let y = 0;

class BackgroundLayer {
    constructor(image, speedModifier, width = 800, height = 2000) {
        this.x = 0;
        this.y = 0;
        this.width = width; //image width
        this.height = height; // image height prechecked and set
        this.y2 = this.height; // as i need to set vertical parallax hence y
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier; // allow to set different speed values to different background image layers
    }

    /**
     * implement the vertical parallax by managing y or height of  background images
     */
    update() {
        if (this.y >= 1800) {
            this.y = -this.height + this.y2 - this.speed + 3;
        } else this.y += this.speed;

        if (this.y2 >= 1800) {
            this.y2 = -this.height + this.y - this.speed + 3;
        } else this.y2 += this.speed;
    }

    /**
     * helps to draw image to canvas
     * @param width
     * @param height
     */
    draw(width = this.width, height = this.height) {
        ctx.drawImage(this.image, this.x, this.y, width, height);
        ctx.drawImage(this.image, this.x, this.y2, width, height);
    }
}

const roadBg = new BackgroundLayer(roadBackground, 1, 700, 2200);
const grassBg = new BackgroundLayer(grassBackground, 0.3, 680);

/*player class*/
class PlayerCars {

    constructor(image, speedModifier, x, y) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 70;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

let blueCar = new PlayerCars(car1, 2, 250, 600);

let greenCarUp = new PlayerCars(car5, 2, 400, 200);
let yellowCarUp = new PlayerCars(car4, 2, 150, 160);
let carx = new PlayerCars(car4, 2, 300, 120);
let cary = new PlayerCars(car5, 2, 200, 750);
let carz = new PlayerCars(car4, 2, 400, 90);
let carq = new PlayerCars(car5, 2, 250, 350); /**/

window.addEventListener('keydown', (e) => {
    moves[e.key] = true;
    console.log(moves)
})
window.addEventListener('keyup', (e) => {
    delete moves[e.key];
})
const enemiesArray = [greenCarUp, yellowCarUp, carx, cary, carz, carq];
const bgArr = [grassBg, roadBg];
const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    bgArr.forEach(bg => {
        bg.update();
        bg.draw();
    });

    /*player car*/
    if (moves['ArrowUp']) {
        blueCar.y -= blueCar.speed;
    }
    if (moves['ArrowRight']) {
        blueCar.x += blueCar.speed;
    }
    if (moves['ArrowLeft']) {
        blueCar.x -= blueCar.speed;
    }
    if (moves['ArrowDown']) {
        blueCar.y += blueCar.speed;
    }

    blueCar.draw();

    yellowCarUp.draw();
    if (yellowCarUp.y <= 160) {
        setInterval(function () {
            indexVariable = ++yellowCarUp.y % 360 + 1; // SET { 1-360 }
        }, 2000);
        //this.x += Math.floor(Math.random() * 10);
    }
    if (yellowCarUp.y >= 800) {
        // this.y += Math.floor(Math.random() * 10);
        setInterval(function () {
            indexVariable = --yellowCarUp.y % 360 + 1; // SET { 1-360 }
        }, 2000);
    }
    if (yellowCarUp.x <= 180) {
        setInterval(function () {
            indexVariable = ++yellowCarUp.x % 360 + 1; // SET { 1-360 }
        }, 2000);
        //this.x += Math.floor(Math.random() * 10);
    }
    if (yellowCarUp.x >= 200) {
        // this.y += Math.floor(Math.random() * 10);
        setInterval(function () {
            indexVariable = --yellowCarUp.x % 360 + 1; // SET { 1-360 }
        }, 2000);
    }


    // yellowCarUp.updateGoUp();
    greenCarUp.draw();
    if (greenCarUp.y <= 220) {
        setInterval(function () {
            indexVariable = ++greenCarUp.y % 360 + 1; // SET { 1-360 }
        }, 2000);
        //this.x += Math.floor(Math.random() * 10);
    }
    if (greenCarUp.y >= 700) {
        // this.y += Math.floor(Math.random() * 10);
        setInterval(function () {
            indexVariable = --greenCarUp.y % 360 + 1; // SET { 1-360 }
        }, 2000);
    }
    //greenCarUp.updateGoUp();
    carx.draw();
    // carx.updateGoUp();
    cary.draw();
    //cary.updateGoUp();
    carz.draw();
    carq.draw();/**/
    collisions();kaboom();
    requestAnimationFrame(animate);
}

animate();

/**
 * if player car collide with other cars
 * */
function collisions() {
    enemiesArray.forEach(enemy => {
        if (blueCar.x < enemy.x + enemy.width &&
            blueCar.x + blueCar.width > enemy.x &&
            blueCar.y < enemy.y + enemy.height &&
            blueCar.y + blueCar.height > enemy.y) {
            blueCar.collision = true;

        }
    })
}
/*
    * replace the image with the collision image
     */
function kaboom(){
    if (blueCar.collision) {
        blueCar.src = "/images/kaboomCar.png";
    }
}