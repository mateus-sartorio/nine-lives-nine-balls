import Player, { PLAYER_SIZE } from './Player.mjs';
import Collectible, { COLLECTBLE_SIZE } from './Collectible.mjs';
import {  distance } from './utils.mjs';
import {  TEXT_PADDING, FONT_SIZE, LINE_WIDTH } from './constants.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

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
  targetContext.lineWidth = LINE_WIDTH;
  targetContext.strokeStyle = 'white';
  targetContext.strokeRect(TEXT_PADDING, 2 * TEXT_PADDING + FONT_SIZE, canvas.width - 2 * TEXT_PADDING, canvas.height - 3 * TEXT_PADDING - FONT_SIZE);
  targetContext.closePath();
}

socket.on('player-list', (payload) => {
  playerList = payload.map(player => new Player({ ...player }));
  console.log(playerList)
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
  }
  else if (areKeysPressed('w', 'd')) {
    player.movePlayer("DIAGONAL_UP_RIGHT");
  }
  else if (areKeysPressed('s', 'a')) {
    player.movePlayer("DIAGONAL_DOWN_LEFT");
  }
  else if (areKeysPressed('s', 'd')) {
    player.movePlayer("DIAGONAL_DOWN_RIGHT");
  }
  else if (areKeysPressed('w')) {
    player.movePlayer("UP");
  }
  else if (areKeysPressed('a')) {
    player.movePlayer("LEFT");
  }
  else if (areKeysPressed('s')) {
    player.movePlayer("DOWN");
  }
  else if (areKeysPressed('d')) {
    player.movePlayer("RIGHT");
  }

  socket.emit('player-move', player);
}

function update() {
  // Clear buffer with background color
  bufferContext.fillStyle = "#222200";
  bufferContext.fillRect(0, 0, buffer.width, buffer.height);

  collectiblesList.forEach(collectible => {
    if(player && distance(player.x, player.y, collectible.x, collectible.y) < PLAYER_SIZE + COLLECTBLE_SIZE) {
      player.collision(collectible);
      socket.emit('collect', collectible);
      socket.emit('player-move', player);
    }
  });

  drawHud(bufferContext);

  playerList.forEach(player => player.draw(bufferContext));
  collectiblesList.forEach(collectible => collectible.draw(bufferContext));

  // Draw buffer to main canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(buffer, 0, 0);
}

setInterval(() => {
  update();
}, 32);