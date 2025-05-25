export const COLLECTIBLE_SIZE = 30;

function getImageWithSource(src) {
  const image = new Image();
  image.src = src;

  return image;
}

const collectibleImagesMap = new Map([
  [1, getImageWithSource("/public/assets/collectibles/ball_1.png")],
  [3, getImageWithSource("/public/assets/collectibles/ball_3.png")],
  [8, getImageWithSource("/public/assets/collectibles/ball_8.png")],
]);

class Collectible {
  constructor({ x, y, value, id }) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.id = id;
  }

  draw(context) {
    if (collectibleImagesMap.get(this.value).complete) {
      context.drawImage(collectibleImagesMap.get(this.value), this.x, this.y, COLLECTIBLE_SIZE, COLLECTIBLE_SIZE);
    }
  }
}

try {
  module.exports = Collectible;
} catch(e) {}

export default Collectible;
