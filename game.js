var gameSettings = {
  playerSpeed: 200
}

var config = {
  width: 2048,
  height: 2048,
  backgroundColor: 0x000000,
  scene: [BootGame, PlayGame, Menu],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      debugShowVelocity: false
    }
  }
}

var game = new Phaser.Game(config);