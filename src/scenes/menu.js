class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }
    create (){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '50px',
            //backgroundColor: '#F3B141',
            color: '#551d2d',
            align: 'center',
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
            fixedWidth: 0
        }

        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            //backgroundColor: '#F3B141',
            color: '#551d2d',
            align: 'center',
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
            fixedWidth: 0
        }

        this.tt = this.add.tileSprite(0, 0, 1000, 700, 'tt').setOrigin(0, 0);
        this.add.image(200, 50, 'title').setOrigin(0, 0);
        
        this.add.text(275, 250, 'press z to start', menuConfig).setOrigin(0, 0);

        this.add.text(275, 350, 'press z: jump', textConfig).setOrigin(0, 0);
        this.add.text(275, 450, 'press z while in air: double jump', textConfig).setOrigin(0, 0);
        this.add.text(275, 550, 'press x while in air: fast fall', textConfig).setOrigin(0, 0);
        this.add.text(275, 650, 'press c while in air: short glide', textConfig).setOrigin(0, 0);
       


        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        
    }
    update (){
        this.tt.tilePositionX += 1;
        if (Phaser.Input.Keyboard.JustDown(keyZ)) {
            // possible game settings
            //game.settings = {
              //spaceshipSpeed: 3,
              //gameTimer: 60000    
            //}
            this.sound.play('start');
            this.scene.start('playScene');    
          }
    }
}