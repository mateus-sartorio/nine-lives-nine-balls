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

let playerList = [];

const min = 50;
const max = 300;
function getRandomNumber() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawHud() {
  context.font = `${FONT_SIZE}px "Press Start 2D"`;
  context.fillStyle = "white";

  context.beginPath();
  context.textAlign = "start";
  context.fillText(`Controls: WASD`, TEXT_PADDING, FONT_SIZE + TEXT_PADDING);
  context.closePath();
  
  context.beginPath();
  context.textAlign = "end";
  context.fillText(`Rank: 1 / 1`, canvas.width - TEXT_PADDING, FONT_SIZE + TEXT_PADDING);
  context.closePath();

  context.beginPath();
  const text = "Coin Race";
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

console.log(socket.id)

let player = new Player({ id: socket.id, x: getRandomNumber(), y: getRandomNumber(), score: 0, id: socket.id });
socket.emit('player-move', player);

socket.on('player-list', (payload) => {
  playerList = payload.map(player => new Player({ ...player }));
  console.log(playerList);
  update();
});

socket.on('update-player', (payload) => {
  player = new Player({ ...player, ...payload });
  console.log("player is: ", { player });
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

  console.log("sendin with", {player})

  socket.emit('player-move', player);
});

function update() {
  // requestAnimationFrame(update);
  context.clearRect(TEXT_PADDING + 1, 2 * TEXT_PADDING + FONT_SIZE + 1, canvas.width - 2 * TEXT_PADDING - 1, canvas.height - 3 * TEXT_PADDING - FONT_SIZE - 1);
  playerList.forEach(player => player.draw(context, document));
}











// class Circle {
//   constructor(x, y, radius, color, width, text, speed) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = color;
//     this.width = width;
//     this.text = text;
//     this.speed = speed;

//     this.collisionWithWallsCount = 0;
//   }

//   draw(context) {
//     context.beginPath();

//     context.strokeStyle = this.color;
//     context.textAlign = "center";
//     context.textBaseline = "middle";
//     context.font = `${this.radius/2}px Arial`
//     context.fillText(`${this.text}`, this.x, this.y);

//     context.strokeStyle = this.color;
//     context.lineWidth = this.width;
//     context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     context.stroke();
//     context.closePath();
//   }

//   update(context) {
//     this.draw(context);

//     // if(((this.x + this.radius) > canvas.width) || ((this.x - this.radius) < 0)) {
//     //   this.dx = -this.dx;
//     //   this.collisionWithWallsCount++;
//     // }

//     // if(((this.y + this.radius) > canvas.height) || ((this.y - this.radius) < 0)) {
//     //   this.dy = -this.dy;
//     //   this.collisionWithWallsCount++;
//     // }

//     // this.x += this.dx;
//     // this.y += this.dy;
//   }
// }

// const staticCircle = new Circle(200, 200, 25, "white", 2, "A", 10);
// staticCircle.draw(context);

// function update() {
//   requestAnimationFrame(update);
//   context.clearRect(TEXT_PADDING + 1, 2 * TEXT_PADDING + FONT_SIZE + 1, canvas.width - 2 * TEXT_PADDING - 2, canvas.height - 3 * TEXT_PADDING - FONT_SIZE - 2);
//   staticCircle.update(context);
// }

// update();

// if(getDistance(movingCircle.x, movingCircle.y, staticCircle.x, staticCircle.y) < movingCircle.radius + staticCircle.radius) {
//   movingCircle.color = "red";
//   staticCircle.color = "red";
// }
// else {
//   movingCircle.color = "black";
//   staticCircle.color = "black";
// }
// function getDistance(x1, y1, x2, y2) {
//   return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
// }

// update();

// class Image {
//   constructor(path, x, y, width, height) {
//     this.path = path;
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//   }

//   draw() {
//     const image = document.createElement("img");
//     image.src = this.path;
//     image.alt = "test";
//     image.id = "what";

//     image.onload = () => {
//       context.drawImage(image, this.x, this.y, this.width, this.height);
//     }
//   }
// }

// const image = new Image("/public/character.png", 50, 50, 360, 360);
// image.draw();

// canvas.addEventListener('click', (event) => {
//   const rect = canvas.getBoundingClientRect();

//   const x = event.clientX - rect.left;
//   const y = event.clientY - rect.top;

//   if(getDistance(x, y, staticCircle.x, staticCircle.y) < staticCircle.radius) {
//     staticCircle.onClick();
//   }
// });

// const data = [ 200, 150, 170, 100, 80, 50, 350, 200, 200, 230 ];
// const startValue = data[0];
// const distance = canvas.width / data.length;
// const startPoint = 0;

// context.beginPath();

// context.moveTo(startPoint, startValue);

// data.forEach((value, index) => {
//   const newDistance = startPoint + (distance * (index + 1));
//   context.lineTo(newDistance, value);
// })

// context.fillStyle = 'grey';
// context.fill();
// context.stroke();

// context.closePath();