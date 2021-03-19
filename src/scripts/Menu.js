export default class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu',
        });
    }

    create() {
        this.text = this.add.text(this.sys.game.config.width / 2 - 60, this.sys.game.config.height / 2 - 10, 'Pulse "1" para modo UN JUGADOR', { color: '#ffffff' });
        this.text = this.add.text(this.sys.game.config.width / 2 - 75, this.sys.game.config.height / 2 + 10, 'Pulse "2" para modo DOS JUGADORES', { color: '#ffffff' });
        this.startSingleKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.startMultiKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    }

    update() {
        if (this.startSingleKey.isDown) {
            this.startSingle();
        } else if (this.startMultiKey.isDown) {
            this.startMulti();
        }
    }

    startSingle() {
        this.scene.stop();
        this.scene.start('Level1');
    }

    startMulti() {
        this.scene.stop();
        this.scene.start('Level2');
    }
}