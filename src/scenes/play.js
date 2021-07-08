var terrainnumber = 1;
var trackscore;
var cursors;

class Play extends Phaser.Scene {
    constructor() {
        super('playScene');

    }
    create (){

        this.terraingroup = null;
        this.autoterrainheight = [50, 390];
        this.terraindistance = [300, 500];
        this.realdistance = 0;

        this.terrainSpeed = -600;
        this.platformSpeed = -400;
        
        //var ground = this.physics.add.sprite(0,500,'ground').setOrigin(0, 0);
        this.bg1 = this.add.tileSprite(0, 0, 1000, 700, 'bg1').setOrigin(0, 0);
        this.bg2 = this.add.tileSprite(0, 0, 1000, 700, 'bg2').setOrigin(0, 0);
        this.bg3 = this.add.tileSprite(0, 0, 1000, 700, 'bg3').setOrigin(0, 0);


        this.character = new character(this, 100, 100, 0).setOrigin(0, 0); // (100, 400)
        
        //ground.body.immovable = true;
        //this.physics.add.collider(this.character, ground);
        
        //set keys
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        //create platform group
        this.platformGroup = this.add.group({
            //once the platform removed, add it to pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });
        //platform group done

        //create pool
        this.platformPool = this.add.group({
            //if a platform is removed from pool, add it to the active group
            //removeCallback: call a function when an element is removed from list
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });
        //create pool done

        this.addPlatform(game.config.width, game.config.width/2);

        //create animation for terrain
        this.anims.create({
            key: "skull",
            frames: this.anims.generateFrameNumbers("terrain"),
            frameRate: 8,
            repeat: -1
        });
        
        
        //create animation for character
        this.anims.create({
            key: "character",
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3, first: 0}),
            frameRate: 5,
            repeat: -1
        });
        this.character.anims.play("character");

        //create terrain
        this.createTerrain(); 
        //create terrain done
        
        //create collider for terrain
        this.createCollider();

        //set difficulties
        this.difficultyTimer = this.time.addEvent({
            delay: 5000,
            callback: this.speedup,
            callbackScope: this,
            loop: true
        });
        
        //create and keep track of score
        this.createScore();

        this.scoreTimer = this.time.addEvent({
            delay: 100,
            callback: this.increaseScore,
            callbackScope: this,
            loop: true
        });


        //create bgm
        this.bgm = this.sound.add('bgm');
        var bgmconfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.bgm.play (bgmconfig)


    }
    //define a function to generate platform
    addPlatform(platformWidth, posX){
        //define variable platform
        let platform;
        if (this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            // search info foe active and visible
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove (platform);
        }
        else {
            platform = this.physics.add.sprite(posX, 600, "ground");
            platform.setImmovable(true);
            platform.setVelocityX(this.platformSpeed); //platformSpeed
            this.platformGroup.add (platform);
        }
        platform.displayWidth = platformWidth;
        //define the width of next platform
        this.nextplatformWidth = Phaser.Math.Between(100, 500);
    }
    //  end of addPlatform function

    createTerrain() {
        this.terraingroup = this.physics.add.group();

        for (let i = 0; i < terrainnumber; i++){
            const terrain = this.terraingroup.create(1000, 50, 'terrain'); //this.add.sprite this.terraingroup.create
            terrain.setImmovable(true);
            terrain.setOrigin(0, 0);
            
            
    
            this.putbarrier(terrain);
        }
        //add animation
        this.terraingroup.getChildren().forEach(function(terrain){
            terrain.anims.play('skull');
        });

        this.terraingroup.setVelocityX(this.terrainSpeed); // terrainSpeed
    }

    createCollider() {
        this.physics.add.collider(this.character, this.terraingroup, this.gameover, null, this);
        this.physics.add.collider(this.character, this.ground);
        this.physics.add.collider(this.character, this.platformGroup);
    }

    getrightmostterrain() {
        let rightmostX = 0;
    
        this.terraingroup.getChildren().forEach(function(terrain){
            rightmostX = Math.max(terrain.x, rightmostX);
        })
        return rightmostX;
    }

    putbarrier(terrain) {
        const rightmostX = this.getrightmostterrain();
        const realdistance = Phaser.Math.Between(this.terraindistance[0], this.terraindistance[1]);
        const getterrainheight = Phaser.Math.Between(this.autoterrainheight[0], this.autoterrainheight[1]);
        terrain.x = rightmostX + realdistance + 1500;
        terrain.y = getterrainheight;
    }

    recycleterrains() {
        const pushterrains = [];
        this.terraingroup.getChildren().forEach(terrain =>{
            if (terrain.getBounds().right <= 0){
                pushterrains.push(terrain);
                if (pushterrains.length === 1){
                    this.putbarrier(...pushterrains);
                }
            }
        })
    }
    //gameover 
    gameover() {
        this.sound.play('hit');
        this.bgm.stop();
        this.saveBestScore();
        this.physics.pause();
        this.time.addEvent({
            delay: 100,
            callback: () => {
                this.scene.start('gameoverScene');
                
            },
            loop: false
        })
    }

    //set speed up
    speedup(){
        //this.platformSpeed -= 100;
        this.terrainSpeed -= 100;
        this.createTerrain();
        this.physics.add.collider(this.character, this.terraingroup, this.gameover, null, this);
    }

    // score functions
    createScore() {
        this.score = 0;
        const bestScore = localStorage.getItem('bestScore');
        this.scoreText = this.add.text(16, 16, `Score: ${0}`, { fontSize: '32px', fill: '#000'});
        this.add.text(16, 52, `Best score: ${bestScore || 0}`, { fontSize: '18px', fill: '#000'});
    }
    increaseScore() { 
        this.score ++;
        this.scoreText.setText(`Score: ${this.score}`)
    }

    saveBestScore() { 
        const bestScoreText = localStorage.getItem('bestScore');
        const bestScore = bestScoreText && parseInt(bestScoreText, 10);
    
        if (!bestScore || this.score > bestScore) {
          localStorage.setItem('bestScore', this.score);
        }
    }
    // score function done

    update(){
        this.bg1.tilePositionX += 1;
        this.bg2.tilePositionX += 2;
        this.bg3.tilePositionX += 3;
        this.character.update();

        //recycling spawn platforms
        // set the mindis to game width
        let minDistance = game.config.width;
        // getChildren: get all elements in a group
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min (minDistance, platformDistance);
            if (platform.x < -platform.displayWidth/2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        },this);
        //adding new platforms
        if (minDistance > this.nextplatformWidth){
            var nextplatformWidth = Phaser.Math.Between(50, 250);
            this.addPlatform(nextplatformWidth, game.config.width + nextplatformWidth / 2);
        }

        //spawn new terrains
        this.recycleterrains();

        // fall down gameover
        if (this.character.y > game.config.width){
            this.cameras.main.shake(100, 0.01);
            this.gameover();
        }
        
    }

   
    
}

