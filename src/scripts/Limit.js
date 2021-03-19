export default class Limit extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setImmovable(true);
        this.setScale(0.2, this.scene.cameras.main.height);
    }
}