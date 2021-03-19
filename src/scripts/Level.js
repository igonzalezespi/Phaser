import Limit from './Limit';
import Player from './Player';
import Ball from './Ball';

export default class Level extends Phaser.Scene {
    constructor(level) {
        super({
            key: `Level${level}`,
        });
        this.level = level;
    }

    create() {
        this.updateObjects = []; // Objetos que tienen un update()

        this.player1 = new Player(this, 15, this.cameras.main.height / 2, 1);
        this.player2 = new Player(this, this.cameras.main.width, this.cameras.main.height / 2, 2, this.level === 1);
        this.limits = [
            new Limit(this, 10, this.cameras.main.height / 2),
            new Limit(this, this.cameras.main.width - 10, this.cameras.main.height / 2),
        ];
        this.add.tileSprite(0, 0, this.cameras.main.width * 2, this.cameras.main.height * 2, 'background');
        this.updateObjects.push(this.player1);
        this.updateObjects.push(this.player2);
        this.score = [0, 0];
        this.scoreText = this.add.text(10, 10, 'SCORE: 0 - 0', { color: '#ffffff' });
        this.addBall();
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

        if (this.level === 1 && this.ball) { // CPU
            this.follow(this.ball);
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
        this.collide(this.limits[0], this.ball, this.goal(1));
        this.collide(this.limits[1], this.ball, this.goal(2));
        this.collide(this.player1, this.ball);
        this.collide(this.player2, this.ball);
    }

    addScore(player) {
        this.score[player - 1]++;
        this.scoreText.setText(`SCORE: ${this.score[0]} - ${this.score[1]}`);
    }

    goal(playerNumber) {
        return () => {
            this.addScore(playerNumber);
            this.ball.destroy();
            if (this.score[playerNumber - 1] === 3) {
                this.scene.stop();
                this.scene.start('GameOver');
            } else {
                setTimeout(() => this.addBall(), 1000);
            }
        };
    }

    follow(ball) {
        this.player2.y = ball.y;
    }
}