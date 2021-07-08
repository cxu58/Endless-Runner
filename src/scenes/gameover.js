class GameOver extends Phaser.Scene {
    constructor() {
        super('gameoverScene');
    }
    create (){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '50px',
            //backgroundColor: '#F3B141',
            color: '#fff77c',
            align: 'center',
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
            fixedWidth: 0
        }
        this.add.image(220, 100, 'over').setOrigin(0, 0);
        this.add.text(220, 350, 'press z to restart', menuConfig).setOrigin(0, 0);
        this.add.text(220, 450, 'press x to menu', menuConfig).setOrigin(0, 0);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        
    }
    update (){
        if (Phaser.Input.Keyboard.JustDown(keyZ)) {
            this.sound.play('start');
            this.scene.start('playScene');    
          }
        if (Phaser.Input.Keyboard.JustDown(keyX)) {
            this.sound.play('start');
            this.scene.start('menuScene');    
        }
    }
}