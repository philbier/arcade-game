const game = {
    wins: 0,
    collisions: 0,
    startDate: new Date()
}

const winNode = document.getElementById('wins');
const collisionsNode = document.getElementById('collisions');
const timer = document.getElementById("timer");

//Enemy class
class Enemy {
    constructor(intRow = 1, speed = 1){
        this.width = 101;
        this.height = 83;
        this.sprite = 'images/enemy-bug.png';
        this.origX = -101;
        this.x = this.origX;
        this.speed = speed;
        this.xOffset = 
        intRow==1 ? this.y = 48 : (intRow==2 ? this.y = 131 : (intRow==3 ? this.y = 214 : false))
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
       
        if (this.x + this.width <= 606) {
            this.x += this.width*dt*this.speed;
        } else {
            this.x = this.origX;
        }   

        this.handleCollision();
        collisionsNode.textContent = `Collisions: ${game.collisions}`;
        
    }

    handleCollision(){
        /*As the picture has some transparent space around it, the
        "gap" is used to as correction parameter to allow collision only
        when enemy and player images really touch each other
        */
        const gap = 23;
        if(player.x < this.x + this.width - gap &&
            this.x < player.x + player.width - gap &&
            player.y < this.y + this.height &&
            this.y < player.y + player.height ) {
                game.collisions += 1;
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
        this.width = 101;
        this.height = 83;
        this.sprite = playerImg;
        this.origX = 202;
        this.origY = 380;
        this.x = this.origX;
        this.y = this.origY;
        this.xOffset = this.width;
        
    }

    update() {
        winNode.textContent = `Wins: ${game.wins}`
    }

    win() {
        game.wins += 1;
        this.reset();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset(){
        this.y = this.origY;
    }

    handleInput(input) {
        //check for key and whether caracter is off canvas
        if (input == 'left' && this.x - this.width >= 0) {
            this.x -= this.width;
        } else if (input == 'right' && this.x + this.width <= 404) {
            this.x += this.width;
        } else if (input == 'up') {

            if (this.y - this.height >= 48) {
                this.y -= this.height;
            } else {
                this.win();
            }
            
        } else if (input == 'down' && this.y + this.height <= 380) {
            this.y += this.height;
        }
        
    }

}

const enemy1 = new Enemy(1, (Math.random() * 2) + 1);
const enemy2 = new Enemy(2, (Math.random() * 3) + 1);
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

//get playing time formatted in minutes and seconds
function getPlayTime(startDate,endDate) {
    let totalSec = Math.round((endDate.getTime() - startDate.getTime())/1000,0);
    let minutes = parseInt(totalSec/60);
    let seconds = totalSec % 60;
    return `Playing time: ${minutes}min ${seconds}sec`
}

//Interval for playing time
setInterval(() => {
    timer.textContent = getPlayTime(game.startDate, new Date());
},1000);