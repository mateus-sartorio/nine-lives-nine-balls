class Collectible {
  constructor({ x, y, value, id }) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.id = id;
  }

  draw(context, document) {
    const image = document.createElement("img");
    image.src = "/public/item.png";
    image.alt = "test";

    image.onload = () => {
      context.drawImage(image, this.x, this.y, 36, 36);
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
