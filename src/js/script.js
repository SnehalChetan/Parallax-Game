const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 600;
const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 600;
let gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'src/images/11_background.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = 'src/images/03_distant_trees.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = 'src/images/08_clouds.png';

const backgroundLayer4 = new Image();
backgroundLayer4.src = 'src/images/02_trees and bushes.png';

const backgroundLayer5 = new Image();
backgroundLayer5.src = 'src/images/01_ground.png';

const backgroundLayer6 = new Image();
backgroundLayer6.src = 'src/images/bird.png';



const dogRun = new Image();
dogRun.src = 'src/images/dogRun.png';
console.log(Math.round(CANVAS_HEIGHT * IMAGE_WIDTH / IMAGE_HEIGHT));

let x = 0;

class Layer {
    constructor(backgroundLayer4 , speedModifier) {
        this.x = 0;
        this.y = 0;
        this.image = backgroundLayer4;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
        this.width = Math.round(CANVAS_HEIGHT * IMAGE_WIDTH / IMAGE_HEIGHT);
        // this.width = 500;
        this.height = CANVAS_HEIGHT;
        this.x2 = this.width;
    }
    update(){
        if (this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= - this.width){
            this.x2 = this.width + this.x - this.speed;
        }
        this.x -= this.speed;
        this.x2 -= this.speed;
    }
    draw(){
        ctx.drawImage(this.image , this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image , this.x2, this.y, this.width, this.height);
    }
}
const layer1 = new Layer(backgroundLayer1 , 0.1);
const layer2 = new Layer(backgroundLayer2 , 0.5);
const layer3 = new Layer(backgroundLayer3 , 0.5);
const layer4 = new Layer(backgroundLayer4 , 0.2);
const layer5 = new Layer(backgroundLayer5 , 0.4);
const layer6 = new Layer(backgroundLayer6 , 0.3);

const layerArr = [layer1,layer2,layer3,layer4,layer5,];

let playerSw = 150;
let playerSx = 0;
let i = 0;

const main = () => {
    ctx.clearRect(0 , 0 , CANVAS_WIDTH, CANVAS_HEIGHT);
    layerArr.forEach(layer =>{
        layer.update();
        layer.draw();
    });
    ctx.drawImage(dogRun, playerSx , 0 , 150 , 150 , 0 , 300 , 200, 250);
    if (i%5 == 4){
        playerSx+=playerSw;
        i=0;
    }
    if (playerSx> 1050){
        playerSx = 0;
    }
    i++;
    requestAnimationFrame(main);
}

main();