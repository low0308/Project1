/********************************************
Course : CGD6334 Game Physics
Session: Trimester 2, 2024/25
ID and Name #1 : 1201100503 Low Yong Zhi
Contacts #1 : 1201100503@student.mmu.edu.my
ID and Name #2 : 1201100622 Lim Wei Pang
Contacts #2 : 1201100622@student.mmu.edu.my
********************************************/

class StartGame extends Phaser.Scene {
  constructor() {
    super({ key: 'StartGame' });
  }

  preload() {
    this.load.image('bg', 'Asset/Background/Background Plain.png');
    this.load.audio('buttonAudio', 'Asset/Music/Button.mp3');
  }

  create() {
    // this.backgroundImage = this.add.tileSprite(
    //   game.config.width - 400,
    //   game.config.height - 300,
    //   game.config.width,
    //   game.config.height,
    //   'bg'
    // ).setScale(0.9);

    // Background
    this.add.image(400, 300, 'bg').setScale(0.2);

    // Music
    this.buttonAudio = this.sound.add('buttonAudio');
    this.buttonAudio.setVolume(0.3); 

    const introText = this.add.text(game.config.width / 2, game.config.height / 4 - 10, 'Bounce Bullet', {
      font: 'bold 80px Arial',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
      align: 'center'
    }).setOrigin(0.5);

    // Display a "Start" button (now red)
    const startButton = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'Start', {
      font: '32px Arial',
      fill: '#ffffff',
      backgroundColor: '#ff0000',
      padding: {
        x: 20,
        y: 10
      }
    }).setOrigin(0.5);

    startButton.on('pointerover', () => {
      startButton.setScale(1.1);
    });

    startButton.on('pointerout', () => {
      startButton.setScale(1);
    });

    startButton.on('pointerdown', () => {
      console.log('Button clicked!');
    });

    // Handle Start button click
    startButton.setInteractive();
    startButton.on('pointerdown', function () {
      // Start the ChooseLevelScene
      this.scene.start('ChooseLevelScene');
      this.buttonAudio.play();
    }, this);
  }

  update() {

  }
}

class ChooseLevelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ChooseLevelScene' });
  }

  preload() {
    this.load.image('bg', 'Asset/Background/Background Plain.png');
    this.load.audio('buttonAudio', 'Asset/Music/Button.mp3');
  }

  create() {
    // Background
    this.add.image(400, 300, 'bg').setScale(0.2);

    // Music
    this.buttonAudio = this.sound.add('buttonAudio');
    this.buttonAudio.setVolume(0.3); 

    const introText = this.add.text(game.config.width / 2, game.config.height / 4 + 10, 'Choose One Level', {
      font: 'bold 60px Arial',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
      align: 'center'
    }).setOrigin(0.5);

    // Button level 1
    const Level1Button = this.add.text(game.config.width / 2 - 250, game.config.height / 2 + 50, 'Level1', {
      font: '32px Arial',
      fill: '#ffffff',
      backgroundColor: '#0000ff',
      padding: {
        x: 20,
        y: 10
      }
    }).setOrigin(0.5);

    // Button level 2
    const Level2Button = this.add.text(game.config.width / 2, game.config.height / 2 + 50, 'Level2', {
      font: '32px Arial',
      fill: '#ffffff',
      backgroundColor: '#0000ff',
      padding: {
        x: 20,
        y: 10
      }
    }).setOrigin(0.5);

    // Button level 3
    const Level3Button = this.add.text(game.config.width / 2 + 250, game.config.height / 2 + 50, 'Level3', {
      font: '32px Arial',
      fill: '#ffffff',
      backgroundColor: '#0000ff',
      padding: {
        x: 20,
        y: 10
      }
    }).setOrigin(0.5);

    // Animation Button
    const Buttons = [Level1Button, Level2Button, Level3Button];

    Buttons.forEach(button => {
      button.on('pointerover', () => { button.setScale(1.2); });

      button.on('pointerout', () => { button.setScale(1); });

      button.setInteractive();
    });

    // Handle Level 1 button click
    Level1Button.on('pointerdown', function () {
      // Start the Level 1 Scene
      this.scene.start('Level1');
      this.buttonAudio.play();
    }, this);

    // Handle Level 2 button click
    Level2Button.on('pointerdown', function () {
      // Start the Level 2 Scene
      this.scene.start('Level2');
      this.buttonAudio.play();
    }, this);

    // Handle Level 3 button click
    Level3Button.on('pointerdown', function () {
      // Start the Level 3 Scene
      this.scene.start('Level3');
      this.buttonAudio.play();
    }, this);
  }

  update() {

  }
}

var activeBullet = null;

