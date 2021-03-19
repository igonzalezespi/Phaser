export default class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameOver',
        });
    }

    create() {
        this.text = this.add.text(this.sys.game.config.width / 2 - 60, this.sys.game.config.height / 2 - 10, 'GAME OVER', { color: '#ffffff' });
        this.text = this.add.text(
            this.sys.game.config.width / 2 - 75, this.sys.game.config.height / 2 + 10, 'PRESIONE "ENTER" PARA VOLVER A JUGAR', { color: '#ffffff' },
        );
        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (this.restartKey.isDown) {
            this.scene.stop();
            this.scene.start('Menu');
        }
    }
}