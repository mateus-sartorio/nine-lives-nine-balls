import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

const TEXT_PADDING = 10;
const FONT_SIZE = 16;

canvas.style.background = "#222200";
canvas.tabIndex = 0;
canvas.focus();

// Double buffering setup
const buffer = document.createElement('canvas');
buffer.width = canvas.width;
buffer.height = canvas.height;
const bufferContext = buffer.getContext('2d');

const keysPressed = {};

let player;
let playerList = [];
let collectiblesList = [];

function drawHud(targetContext) {
  targetContext.font = `${FONT_SIZE}px "Press Start 2D"`;
  targetContext.fillStyle = "white";

  targetContext.beginPath();
  targetContext.textAlign = "start";
  targetContext.fillText(`Controls: WASD`, TEXT_PADDING, FONT_SIZE + TEXT_PADDING);
  targetContext.closePath();
  
  targetContext.beginPath();
  targetContext.textAlign = "end";
  targetContext.fillText(`Rank: ${ player?.calculateRank(playerList) ?? 0 } / ${playerList.length}`, canvas.width - TEXT_PADDING, FONT_SIZE + TEXT_PADDING);
  targetContext.closePath();

  targetContext.beginPath();
  const text = `Score: ${player?.score ?? 0}`;
  const textWidth = targetContext.measureText(text).width;
  targetContext.textAlign = "start";
  targetContext.fillText(text, (canvas.width - textWidth)/2, FONT_SIZE + TEXT_PADDING);
  targetContext.closePath();

  targetContext.beginPath();
  targetContext.lineWidth = 1;
  targetContext.strokeStyle = 'white';
  targetContext.strokeRect(TEXT_PADDING, 2 * TEXT_PADDING + FONT_SIZE, canvas.width - 2 * TEXT_PADDING, canvas.height - 3 * TEXT_PADDING - FONT_SIZE);
  targetContext.closePath();
}

socket.on('player-list', (payload) => {
  playerList = payload.map(player => new Player({ ...player }));
});

socket.on('update-player', (payload) => {
  player = new Player({ ...payload });
});

socket.on('collectibles-list', (payload) => {
  collectiblesList = payload.map(collectible => new Collectible({ ...collectible }));
});

// Event listeners to update key states
document.addEventListener('keydown', (event) => {
  keysPressed[event.key] = true; // Mark key as pressed
  handleMovement();
});

document.addEventListener('keyup', (event) => {
  keysPressed[event.key] = false; // Mark key as released
  handleMovement();
});

// Function to check if multiple keys are pressed
function areKeysPressed(...keys) {
  return keys.every(key => keysPressed[key]);
}

// Example usage in your game loop or event handler
function handleMovement() {
  if (areKeysPressed('w', 'a')) {
    player.movePlayer("DIAGONAL_UP_LEFT");
  } else if (areKeysPressed('w', 'd')) {
    player.movePlayer("DIAGONAL_UP_RIGHT");
  } else if (areKeysPressed('s', 'a')) {
    player.movePlayer("DIAGONAL_DOWN_LEFT");
  } else if (areKeysPressed('s', 'd')) {
    player.movePlayer("DIAGONAL_DOWN_RIGHT");
  } else if (keysPressed['w']) {
    player.movePlayer("UP");
  } else if (keysPressed['a']) {
    player.movePlayer("LEFT");
  } else if (keysPressed['s']) {
    player.movePlayer("DOWN");
  } else if (keysPressed['d']) {
    player.movePlayer("RIGHT");
  }

  socket.emit('player-move', player);

}

function update() {
  // Clear buffer with background color
  bufferContext.fillStyle = "#222200";
  bufferContext.fillRect(0, 0, buffer.width, buffer.height);

  collectiblesList.forEach(collectible => {
    if(player && distance(player.x, player.y, collectible.x, collectible.y) < 46) {
      player.collision(collectible);
      socket.emit('collect', collectible);
      socket.emit('player-move', player);
    }
  });

  drawHud(bufferContext);

  playerList.forEach(player => player.draw(bufferContext, document));
  collectiblesList.forEach(collectible => collectible.draw(bufferContext, document));

  // Draw buffer to main canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(buffer, 0, 0);
}

setInterval(() => {
  update();
}, 16);


function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}