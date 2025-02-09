const playerMoviments = new Map([
  [ "UP", { x: 0, y: -1 } ],
  [ "DOWN", { x: 0, y: 1 } ],
  [ "LEFT", { x: -1, y: 0 } ],
  [ "RIGHT", { x: 1, y: 0 } ],
  [ "DIAGONAL_UP_RIGHT", { x: 1, y: -1 } ],
  [ "DIAGONAL_UP_LEFT", { x: -1, y: -1 } ],
  [ "DIAGONAL_DOWN_RIGHT", { x: 1, y: 1 } ],
  [ "DIAGONAL_DOWN_LEFT", { x: -1, y: 1 } ]
]);

class Player {
  constructor({x, y, score, id}) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
  }

  movePlayer(dir, speed) {
    this.x += playerMoviments.get(dir).x * speed;
    this.y += playerMoviments.get(dir).y * speed;
  }

  collision(item) {
    this.score += item.value;
  }

  calculateRank(arr) {
    return arr.sort((a, b) => b.score - a.score).findIndex(a => a.id === this.id) + 1;
  }
}

export default Player;
