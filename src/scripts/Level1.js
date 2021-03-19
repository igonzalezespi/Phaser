import Player from './Player';
import Ball from './Ball';

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level1',
        });
    }

    create() {
        this.updateObjects = []; // Objetos que tienen un update()

        this.player1 = new Player(this, this.cameras.main.width, this.cameras.main.height / 2, 1);
        this.player2 = new Player(this, 20, this.cameras.main.height / 2, 2);
        this.add.tileSprite(0, 0, this.cameras.main.width * 2, this.cameras.main.height * 2, 'background');
        this.updateObjects.push(this.player1);
        this.updateObjects.push(this.player2);
        this.scoreText = this.add.text(10, 10, '', { color: '#ffffff' });
        this.setScore(0, 0);
    }

    update(time, delta) {
        // Al revés para poder borrar elementos
        for (let i = this.updateObjects.length - 1; i >= 0; i--) {
            try {
                this.updateObjects[i].update(time, delta);
            } catch (e) {
                console.error(e);
                this.updateObjects.splice(i, 1);
            }
        }
    }

    collide(obj1, obj2, cb) {
        this.physics.add.collider(obj1, obj2, cb);
    }

    addBall() {
        this.ball = new Ball(
            this,
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
        );
        this.collide(this.player1, this.ball);
    }

    setScore(x1, x2) {
        this.score = [x1, x2];
        this.scoreText.setText(`SCORE: ${x1} - ${x2}`);
    }
}