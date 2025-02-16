export const COLLECTBLE_SIZE = 36;

const collectibleImage = new Image();
collectibleImage.src = '/public/item.png';

class Collectible {
  constructor({ x, y, value, id }) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.id = id;
  }

  draw(context) {
    if (collectibleImage.complete) {
      context.drawImage(collectibleImage, this.x, this.y, COLLECTBLE_SIZE, COLLECTBLE_SIZE);
    }
  }
}

/*
  Note: Attempt to export this for use
  in server.js
*/
try {
  module.exports = Collectible;
} catch(e) {}

export default Collectible;
