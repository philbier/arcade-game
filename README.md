# Classic Arcade Game Clone Project

In this arcade game the player needs to move his character to the water without colliding with enemies represented as insects. The character can be moved using the arrow keys. When reaching the water, one win is appointed to the player, which can be seen in a scoring panel and the characters is reset to a starting position. In case of a collision with an enemy, the player also gets reset to the starting position.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Instructions](#instructions)
- [Authors](#authors)
- [License](#license)


## Prerequisites

This game works best and was tested in the following browsers: 

- Chrome V.71
- Microsoft Edge V.42

The game should also work, but was not tested in the following browsers:

- Firefox 64

Not supported is:

- Internet Explorer

## Instructions
### How to run the game

When the **index.html** is run in the browser the game will immediately start with predefined settings. These settings include a game time of 30sec. This playing time can be changed by ajusting the property *playingTime* of the object *game*, which can be found at the top of **app.js**:

```
const game = {
    wins: 0,
    collisions: 0,
    playingTime: 30
}
```

By default three enemies - one per row - are instantiated with random speeds. The code can be found in the bottom of **app.js**:
```
const enemy1 = new Enemy(1, (Math.random() * 2) + 1);
const enemy2 = new Enemy(2, (Math.random() * 3) + 1);
const enemy3 = new Enemy(3, (Math.random() * 1) + 1);

const allEnemies = [enemy1, enemy2, enemy3];
```
*Enemy* represents a class with two paramaters. The first one represents the line the enemy shall be running in, the second parameter is the speed (currently set to a random number). **IMPORTANT:** All enemy objects must be collected in the array *allEnemies* in order for the engine to run properly.

Ultimately a player object has to be created using the *Player* class, which will start the game. This line of code should **not** be changed.
```
const player = new Player();
```




## Authors
* **Phillip Biermann**
* **Udacity** - *Initial work* 


## License
This project is licensed under the MIT License - see the [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT) file for details.


