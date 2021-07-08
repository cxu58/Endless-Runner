class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }
    preload (){
        //this.load.image('character', './assets/character.png');
        this.load.image('ground', './assets/ground.png');
        this.load.image('platform', './assets/platform.png');
        this.load.image('title', './assets/title2.png');
        this.load.image('tt', './assets/tt.png');
        this.load.image('over', './assets/GameOver.png');
        
       
        this.load.image('bg1', './assets/bg1.png'); 
        this.load.image('bg2', './assets/bg2.png'); 
        this.load.image('bg3', './assets/bg3.png'); 

        this.load.audio('jump', './assets/jump_er.wav');
        this.load.audio('start', './assets/press_start_er.wav');
        this.load.audio('hit', './assets/hit_er.wav');
        this.load.audio('fall', './assets/fall_er.wav');
        this.load.audio('fly', './assets/bor.wav');
        this.load.audio('bgm', './assets/bgm.mp3');


        this.load.spritesheet('terrain', './assets/terrain.png', {
            frameWidth: 100,
            frameHeight: 50
        });
        this.load.spritesheet('character', './assets/character.png', {
            frameWidth: 100,
            frameHeight: 100,
            startFrame: 0,
            endFrame: 3
        });
    }
    create (){
        this.scene.start('menuScene');
    }
}