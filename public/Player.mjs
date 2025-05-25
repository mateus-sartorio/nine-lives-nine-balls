import {
  TEXT_PADDING,
  FONT_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  LINE_WIDTH
} from './constants.mjs';

export const PLAYER_SIZE = 36;
const PLAYER_SPEED = 10;

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

const playerImages = Array.from({ length: 9 }, (_, i) => i + 1).map(playerImageIndex => {
  const image = new Image();
  image.src = `/public/assets/player/cat_${playerImageIndex}.png`;

  return image;
});

class Player {
  constructor({ x, y, score, id, playerImageIndex }) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
    this.playerImageIndex = playerImageIndex;
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
    if (playerImages[this.playerImageIndex - 1].complete) {
      context.drawImage(playerImages[this.playerImageIndex - 1], this.x, this.y, PLAYER_SIZE, PLAYER_SIZE);
    }
  }
}

export default Player;