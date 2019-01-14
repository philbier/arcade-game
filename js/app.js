const game = {
    wins: 0,
    collisions: 0,
    playingTime: 30
}

/*html nodes that represent parts of a scoring panel.
their textContent-property will be used in order to display game statistics*/
const winNode = document.getElementById('wins');
const collisionsNode = document.getElementById('collisions');
const timer = document.getElementById('timer');
const canvas = document.querySelector('canvas');
const endHeading = document.getElementById("endHeading")
const endPanel = document.getElementById("endScreen");
const endText = document.getElementById("endText");
const endTime = document.getElementById("endTime");

/*Enemy class.
represents the class for enemy objects that will reset the player when they collide with each other*/
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

    /* Update the enemy's position, required method for game.
    dt-parameter needs to be multplied with any movement in
    order to ensure the game runs at same speed for all computers*/
    update(dt) {
        /*  */
        if (this.x + this.width <= canvas.width) {
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

// Player Class
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

// This listens for key presses and sends the keys to your
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
    game.playingTime = game.playingTime - 1; 
    return `Remaining time: ${game.playingTime}sec`
}

//Interval for playing time
setInterval(() => {
    if (game.playingTime > 0) {
        timer.textContent = getPlayTime(game.startDate, new Date());
    } else {
        showEndScreen('Congratulations');
    }
},1000);

//shows a winning panel with game statistics
function showEndScreen(heading) {
    endPanel.style.display = 'flex';
    endHeading.textContent = `${heading}`;
    endText.textContent = `You have ${game.wins} wins and ${game.collisions} collisions!
    
                            Refresh to play again.`
}



/***** Initialization of the Game *****/
const enemy1 = new Enemy(1, (Math.random() * 2) + 1);
const enemy2 = new Enemy(2, (Math.random() * 3) + 1);
const enemy3 = new Enemy(3, (Math.random() * 1) + 1);
const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player();