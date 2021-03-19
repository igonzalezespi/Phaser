import Boot from './scripts/Boot';
import Level1 from './scripts/Level1';
import Level2 from './scripts/Level2';
import Menu from './scripts/Menu';
import GameOver from './scripts/GameOver';

// eslint-disable-next-line no-new
new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
        Menu,
        Level1,
        Level2,
        GameOver,
    ],
});