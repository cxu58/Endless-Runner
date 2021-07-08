let config = {
    type: Phaser.AUTO,
    height: 700,
    width: 1000,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    //set up physics enginee built in phaser
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
    
        }
    },
    scene: [ Load, Menu, Play, GameOver ]
}
var game = new Phaser.Game(config);
//define key varibles
let keyZ, keyX, keyC;
