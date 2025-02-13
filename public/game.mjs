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

let player;
let playerList = [];
let collectiblesList = [];

function drawHud() {
  context.font = `${FONT_SIZE}px "Press Start 2D"`;
  context.fillStyle = "white";

  context.beginPath();
  context.textAlign = "start";
  context.fillText(`Controls: WASD`, TEXT_PADDING, FONT_SIZE + TEXT_PADDING);
  context.closePath();
  
  context.beginPath();
  context.textAlign = "end";
  context.fillText(`Rank: ${ player?.calculateRank(playerList) ?? 0 } / ${playerList.length}`, canvas.width - TEXT_PADDING, FONT_SIZE + TEXT_PADDING);
  context.closePath();

  context.beginPath();
  const text = `Score: ${player?.score ?? 0}`;
  const textWidth = context.measureText(text).width;
  context.textAlign = "start";
  context.fillText(text, (canvas.width - textWidth)/2, FONT_SIZE + TEXT_PADDING);
  context.closePath();

  context.beginPath();
  context.lineWidth = 1;
  context.strokeStyle = 'white';
  context.strokeRect(TEXT_PADDING, 2 * TEXT_PADDING + FONT_SIZE, canvas.width - 2 * TEXT_PADDING, canvas.height - 3 * TEXT_PADDING - FONT_SIZE);
  context.closePath();
}

drawHud();

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
  context.clearRect(0, 0, canvas.width, canvas.height);

  collectiblesList.forEach(collectible => {
    if(player && distance(player.x, player.y, collectible.x, collectible.y) < 46) {
      player.collision(collectible);
      socket.emit('collect', collectible);
      socket.emit('player-move', player);
    }
  });

  drawHud();

  playerList.forEach(player => player.draw(context, document));
  collectiblesList.forEach(collectible => collectible.draw(context, document));
}

setInterval(() => {
  update();
}, 32);


function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}