class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level1' });
    this.gameEnd = false; //status ending game
    this.score = 0;
    this.End1 = false;
    this.End2 = false;
  }

  preload() {
    this.load.image('platform', 'Asset/Environment Assets/Platforms.png');
    this.load.image('platform2', 'Asset/Environment Assets/Platforms2.png');
    this.load.image('bg', 'Asset/Background/Background Plain.png');
    this.load.image('block', 'Asset/Individual Blocks/Side.png');
    this.load.image('player', 'Asset/Player/character.png');
    this.load.image('weapon', 'Asset/Weapons/Bazooka.png');
    this.load.image('bullet', 'Asset/Textures/Circle.png');
    this.load.image('enemy', 'Asset/Enemies/Enemy1.png');
    this.load.image('enemy2', 'Asset/Enemies/Enemy2.png');
    this.load.image('enemy3', 'Asset/Enemies/Enemy3.png');
    this.load.audio('backgroundMusic', 'Asset/Music/background music.ogg');
    this.load.audio('shoot', 'Asset/Music/shoot.ogg');
    this.load.audio('bounce', 'Asset/Music/bounce.wav');
    this.load.audio('monsterdie', 'Asset/Music/monsterdie.wav');
    this.load.audio('buttonAudio', 'Asset/Music/Button.mp3');
  }

  create() {
    // Background
    this.add.image(400, 300, 'bg').setScale(0.2);

    //platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(100, 150, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(100, 230, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(145, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(225, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(305, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(385, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(420, 150, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(420, 230, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(420, 300, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(455, 345, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(535, 345, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(615, 345, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(695, 345, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(730, 380, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(730, 460, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(695, 495, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(615, 495, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(535, 495, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(455, 495, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(385, 495, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(335, 495, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(300, 450, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(300, 400, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(300, 340, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(267, 300, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(187, 300, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(135, 300, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(100, 265, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(145, 220, 'platform').setScale(0.1).refreshBody();

    // Player
    this.player = this.physics.add.sprite(180, 200, 'player').setScale(0.2);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    // Enemy
    this.enemy = this.physics.add.sprite(600, 400, 'enemy').setScale(0.2);
    this.enemy.setBounce(0.2);
    this.enemy.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy, this.platforms);

    this.enemy2 = this.physics.add.sprite(500, 400, 'enemy2').setScale(0.2); // Create enemy2
    this.enemy2.setBounce(0.2);
    this.enemy2.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy2, this.platforms);

    this.enemy3 = this.physics.add.sprite(400, 400, 'enemy3').setScale(0.2); // Create enemy3
    this.enemy3.setBounce(0.2);
    this.enemy3.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy3, this.platforms);

    // Weapon
    this.weapon = this.add.sprite(this.player.x, this.player.y + 5, 'weapon').setScale(0.2);
    this.weapon.displayWidth = 45;

    // Bullets
    this.bullet = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 1000
    });
    this.physics.add.collider(this.bullet, this.platforms, this.onBulletBounce, null, this);
    this.physics.add.collider(this.bullet, this.enemy, this.onBulletHitEnemy, null, this);
    this.physics.add.collider(this.bullet, this.enemy2, this.onBulletHitEnemy, null, this);
    this.physics.add.collider(this.bullet, this.enemy3, this.onBulletHitEnemy, null, this);

    // Cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // Fire bullet on pointer down
    this.input.on('pointerdown', this.fireBullet, this);

    this.maxBulletCount = 5; // Maximum number of bullets allowed per game
    this.currentBulletCount = 0; // Current number of bullets fired

    // Display remaining bullet count
    this.bulletText = this.add.text(20, 20, 'Number of bullets: ' + (this.maxBulletCount - this.currentBulletCount), {
      font: '24px Arial',
      fill: '#ffffff'
    });

    // Display score
    this.scoreText = this.add.text(20, 50, 'Score: 0', {
      font: '24px Arial',
      fill: '#ffffff'
    });

    // load audio
    this.backgroundMusic = this.sound.add('backgroundMusic');
    this.shootSound = this.sound.add('shoot');
    this.bulletBounce = this.sound.add('bounce', { volume: 3.0 });
    this.monsterDie = this.sound.add('monsterdie');
    this.buttonAudio = this.sound.add('buttonAudio');

    this.backgroundMusic.setVolume(0.2); 
    this.shootSound.setVolume(1.3); 
    this.buttonAudio.setVolume(0.3); 

    // play background music
    this.backgroundMusic.play({
      loop: true,
    });
  }

  update() {
    if (this.gameEnd) {
      return; // if game end then no update
    }
    this.weapon.setPosition(this.player.x, this.player.y + 5);

    if (this.cursors.up.isDown) {
      this.weapon.angle -= 1;
    }
    if (this.cursors.down.isDown) {
      this.weapon.angle += 1;
    }

    // Reset bounce flag at the beginning of each frame
    if (activeBullet && activeBullet.hasBouncedThisFrame) {
      activeBullet.hasBouncedThisFrame = false;
    }
  }

  fireBullet(pointer) {
    if (activeBullet) {
      return; // Do not fire another bullet if one is already active
    }
    if (this.currentBulletCount >= this.maxBulletCount) {
      return; // Reach the maximum bullet count, don't fire new bullets
    }

    if (this.gameEnd) {
      return; // stop fire when game end
    }

    var weaponLength = this.weapon.displayWidth * 0.5;
    var bulletX = this.player.x + weaponLength * Math.cos(this.weapon.rotation);
    var bulletY = this.player.y + 5 + weaponLength * Math.sin(this.weapon.rotation);

    var bullets = this.bullet.get(bulletX, bulletY);

    if (bullets) {
      bullets.setActive(true);
      bullets.setVisible(true);
      bullets.setScale(0.02);
      bullets.setBounce(0.5);
      bullets.body.velocity.x = 500 * Math.cos(this.weapon.rotation);
      bullets.body.velocity.y = 500 * Math.sin(this.weapon.rotation);
      bullets.bounceCount = 0; // Initialize bounce count
      bullets.hasBouncedThisFrame = false; // Initialize bounce flag

      activeBullet = bullets; // Mark this bullet as the active one

      this.currentBulletCount++; // Increment the bullet count
      this.updateBulletText(); // Update the bullet text
      this.checkGameEnd(); // Check game end after hitting enemy

      // Play shooting sound
      this.shootSound.play();
    }
  }

  updateBulletText() {
    // Update the bullet count text
    this.bulletText.setText('Number of bullets: ' + (this.maxBulletCount - this.currentBulletCount));

    //this.checkGameEnd(); // Check game end after hitting enemy
  }

  updateScore(score) {
    this.score += score;
    this.scoreText.setText('Score: ' + this.score); // Update score
  }

  onBulletBounce(bullets, platforms) {
    if (!bullets.hasBouncedThisFrame) {
      bullets.bounceCount += 1;
      bullets.hasBouncedThisFrame = true; // Mark that it has bounced this frame

      // Play bounce sound
      this.bulletBounce.play(); 

      if (bullets.bounceCount >= 5) {
        bullets.destroy(); // if bullet bounce time equal to 5 then delete bullet
        activeBullet = null; // Allow firing another bullet
        this.checkGameEnd();
      }
    }
  }

  onBulletHitEnemy(bullets, enemy) {
    bullets.destroy();
    activeBullet = null; // Allow firing another bullet

    enemy.destroy(); // Remove enemy from the game

    this.monsterDie.play();

    this.updateScore(10);
    this.checkGameEnd(); // Check game end after hitting enemy
  }

  checkGameEnd() {
    if ((this.currentBulletCount >= this.maxBulletCount && this.bullet.getTotalUsed() === 0) && (this.enemy.active || this.enemy2.active || this.enemy3.active)) {
      this.End1 = true;
      // All bullets used and enemy still exists
      this.Ending();
    } else if (!this.enemy.active && !this.enemy2.active && !this.enemy3.active) {
      this.End2 = true;
      // All enemy destroyed
      this.Ending();
    }
  }

  Ending() {
    this.physics.pause();
    this.gameEnd = true;

    // Calculate score based on remaining bullets，1 bullet 100 point
    if (this.currentBulletCount < this.maxBulletCount) {
      const remainingBulletsScore = (this.maxBulletCount - this.currentBulletCount) * 100;
      this.updateScore(remainingBulletsScore);
    }

    const buttonBackground = this.add.graphics();
    const buttonBackgroundWidth = 300;
    const buttonBackgroundHeight = 400;
    const buttonBackgroundColor = 0x808080;
    buttonBackground.fillStyle(buttonBackgroundColor, 1);
    buttonBackground.fillRect(game.config.width / 2 - 150, game.config.height / 4 - 50, buttonBackgroundWidth, buttonBackgroundHeight);

    // Initialize theEnd variable
    let theEnd;

    if (this.End1) {
      // Display a "Your result" message
      theEnd = this.add.text(game.config.width / 2, game.config.height / 2 - 130, 'You Lose', {
        font: 'bold 32px Arial',
        fill: '#000000',
        backgroundColor: '#ffff00',
        padding: {
          x: 20,
          y: 10
        }
      }).setOrigin(0.5);
    }
    else if (this.End2) {
      // Display a "Your result" message
      theEnd = this.add.text(game.config.width / 2, game.config.height / 2 - 130, 'You Win', {
        font: 'bold 32px Arial',
        fill: '#000000',
        backgroundColor: '#ffff00',
        padding: {
          x: 20,
          y: 10
        }
      }).setOrigin(0.5);
    }

    // Display score
    const scoreDisplay = this.add.text(game.config.width / 2, game.config.height / 2 - 50, 'Score: ' + this.score, {
      font: 'bold 32px Arial',
      fill: '#000000',
      backgroundColor: '#ffff00',
      padding: {
        x: 20,
        y: 10
      }
    }).setOrigin(0.5);

    // Restart Button 
    const restartButton = this.add.text(game.config.width / 2, game.config.height / 2 + 80, 'Restart', {
      font: '24px Arial',
      fill: '#000000',
      backgroundColor: '#ffff00',
      padding: {
        x: 40,
        y: 10
      }
    }).setOrigin(0.5);

    // Button Animation
    restartButton.on('pointerover', () => {
      restartButton.setScale(1.2);
    });

    restartButton.on('pointerout', () => {
      restartButton.setScale(1);
    });

    restartButton.setInteractive();
    restartButton.on('pointerdown', function () {
      // Resume the physics
      //this.physics.resume();

      // Clean up the "Result" message and button
      theEnd.destroy();
      restartButton.destroy();
      mainPageButton.destroy();

      //Restart the game after a delay
      this.time.delayedCall(10, () => {
        this.gameEnd = false;
        this.End1 = false;
        this.End2 = false;
        this.score = 0;
        // Restart the game
        this.scene.start('Level1');
      }, [], this);

      this.buttonAudio.play();
    }, this);

    // Back to Main Page Button 
    const mainPageButton = this.add.text(game.config.width / 2, game.config.height / 2 + 150, 'Main Page', {
      font: '24px Arial',
      fill: '#000000',
      backgroundColor: '#ffff00',
      padding: {
        x: 20,
        y: 10
      }
    }).setOrigin(0.5);

    // Button Animation
    mainPageButton.on('pointerover', () => {
      mainPageButton.setScale(1.2);
    });

    mainPageButton.on('pointerout', () => {
      mainPageButton.setScale(1);
    });

    mainPageButton.setInteractive();
    mainPageButton.on('pointerdown', function () {
      // Resume the physics
      //this.physics.resume();

      // Clean up the "Result" message and button
      theEnd.destroy();
      restartButton.destroy();
      mainPageButton.destroy();

      //Restart the game after a delay
      this.time.delayedCall(10, () => {
        this.gameEnd = false;
        this.End1 = false;
        this.End2 = false;
        this.score = 0;
        // Back to Main Page
        this.scene.start('StartGame');
      }, [], this);

      this.buttonAudio.play();
    }, this);

    // Stop Background Music and other music
    if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
      this.backgroundMusic.stop();
    }

    if (this.shootSound && this.shootSound.isPlaying) {
      this.shootSound.stop();
    }
  }
}

