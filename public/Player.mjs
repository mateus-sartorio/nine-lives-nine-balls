const playerMoviments = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  diagonalUpRight: { x: 1, y: -1 },
  diagonalUpLeft: { x: -1, y: -1 },
  diagonalDownRight: { x: 1, y: 1 },
  diagonalDownLeft: { x: -1, y: 1 }
};

class Player {
  constructor({x, y, score, id}) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
  }

  movePlayer(dir, speed) {
    this.x += playerMoviments[dir].x * speed;
    this.y += playerMoviments[dir].y * speed;
  }

  collision(item) {
    this.score += item.value;
  }

  calculateRank(arr) {
    return arr.sort((a, b) => b.score - a.score).findIndex(a => a.id === this.id) + 1;
  }
}

export default Player;
