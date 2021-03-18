import Shoot from './Shoot';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x - 30, y - 30, 'player');

        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.cursor = this.scene.input.keyboard.createCursorKeys();

        this.shooting = false; // Indica si se está disparando
        this.shoot = null; // Clase Shoot disparada
        this.shootInterval = 1700; // Tiempo entre disparos
        this.shootTime = null; // Tiempo en el que se disparó
        this.setImmovable(true);
        this.setCollideWorldBounds();

        this.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('playerSprites', { start: 1, end: 2, prefix: 'idle' }),
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: 'walking',
            frames: this.scene.anims.generateFrameNames('playerSprites', { start: 1, end: 4, prefix: 'walking' }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'shooting',
            frames: this.scene.anims.generateFrameNames('playerSprites', { start: 1, end: 2, prefix: 'shooting' }),
            frameRate: 2,
            repeat: 1,
        });
    }

    update(time, delta) {
        if (this.cursor.left.isDown) {
            this.play('walking', true);
            this.setVelocityX(-20 * delta);
            this.setFlipX(false);
        } else if (this.cursor.right.isDown) {
            this.play('walking', true);
            this.setVelocityX(20 * delta);
            this.setFlipX(true);
        } else {
            this.play('idle', true);
            this.setVelocityX(0);
        }
        this.checkShoot();
    }

    checkShoot() {
        if (!this.shooting && this.cursor.space.isDown) {
            this.play('shooting');
            this.shooting = true;
            this.shoot = new Shoot(this.scene, this.x, this.y);
            for (const b of this.scene.balls) {
                this.scene.physics.add.collider(this.shoot, b, this.collideBall.bind(this));
            }
            this.shootTime = new Date().getTime();
        } else if (this.shooting && new Date().getTime() > this.shootTime + this.shootInterval) {
            this.shoot.destroy();
            this.shoot = null;
            this.shootTime = null;
            this.shooting = false;
        }
    }

    collideBall(shoot, ball) {
        this.scene.destroyBall(ball);
        shoot.destroy();
    }
}