class Level2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level2' });
    this.gameEnd = false; //status ending game
    this.End1 = false;
    this.End2 = false;
    this.score = 0;
  }

  preload() {
    this.load.image('platform', 'Asset/Environment Assets/Platforms.png');
    this.load.image('platform2', 'Asset/Environment Assets/Platforms2.png');
    this.load.image('bg', 'Asset/Background/Background Plain.png');
    this.load.image('block', 'Asset/Individual Blocks/Side.png');
    this.load.image('player', 'Asset/Player/character.png');
    this.load.image('weapon', 'Asset/Weapons/Bazooka.png');
    this.load.image('bullet', 'Asset/Textures/Circle.png');
    this.load.image('enemy', 'Asset/Enemies/Enemy1.png');
    this.load.image('enemy2', 'Asset/Enemies/Enemy2.png');
    this.load.image('enemy3', 'Asset/Enemies/Enemy3.png');
    this.load.audio('backgroundMusic', 'Asset/Music/background music.ogg');
    this.load.audio('shoot', 'Asset/Music/shoot.ogg');
    this.load.audio('bounce', 'Asset/Music/bounce.wav');
    this.load.audio('monsterdie', 'Asset/Music/monsterdie.wav');
    this.load.audio('buttonAudio', 'Asset/Music/Button.mp3');
  }

  create() {
    // Background
    this.add.image(400, 300, 'bg').setScale(0.2);

    //platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(100, 150, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(100, 230, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(100, 310, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(100, 390, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(100, 450, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(145, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(225, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(260, 150, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(260, 230, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(260, 250, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(292, 290, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(350, 290, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(383, 250, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(383, 170, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(383, 150, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(420, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(500, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(420, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(535, 150, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(535, 230, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(535, 250, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(570, 290, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(600, 290, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(635, 150, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(635, 230, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(635, 255, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(670, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(700, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(745, 150, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(745, 230, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(745, 310, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(745, 390, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(745, 450, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(145, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(225, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(305, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(385, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(465, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(545, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(625, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(700, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(230, 290, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(500, 290, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(700, 350, 'platform').setScale(0.1).refreshBody();

    // Player
    this.player = this.physics.add.sprite(480, 400, 'player').setScale(0.2);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    // Enemy
    this.enemy = this.physics.add.sprite(710, 280, 'enemy').setScale(0.2);
    this.enemy.setBounce(0.2);
    this.enemy.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy, this.platforms);

    this.enemy2 = this.physics.add.sprite(485, 230, 'enemy2').setScale(0.2); // Create enemy2
    this.enemy2.setBounce(0.2);
    this.enemy2.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy2, this.platforms);

    this.enemy3 = this.physics.add.sprite(220, 230, 'enemy3').setScale(0.2); // Create enemy3
    this.enemy3.setBounce(0.2);
    this.enemy3.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy3, this.platforms);

    // Weapon
    this.weapon = this.add.sprite(this.player.x, this.player.y + 5, 'weapon').setScale(0.2);
    this.weapon.displayWidth = 45;

    // Bullets
    this.bullet = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 1000
    });
    this.physics.add.collider(this.bullet, this.platforms, this.onBulletBounce, null, this);
    this.physics.add.collider(this.bullet, this.enemy, this.onBulletHitEnemy, null, this);
    this.physics.add.collider(this.bullet, this.enemy2, this.onBulletHitEnemy, null, this);
    this.physics.add.collider(this.bullet, this.enemy3, this.onBulletHitEnemy, null, this);

    // Cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // Fire bullet on pointer down
    this.input.on('pointerdown', this.fireBullet, this);

    this.maxBulletCount = 5; // Maximum number of bullets allowed per game
    this.currentBulletCount = 0; // Current number of bullets fired

    // Display remaining bullet count
    this.bulletText = this.add.text(20, 20, 'Number of bullets: ' + (this.maxBulletCount - this.currentBulletCount), {
      font: '24px Arial',
      fill: '#ffffff'
    });

    // Display score
    this.scoreText = this.add.text(20, 50, 'Score: 0', {
      font: '24px Arial',
      fill: '#ffffff'
    });

    // load audio
    this.backgroundMusic = this.sound.add('backgroundMusic');
    this.shootSound = this.sound.add('shoot');
    this.bulletBounce = this.sound.add('bounce', { volume: 3.0 });
    this.monsterDie = this.sound.add('monsterdie');
    this.buttonAudio = this.sound.add('buttonAudio');

    this.backgroundMusic.setVolume(0.2); 
    this.shootSound.setVolume(1.3); 
    this.buttonAudio.setVolume(0.3); 

    // play background music
    this.backgroundMusic.play({
      loop: true,
    });
  }

  update() {
    if (this.gameEnd) {
      return; // if game end then no update
    }
    this.weapon.setPosition(this.player.x, this.player.y + 5);

    if (this.cursors.up.isDown) {
      this.weapon.angle -= 1;
    }
    if (this.cursors.down.isDown) {
      this.weapon.angle += 1;
    }

    // Reset bounce flag at the beginning of each frame
    if (activeBullet && activeBullet.hasBouncedThisFrame) {
      activeBullet.hasBouncedThisFrame = false;
    }
  }

  fireBullet(pointer) {
    if (activeBullet) {
      return; // Do not fire another bullet if one is already active
    }
    if (this.currentBulletCount >= this.maxBulletCount) {
      return; // Reach the maximum bullet count, don't fire new bullets
    }

    if (this.gameEnd) {
      return; // stop fire when game end
    }

    var weaponLength = this.weapon.displayWidth * 0.5;
    var bulletX = this.player.x + weaponLength * Math.cos(this.weapon.rotation);
    var bulletY = this.player.y + 5 + weaponLength * Math.sin(this.weapon.rotation);

    var bullets = this.bullet.get(bulletX, bulletY);

    if (bullets) {
      bullets.setActive(true);
      bullets.setVisible(true);
      bullets.setScale(0.02);
      bullets.setBounce(0.5);
      bullets.body.velocity.x = 500 * Math.cos(this.weapon.rotation);
      bullets.body.velocity.y = 500 * Math.sin(this.weapon.rotation);
      bullets.bounceCount = 0; // Initialize bounce count
      bullets.hasBouncedThisFrame = false; // Initialize bounce flag

      activeBullet = bullets; // Mark this bullet as the active one

      this.currentBulletCount++; // Increment the bullet count
      this.updateBulletText(); // Update the bullet text
      this.checkGameEnd(); // Check game end after hitting enemy

      // Play shooting sound
      this.shootSound.play();
    }
  }

  updateBulletText() {
    // Update the bullet count text
    this.bulletText.setText('Number of bullets: ' + (this.maxBulletCount - this.currentBulletCount));

    //this.checkGameEnd(); // Check game end after hitting enemy
  }

  updateScore(score) {
    this.score += score;
    this.scoreText.setText('Score: ' + this.score); // Update score
  }

  onBulletBounce(bullets, platforms) {
    if (!bullets.hasBouncedThisFrame) {
      bullets.bounceCount += 1;
      bullets.hasBouncedThisFrame = true; // Mark that it has bounced this frame

      // Play bounce sound
      this.bulletBounce.play(); 

      if (bullets.bounceCount >= 5) {
        bullets.destroy(); // if bullet bounce time equal to 5 then delete bullet
        activeBullet = null; // Allow firing another bullet
        this.checkGameEnd();
      }
    }
  }

  onBulletHitEnemy(bullets, enemy) {
    bullets.destroy();
    activeBullet = null; // Allow firing another bullet

    enemy.destroy(); // Remove enemy from the game

    this.monsterDie.play();

    this.updateScore(10);
    this.checkGameEnd(); // Check game end after hitting enemy
  }

  checkGameEnd() {
    if ((this.currentBulletCount >= this.maxBulletCount && this.bullet.getTotalUsed() === 0) && (this.enemy.active || this.enemy2.active || this.enemy3.active)) {
      this.End1 = true;
      // All bullets used and enemy still exists
      this.Ending();
    } else if (!this.enemy.active && !this.enemy2.active && !this.enemy3.active) {
      this.End2 = true;
      // All enemy destroyed
      this.Ending();
    }
  }

  Ending() {
    this.physics.pause();
    this.gameEnd = true;

    // Calculate score based on remaining bullets，1 bullet 100 point
    if (this.currentBulletCount < this.maxBulletCount) {
      const remainingBulletsScore = (this.maxBulletCount - this.currentBulletCount) * 100;
      this.updateScore(remainingBulletsScore);
    }

    const buttonBackground = this.add.graphics();
    const buttonBackgroundWidth = 300;
    const buttonBackgroundHeight = 400;
    const buttonBackgroundColor = 0x808080;
    buttonBackground.fillStyle(buttonBackgroundColor, 1);
    buttonBackground.fillRect(game.config.width / 2 - 150, game.config.height / 4 - 50, buttonBackgroundWidth, buttonBackgroundHeight);

    // Initialize theEnd variable
    let theEnd;

    if (this.End1) {
      // Display a "Your result" message
      theEnd = this.add.text(game.config.width / 2, game.config.height / 2 - 130, 'You Lose', {
        font: 'bold 32px Arial',
        fill: '#000000',
        backgroundColor: '#ffff00',
        padding: {
          x: 20,
          y: 10
        }
      }).setOrigin(0.5);
    }
    else if (this.End2) {
      // Display a "Your result" message
      theEnd = this.add.text(game.config.width / 2, game.config.height / 2 - 130, 'You Win', {
        font: 'bold 32px Arial',
        fill: '#000000',
        backgroundColor: '#ffff00',
        padding: {
          x: 20,
          y: 10
        }
      }).setOrigin(0.5);
    }

    // Display score
    const scoreDisplay = this.add.text(game.config.width / 2, game.config.height / 2 - 50, 'Score: ' + this.score, {
      font: 'bold 32px Arial',
      fill: '#000000',
      backgroundColor: '#ffff00',
      padding: {
        x: 20,
        y: 10
      }
    }).setOrigin(0.5);

    // Restart Button 
    const restartButton = this.add.text(game.config.width / 2, game.config.height / 2 + 80, 'Restart', {
      font: '24px Arial',
      fill: '#000000',
      backgroundColor: '#ffff00',
      padding: {
        x: 40,
        y: 10
      }
    }).setOrigin(0.5);

    // Button Animation
    restartButton.on('pointerover', () => {
      restartButton.setScale(1.2);
    });

    restartButton.on('pointerout', () => {
      restartButton.setScale(1);
    });

    restartButton.setInteractive();
    restartButton.on('pointerdown', function () {
      // Resume the physics
      //this.physics.resume();

      // Clean up the "Result" message and button
      theEnd.destroy();
      restartButton.destroy();
      mainPageButton.destroy();

      //Restart the game after a delay
      this.time.delayedCall(10, () => {
        this.gameEnd = false;
        this.End1 = false;
        this.End2 = false;
        this.score = 0;
        // Restart the game
        this.scene.start('Level2');
      }, [], this);

      this.buttonAudio.play();
    }, this);

    // Back to Main Page Button 
    const mainPageButton = this.add.text(game.config.width / 2, game.config.height / 2 + 150, 'Main Page', {
      font: '24px Arial',
      fill: '#000000',
      backgroundColor: '#ffff00',
      padding: {
        x: 20,
        y: 10
      }
    }).setOrigin(0.5);

    // Button Animation
    mainPageButton.on('pointerover', () => {
      mainPageButton.setScale(1.2);
    });

    mainPageButton.on('pointerout', () => {
      mainPageButton.setScale(1);
    });

    mainPageButton.setInteractive();
    mainPageButton.on('pointerdown', function () {
      // Resume the physics
      //this.physics.resume();

      // Clean up the "Result" message and button
      theEnd.destroy();
      restartButton.destroy();
      mainPageButton.destroy();

      //Restart the game after a delay
      this.time.delayedCall(10, () => {
        this.gameEnd = false;
        this.End1 = false;
        this.End2 = false;
        this.score = 0;
        // Back to Main Page
        this.scene.start('StartGame');
      }, [], this);

      this.buttonAudio.play();
    }, this);

    // Stop Background Music and other music
    if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
      this.backgroundMusic.stop();
    }

    if (this.shootSound && this.shootSound.isPlaying) {
      this.shootSound.stop();
    }
  }
}

