export default class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ball');

        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setBounce(1, 1);
        this.setCollideWorldBounds();
        this.setVelocity(100, 500);
    }
}