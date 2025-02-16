const PLAYER_SIZE = 36;
const PLAYER_SPEED = 10;

const playerImage = new Image();
playerImage.src = '/public/character.png';

const diagnonalMovementCorrectionFactor = 1/Math.sqrt(2);

const playerMoviments = new Map([
  [ "UP", { x: 0, y: -1 } ],
  [ "DOWN", { x: 0, y: 1 } ],
  [ "LEFT", { x: -1, y: 0 } ],
  [ "RIGHT", { x: 1, y: 0 } ],
  [ "DIAGONAL_UP_RIGHT", { x: diagnonalMovementCorrectionFactor, y: -diagnonalMovementCorrectionFactor } ],
  [ "DIAGONAL_UP_LEFT", { x: -diagnonalMovementCorrectionFactor, y: -diagnonalMovementCorrectionFactor } ],
  [ "DIAGONAL_DOWN_RIGHT", { x: diagnonalMovementCorrectionFactor, y: diagnonalMovementCorrectionFactor } ],
  [ "DIAGONAL_DOWN_LEFT", { x: -diagnonalMovementCorrectionFactor, y: diagnonalMovementCorrectionFactor } ]
]);

class Player {
  constructor({ x, y, score, id }) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
  }

  movePlayer(dir) {
    this.x += playerMoviments.get(dir).x * PLAYER_SPEED;
    this.y += playerMoviments.get(dir).y * PLAYER_SPEED;

    console.log("Player after it moved: ", { x: this.x, y: this.y });
  }

  collision(item) {
    this.score += item.value;
  }

  calculateRank(arr) {
    return arr.sort((a, b) => b.score - a.score).findIndex(a => a.id === this.id) + 1;
  }

  draw(context, document) {
    if (playerImage.complete) {
      context.drawImage(playerImage, this.x, this.y, PLAYER_SIZE, PLAYER_SIZE);
    }
  }
}

export default Player;
