import {
  TEXT_PADDING,
  FONT_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  LINE_WIDTH
} from './constants.mjs';

export const PLAYER_SIZE = 36;
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

    if(this.x < TEXT_PADDING + LINE_WIDTH) {
      this.x = TEXT_PADDING + LINE_WIDTH;
    }

    if(this.x > CANVAS_WIDTH - PLAYER_SIZE - TEXT_PADDING - LINE_WIDTH) {
      this.x = CANVAS_WIDTH - PLAYER_SIZE - TEXT_PADDING - LINE_WIDTH;
    }

    if(this.y < 2 * TEXT_PADDING + FONT_SIZE + LINE_WIDTH) {
      this.y = 2 * TEXT_PADDING + FONT_SIZE + LINE_WIDTH;
    }

    if(this.y > CANVAS_HEIGHT - PLAYER_SIZE - TEXT_PADDING - LINE_WIDTH) {
      this.y = CANVAS_HEIGHT - PLAYER_SIZE - TEXT_PADDING - LINE_WIDTH;
    }
  }

  collision(item) {
    this.score += item.value;
  }

  calculateRank(arr) {
    return arr.sort((a, b) => b.score - a.score).findIndex(a => a.id === this.id) + 1;
  }

  draw(context) {
    if (playerImage.complete) {
      context.drawImage(playerImage, this.x, this.y, PLAYER_SIZE, PLAYER_SIZE);
    }
  }
}

export default Player;
