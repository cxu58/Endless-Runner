class character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'character',frame);
  
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.jumpSound = scene.sound.add('jump');
        this.fallSound = scene.sound.add('fall');
        this.flySound = scene.sound.add('fly');

        

    }

    init() {
        this.flycount = 0;
        this.jumpcount = 0;
    }

    
    update (){

        this.body.gravity.y = 600;
        //this.body.setCollideWorldBounds(true);

        this.jumpped = false;

        const onFloor = this.body.onFloor();
        if (onFloor){
            this.jumpcount = 0;
            this.flycount = 0;
            this.jumpped = false;
            this.body.velocity.x = 0;
        } else {
            this.jumpped = true;
        }


        if (onFloor) {
            this.x = 100;
        }
        if (Phaser.Input.Keyboard.JustDown(keyZ) && this.jumpcount <= 1) {

            this.body.velocity.y = -500;
            this.jumpcount++;
            //this.flycount ++;
            this.jumpSound.play();
        }

        //add a new fast fall function
        if (Phaser.Input.Keyboard.JustDown(keyX) && this.jumpped == true){
            this.body.velocity.y = 800;
            //this.flycount ++;
            this.fallSound.play();
        }
        
        //fly
        if (Phaser.Input.Keyboard.JustDown(keyC) && this.jumpped == true && this.flycount <= 5){
            this.flySound.play();
            this.body.velocity.y = 0;
            this.flycount ++;
        }
    }
}
