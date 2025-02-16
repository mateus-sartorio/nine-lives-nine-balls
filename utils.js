const {
  TEXT_PADDING,
  FONT_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  LINE_WIDTH,
} = require('./constants.js');

function getRandomNumber({ min = 0, max = 100 } = {}) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPosition(entitySize) {
  return {
    x: getRandomNumber({ min: TEXT_PADDING + LINE_WIDTH, max: CANVAS_WIDTH - entitySize - TEXT_PADDING - LINE_WIDTH }),
    y: getRandomNumber({ min: 2 * TEXT_PADDING + FONT_SIZE + LINE_WIDTH, max: CANVAS_HEIGHT - entitySize - TEXT_PADDING - LINE_WIDTH })
  };
}

module.exports = { getRandomNumber, getRandomPosition };