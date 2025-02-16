const TEXT_PADDING = 10;
const FONT_SIZE = 16;
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;
const LINE_WIDTH = 1;
const PLAYER_SIZE = 36;
const COLLECTIBLE_SIZE = 30;

const INDEX_TO_COLLECTIBLE_VALUE_MAP = (value) => {
  if(value <= 24) {
    return 1;
  }

  if(value <= 32) {
    return 3;
  }

  return 8;
};

module.exports = {
  TEXT_PADDING,
  FONT_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  LINE_WIDTH,
  PLAYER_SIZE,
  COLLECTIBLE_SIZE,
  INDEX_TO_COLLECTIBLE_VALUE_MAP
};