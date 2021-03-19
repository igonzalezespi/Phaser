export default class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'Boot',
        });
    }

    preload() {
        const progress = this.add.graphics();

        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(
                0,
                this.sys.game.config.height / 2,
                this.sys.game.config.width * value,
                60,
            );
        });

        this.load.on('complete', () => {
            progress.destroy();
            this.scene.start('Menu');
        });

        // LOAD

        this.load.image('background', 'src/assets/background.png');
        this.load.image('player', 'src/assets/player.png');
        this.load.image('ball', 'src/assets/ball.png');
    }
}