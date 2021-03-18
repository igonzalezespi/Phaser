import Boot from './scripts/Boot';
import Level1 from './scripts/Level1';

// eslint-disable-next-line no-new
new Phaser.Game({
    type: Phaser.AUTO,
    width: 1024,
    height: 896,
    pixelArt: true,
    parent: 'canvas',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    scene: [
        Boot,
        Level1,
    ],
});