class Level3 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level3' });
    this.gameEnd = false; //status ending game
    this.End1 = false;
    this.End2 = false;
    this.score = 0;
  }

  preload() {
    this.load.image('platform', 'Asset/Environment Assets/Platforms.png');
    this.load.image('platform2', 'Asset/Environment Assets/Platforms2.png');
    this.load.image('bg', 'Asset/Background/Background Plain.png');
    this.load.image('block', 'Asset/Individual Blocks/Side.png');
    this.load.image('player', 'Asset/Player/character.png');
    this.load.image('weapon', 'Asset/Weapons/Bazooka.png');
    this.load.image('bullet', 'Asset/Textures/Circle.png');
    this.load.image('enemy', 'Asset/Enemies/Enemy1.png');
    this.load.image('enemy2', 'Asset/Enemies/Enemy2.png');
    this.load.image('enemy3', 'Asset/Enemies/Enemy3.png');
    this.load.audio('backgroundMusic', 'Asset/Music/background music.ogg');
    this.load.audio('shoot', 'Asset/Music/shoot.ogg');
    this.load.audio('bounce', 'Asset/Music/bounce.wav');
    this.load.audio('monsterdie', 'Asset/Music/monsterdie.wav');
    this.load.audio('buttonAudio', 'Asset/Music/Button.mp3');
  }

  create() {
    // Background
    this.add.image(400, 300, 'bg').setScale(0.2);

    //platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(100, 150, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(100, 230, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(100, 310, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(100, 390, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(100, 450, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(145, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(225, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(305, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(385, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(465, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(540, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(620, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(680, 115, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(720, 150, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(720, 230, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(720, 310, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(720, 390, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(720, 450, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(685, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(145, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(225, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(305, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(385, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(465, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(545, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(625, 485, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(675, 250, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(595, 250, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(550, 215, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(450, 155, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(450, 215, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(340, 450, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(450, 255, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(340, 400, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(405, 290, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(140, 350, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(200, 350, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(240, 350, 'platform').setScale(0.1).refreshBody();
    this.platforms.create(280, 315, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(280, 270, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(370, 255, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(370, 190, 'platform2').setScale(0.1).refreshBody();
    this.platforms.create(370, 150, 'platform2').setScale(0.1).refreshBody();

    // Player
    this.player = this.physics.add.sprite(560, 400, 'player').setScale(0.2);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    // Enemy
    this.enemy = this.physics.add.sprite(670, 150, 'enemy').setScale(0.2);
    this.enemy.setBounce(0.2);
    this.enemy.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy, this.platforms);

    this.enemy2 = this.physics.add.sprite(150, 430, 'enemy2').setScale(0.2); // Create enemy2
    this.enemy2.setBounce(0.2);
    this.enemy2.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy2, this.platforms);

    this.enemy3 = this.physics.add.sprite(150, 230, 'enemy3').setScale(0.2); // Create enemy3
    this.enemy3.setBounce(0.2);
    this.enemy3.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy3, this.platforms);

    // Weapon
    this.weapon = this.add.sprite(this.player.x, this.player.y + 5, 'weapon').setScale(0.2);
    this.weapon.displayWidth = 45;

    // Bullets
    this.bullet = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 1000
    });
    this.physics.add.collider(this.bullet, this.platforms, this.onBulletBounce, null, this);
    this.physics.add.collider(this.bullet, this.enemy, this.onBulletHitEnemy, null, this);
    this.physics.add.collider(this.bullet, this.enemy2, this.onBulletHitEnemy, null, this);
    this.physics.add.collider(this.bullet, this.enemy3, this.onBulletHitEnemy, null, this);

    // Cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // Fire bullet on pointer down
    this.input.on('pointerdown', this.fireBullet, this);

    this.maxBulletCount = 5; // Maximum number of bullets allowed per game
    this.currentBulletCount = 0; // Current number of bullets fired

    // Display remaining bullet count
    this.bulletText = this.add.text(20, 20, 'Number of bullets: ' + (this.maxBulletCount - this.currentBulletCount), {
      font: '24px Arial',
      fill: '#ffffff'
    });

    // Display score
    this.scoreText = this.add.text(20, 50, 'Score: 0', {
      font: '24px Arial',
      fill: '#ffffff'
    });

    // load audio
    this.backgroundMusic = this.sound.add('backgroundMusic');
    this.shootSound = this.sound.add('shoot');
    this.bulletBounce = this.sound.add('bounce', { volume: 3.0 });
    this.monsterDie = this.sound.add('monsterdie');
    this.buttonAudio = this.sound.add('buttonAudio');

    this.backgroundMusic.setVolume(0.2); 
    this.shootSound.setVolume(1.3); 
    this.buttonAudio.setVolume(0.3); 

    // play background music
    this.backgroundMusic.play({
      loop: true,
    });
  }

  update() {
    if (this.gameEnd) {
      return; // if game end then no update
    }
    this.weapon.setPosition(this.player.x, this.player.y + 5);

    if (this.cursors.up.isDown) {
      this.weapon.angle -= 1;
    }
    if (this.cursors.down.isDown) {
      this.weapon.angle += 1;
    }

    // Reset bounce flag at the beginning of each frame
    if (activeBullet && activeBullet.hasBouncedThisFrame) {
      activeBullet.hasBouncedThisFrame = false;
    }
  }

  fireBullet(pointer) {
    if (activeBullet) {
      return; // Do not fire another bullet if one is already active
    }
    if (this.currentBulletCount >= this.maxBulletCount) {
      return; // Reach the maximum bullet count, don't fire new bullets
    }

    if (this.gameEnd) {
      return; // stop fire when game end
    }

    var weaponLength = this.weapon.displayWidth * 0.5;
    var bulletX = this.player.x + weaponLength * Math.cos(this.weapon.rotation);
    var bulletY = this.player.y + 5 + weaponLength * Math.sin(this.weapon.rotation);

    var bullets = this.bullet.get(bulletX, bulletY);

    if (bullets) {
      bullets.setActive(true);
      bullets.setVisible(true);
      bullets.setScale(0.02);
      bullets.setBounce(0.5);
      bullets.body.velocity.x = 500 * Math.cos(this.weapon.rotation);
      bullets.body.velocity.y = 500 * Math.sin(this.weapon.rotation);
      bullets.bounceCount = 0; // Initialize bounce count
      bullets.hasBouncedThisFrame = false; // Initialize bounce flag

      activeBullet = bullets; // Mark this bullet as the active one

      this.currentBulletCount++; // Increment the bullet count
      this.updateBulletText(); // Update the bullet text
      this.checkGameEnd(); // Check game end after hitting enemy

      // Play shooting sound
      this.shootSound.play();
    }
  }

  updateBulletText() {
    // Update the bullet count text
    this.bulletText.setText('Number of bullets: ' + (this.maxBulletCount - this.currentBulletCount));

    //this.checkGameEnd(); // Check game end after hitting enemy
  }

  updateScore(score) {
    this.score += score;
    this.scoreText.setText('Score: ' + this.score); // Update score
  }

  onBulletBounce(bullets, platforms) {
    if (!bullets.hasBouncedThisFrame) {
      bullets.bounceCount += 1;
      bullets.hasBouncedThisFrame = true; // Mark that it has bounced this frame

      // Play bounce sound
      this.bulletBounce.play(); 

      if (bullets.bounceCount >= 5) {
        bullets.destroy(); // if bullet bounce time equal to 5 then delete bullet
        activeBullet = null; // Allow firing another bullet
        this.checkGameEnd();
      }
    }
  }

  onBulletHitEnemy(bullets, enemy) {
    bullets.destroy();
    activeBullet = null; // Allow firing another bullet

    enemy.destroy(); // Remove enemy from the game

    this.monsterDie.play();

    this.updateScore(10);
    this.checkGameEnd(); // Check game end after hitting enemy
  }

  checkGameEnd() {
    if ((this.currentBulletCount >= this.maxBulletCount && this.bullet.getTotalUsed() === 0) && (this.enemy.active || this.enemy2.active || this.enemy3.active)) {
      this.End1 = true;
      // All bullets used and enemy still exists
      this.Ending();
    } else if (!this.enemy.active && !this.enemy2.active && !this.enemy3.active) {
      this.End2 = true;
      // All enemy destroyed
      this.Ending();
    }
  }

  Ending() {
    this.physics.pause();
    this.gameEnd = true;

    // Calculate score based on remaining bullets，1 bullet 100 point
    if (this.currentBulletCount < this.maxBulletCount) {
      const remainingBulletsScore = (this.maxBulletCount - this.currentBulletCount) * 100;
      this.updateScore(remainingBulletsScore);
    }

    const buttonBackground = this.add.graphics();
    const buttonBackgroundWidth = 300;
    const buttonBackgroundHeight = 400;
    const buttonBackgroundColor = 0x808080;
    buttonBackground.fillStyle(buttonBackgroundColor, 1);
    buttonBackground.fillRect(game.config.width / 2 - 150, game.config.height / 4 - 50, buttonBackgroundWidth, buttonBackgroundHeight);

    // Initialize theEnd variable
    let theEnd;

    if (this.End1) {
      // Display a "Your result" message
      theEnd = this.add.text(game.config.width / 2, game.config.height / 2 - 130, 'You Lose', {
        font: 'bold 32px Arial',
        fill: '#000000',
        backgroundColor: '#ffff00',
        padding: {
          x: 20,
          y: 10
        }
      }).setOrigin(0.5);
    }
    else if (this.End2) {
      // Display a "Your result" message
      theEnd = this.add.text(game.config.width / 2, game.config.height / 2 - 130, 'You Win', {
        font: 'bold 32px Arial',
        fill: '#000000',
        backgroundColor: '#ffff00',
        padding: {
          x: 20,
          y: 10
        }
      }).setOrigin(0.5);
    }

    // Display score
    const scoreDisplay = this.add.text(game.config.width / 2, game.config.height / 2 - 50, 'Score: ' + this.score, {
      font: 'bold 32px Arial',
      fill: '#000000',
      backgroundColor: '#ffff00',
      padding: {
        x: 20,
        y: 10
      }
    }).setOrigin(0.5);

    // Restart Button 
    const restartButton = this.add.text(game.config.width / 2, game.config.height / 2 + 80, 'Restart', {
      font: '24px Arial',
      fill: '#000000',
      backgroundColor: '#ffff00',
      padding: {
        x: 40,
        y: 10
      }
    }).setOrigin(0.5);

    // Button Animation
    restartButton.on('pointerover', () => {
      restartButton.setScale(1.2);
    });

    restartButton.on('pointerout', () => {
      restartButton.setScale(1);
    });

    restartButton.setInteractive();
    restartButton.on('pointerdown', function () {
      // Resume the physics
      //this.physics.resume();

      // Clean up the "Result" message and button
      theEnd.destroy();
      restartButton.destroy();
      mainPageButton.destroy();

      //Restart the game after a delay
      this.time.delayedCall(10, () => {
        this.gameEnd = false;
        this.End1 = false;
        this.End2 = false;
        this.score = 0;
        // Restart the game
        this.scene.start('Level3');
      }, [], this);

      this.buttonAudio.play();
    }, this);

    // Back to Main Page Button 
    const mainPageButton = this.add.text(game.config.width / 2, game.config.height / 2 + 150, 'Main Page', {
      font: '24px Arial',
      fill: '#000000',
      backgroundColor: '#ffff00',
      padding: {
        x: 20,
        y: 10
      }
    }).setOrigin(0.5);

    // Button Animation
    mainPageButton.on('pointerover', () => {
      mainPageButton.setScale(1.2);
    });

    mainPageButton.on('pointerout', () => {
      mainPageButton.setScale(1);
    });

    mainPageButton.setInteractive();
    mainPageButton.on('pointerdown', function () {
      // Resume the physics
      //this.physics.resume();

      // Clean up the "Result" message and button
      theEnd.destroy();
      restartButton.destroy();
      mainPageButton.destroy();

      //Restart the game after a delay
      this.time.delayedCall(10, () => {
        this.gameEnd = false;
        this.End1 = false;
        this.End2 = false;
        this.score = 0;
        // Back to Main Page
        this.scene.start('StartGame');
      }, [], this);

      this.buttonAudio.play();
    }, this);

    // Stop Background Music and other music
    if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
      this.backgroundMusic.stop();
    }

    if (this.shootSound && this.shootSound.isPlaying) {
      this.shootSound.stop();
    }
  }
}

const config = {
  type: Phaser.AUTO,
  // backgroundColor: 0x87ceeb,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'thegame',
    width: 800,
    height: 600,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
    },
  },
  scene: [StartGame, ChooseLevelScene, Level1, Level2, Level3]
};

const game = new Phaser.Game(config);
