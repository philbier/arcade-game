const game = {
    wins: 0,
    collisions: 0
}

const globalConst = {
    xOffset: 101,
    yOffset: 83,
} 

const playerConst = {
    height: 83,
    width: 101,
    xStart: 202,
    yStart: 380
}

const enemyConst = {
    height: 83,
    width: 101,
    xStart: -101
}

let stop = false;

//Enemy class
class Enemy {
    constructor(intRow = 1, speed = 1){
        this.width = enemyConst.width;
        this.height = enemyConst.height;
        this.sprite = 'images/enemy-bug.png';
        this.x = enemyConst.xStart;
        this.speed = speed;
        intRow==1 ? this.y = 48 : (intRow==2 ? this.y = 131 : (intRow==3 ? this.y = 214 : false))
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
       
        if (this.x + globalConst.xOffset <= 606) {
            this.x += globalConst.xOffset*dt*this.speed;
        } else {
            this.x = enemyConst.xStart;
        }   

        this.handleCollision();
        
    }

    handleCollision(){
        /*As the picture has some transparent space around it the
        "gap" is used to as correction parameter to allow collision only
        when enemy and player images really touch each other
        */
        const gap = 23;
        if(player.x < this.x + this.width - gap &&
            this.x < player.x + player.width - gap &&
            player.y < this.y + this.height &&
            this.y < player.y + player.height ) {
            player.reset();
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

// Now write your own player class
class Player {
    constructor(playerImg = 'images/char-boy.png'){
        this.width = playerConst.width;
        this.height = playerConst.height;
        this.sprite = playerImg;
        this.x = 202;
        this.y = 380;
    }

    update() {

    }

    win() {
        game.wins += 1;
        this.reset();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset(){
        this.y = playerConst.yStart;
    }

    handleInput(input) {
        const xOff = globalConst.xOffset;
        const yOff = globalConst.yOffset;
        
        //check for key and whether caracter is off canvas
        if (input == 'left' && this.x - xOff >= 0) {
            this.x -= xOff;
        } else if (input == 'right' && this.x + xOff <= 404) {
            this.x += xOff;
        } else if (input == 'up') {

            if (this.y - yOff >= 48) {
                this.y -= yOff;
            } else {
                this.win();
            }
            
        } else if (input == 'down' && this.y + yOff <= 380) {
            this.y += yOff;
        }
        
    }

}

const enemy1 = new Enemy(1, (Math.random() * 1) + 1);
const enemy2 = new Enemy(2, (Math.random() * 1) + 1);
const enemy3 = new Enemy(3, (Math.random() * 1) + 1);
const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
