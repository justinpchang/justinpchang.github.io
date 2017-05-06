class Planet {
    constructor(game, x, y, mass) {
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.planet = game.add.sprite(x, y, 'planetgreen');
        this.planet.anchor.set(0.5, 0.5);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getMass() {
        return this.mass;
    }

    // change color of planet to red once the planet has been 'visited'
    changeColor() {
        this.planet.loadTexture('planetred');
    }

    destroy() {
        this.planet.destroy();
    }

    isOverlapping(x, y) {
        return this.planet.getBounds().contains(x, y);
    }
}
