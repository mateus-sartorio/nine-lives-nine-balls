import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

const TEXT_PADDING = 10;
const FONT_SIZE = 16;

const PLAYER_SPEED = 10;

canvas.style.background = "#222200";
canvas.tabIndex = 0;
canvas.focus();

// Double buffering setup
const buffer = document.createElement('canvas');
buffer.width = canvas.width;
buffer.height = canvas.height;
const bufferContext = buffer.getContext('2d');

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

document.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'w':
    case 'W':
      player.movePlayer("UP", PLAYER_SPEED);
      break;
    case 'a':
    case 'A':
      player.movePlayer("LEFT", PLAYER_SPEED);
      break;
    case 's':
    case 'S':
      player.movePlayer("DOWN", PLAYER_SPEED);
      break;
    case 'd':
    case 'D':
      player.movePlayer("RIGHT", PLAYER_SPEED);
      break;
    default:
      break;
  }

  socket.emit('player-move', player);
});

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
}, 32);


function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}