import Player from './Player';
import Ball from './Ball';

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level1',
        });
        this.numberOfBalls = 2;
        this.directions = [1, -1];
    }

    create() {
        this.updateObjects = []; // Objetos que tienen un update()
        this.balls = [];

        this.player = new Player(this, this.cameras.main.width, this.cameras.main.height);
        for (let i = 0; i < this.numberOfBalls; i++) {
            this.addBall(null, null, this.directions[i]);
        }
        this.updateObjects.push(this.player);
        this.scoreText = this.add.text(10, 10, '', { color: '#ffffff' });
        this.lifesText = this.add.text(this.cameras.main.width - 100, 10, '', { color: '#ffffff' });
        this.setScore(0);
        this.setLifes(2);
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

    collidePlayerBall() {
        this.setLifes(this.lifes - 1);
        if (this.lifes === 0) {
            this.updateObjects = [];
            this.scene.restart();
        }
    }

    addBall(x, y, direction, size) {
        const ball = new Ball(
            this,
            x || this.cameras.main.width / 2,
            y || this.cameras.main.height / 2,
            direction,
            size,
        );
        this.collide(this.player, ball, this.collidePlayerBall.bind(this));
        for (const b of this.balls) {
            this.collide(ball, b);
        }
        this.balls.push(ball);
    }

    destroyBall(ball) {
        for (let i = 0; i < this.balls.length; i++) {
            if (this.balls[i] === ball) {
                this.balls.splice(i, 1);
                break;
            }
        }
        this.setScore(this.score + 1);
        if (ball.size > 0.25) {
            this.addBall(ball.x, ball.y, ball.direction, ball.size * 0.5);
            this.addBall(ball.x, ball.y, -ball.direction, ball.size * 0.5);
        }
        ball.destroy();
        if (!this.balls.length) {
            // this.scene.stop();
            // this.scene.start('Level1');
        }
    }

    setScore(x) {
        this.score = x;
        this.scoreText.setText(`SCORE: ${x}`);
    }

    setLifes(x) {
        this.lifes = x;
        this.lifesText.setText(`LIFES: ${x}`);
    }
}