export default class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction, size = 1) {
        super(scene, x + (direction * 100), y, 'ball');

        this.scene = scene;
        this.direction = direction;
        this.size = size;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setBounce(1, 1);
        this.setCollideWorldBounds();
        this.setVelocity(100 * direction * -1, 500);

        this.setScale(size);
    }
}