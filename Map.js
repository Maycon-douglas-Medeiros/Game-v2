class Map extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        var x = 50;
        var y = 50;

        super(scene, x, y, 'map');

        this.scene = scene;
        this.propsGroup = scene.physics.add.group();
        this.enemiesGroup = scene.physics.add.group();
    }

    createMap(imageKey) {
        var image = this.scene.textures.get(imageKey).getSourceImage();
        var canvas = this.scene.textures.createCanvas('canvas', image.width, image.height);
        var ctx;

        if (canvas) {
            ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);

            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;
            for (var y = 0; y < canvas.height; y++) {
                for (var x = 0; x < canvas.width; x++) {
                    var index = (x + y * canvas.width) * 4;
                    var red = data[index];
                    var green = data[index + 1];
                    var blue = data[index + 2];
                    var hexColor = this.rgbToHex(red, green, blue);

                    if (hexColor == '#cfff70') {
                        var walls = this.teste(imageKey);
                        walls.x = x * 32;
                        walls.y = y * 32;
                        walls.setOrigin(0, 0);
                        this.propsGroup.add(walls);
                    } else if (hexColor == '#00ff00') {
                        var crystal = new Crystal(this.scene, 0);
                        crystal.x = x * 32;
                        crystal.y = y * 32;
                        crystal.setOrigin(0, 0);
                        this.propsGroup.add(crystal);
                    } else if (hexColor == '#0016ff') {
                        this.scene.caveProps = this.scene.add.tileSprite(x * 32, y * 32, 32, 32, "caveProps", 5);
                        this.scene.caveProps.setOrigin(0, 0);
                    } else if (hexColor == '#f4ff00') {
                        this.scene.caveProps = this.scene.add.tileSprite(x * 32, y * 32, 32, 32, 'caveProps', 7);
                    } else if (hexColor == '#000000') {
                        this.scene.caveProps = this.scene.add.tileSprite(x * 32, y * 32, 32, 32, 'caveProps', 6);
                        this.scene.caveProps.setOrigin(0, 0);
                    } else if (hexColor == '#ff00de') {
                        var enemy = new Enemy(this.scene, x * 32, y * 32);
                        this.enemiesGroup.add(enemy);
                        enemy.collideWithProps(this.propsGroup); // Adiciona colisão com os props
                    }
                }
            }
        } else {
            console.error("Canvas is null.");
        }
        canvas.destroy();
    }

    teste(i) {
        if (i == 'cave') {
            var walls = new Cave(this.scene);
        } else {
            var walls = new Lab(this.scene);
        }
        return walls;
    }

    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
}
