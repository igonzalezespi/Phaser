export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, playerNumber, cpu) {
        super(scene, x, y, 'player');

        this.scene = scene;
        this.cpu = cpu;
        this.velocity = 0.5;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.cursor.w = scene.input.keyboard.addKey('W');
        this.cursor.s = scene.input.keyboard.addKey('S');

        this.setImmovable(true);
        this.setCollideWorldBounds();

        if (playerNumber === 1) {
            this.up = 'w';
            this.down = 's';
        } else {
            this.up = 'up';
            this.down = 'down';
        }
    }

    update(time, delta) {
        if (!this.cpu) {
            if (this.cursor[this.up].isDown) {
                this.y -= this.velocity * delta;
            } else if (this.cursor[this.down].isDown) {
                this.y += this.velocity * delta;
            } else {
                this.setVelocityX(0);
            }
        }
    }
}