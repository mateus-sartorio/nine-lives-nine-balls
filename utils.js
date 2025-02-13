const min = 50;
const max = 300;

function getRandomNumber() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { getRandomNumber };