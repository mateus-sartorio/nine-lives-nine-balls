import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

canvas.style.background = "yellow";

// class Circle {
//   constructor(x, y, radius, color, width, text, speed) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = color;
//     this.width = width;
//     this.text = text;
//     this.dx = 1 * speed;
//     this.dy = 1 * speed;

//     this.collisionWithWallsCount = 0;
//   }

//   draw(context) {
//     context.beginPath();

//     context.strokeStyle = this.color;
//     context.textAlign = "center";
//     context.textBaseline = "middle";
//     context.font = `${this.radius/3}px Arial`
//     context.fillText(`${this.text}`, this.x, this.y);

//     context.strokeStyle = this.color;
//     context.lineWidth = this.width;
//     context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     context.stroke();
//     context.closePath();
//   }

//   update(context) {
//     this.draw(context);

//     if(((this.x + this.radius) > canvas.width) || ((this.x - this.radius) < 0)) {
//       this.dx = -this.dx;
//       this.collisionWithWallsCount++;
//     }

//     if(((this.y + this.radius) > canvas.height) || ((this.y - this.radius) < 0)) {
//       this.dy = -this.dy;
//       this.collisionWithWallsCount++;
//     }

//     this.x += this.dx;
//     this.y += this.dy;
//   }

//   onClick(context) {
//     console.log("Clicked");
//   }
// }

// const staticCircle = new Circle(200, 200, 100, "black", 2, "A", 0);
// staticCircle.draw(context);

// const movingCircle = new Circle(100, 100, 50, "black", 2, "B", 5);
// movingCircle.draw(context);

// function update() {
//   requestAnimationFrame(update);
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   movingCircle.update(context);
//   staticCircle.update(context);

//   if(getDistance(movingCircle.x, movingCircle.y, staticCircle.x, staticCircle.y) < movingCircle.radius + staticCircle.radius) {
//     movingCircle.color = "red";
//     staticCircle.color = "red";
//   }
//   else {
//     movingCircle.color = "black";
//     staticCircle.color = "black";
//   }
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

const data = [ 200, 150, 170, 100, 80, 50, 350, 200, 200, 230 ];
const startValue = data[0];
const distance = canvas.width / data.length;
const startPoint = 0;

context.beginPath();

context.moveTo(startPoint, startValue);

data.forEach((value, index) => {
  const newDistance = startPoint + (distance * (index + 1));
  context.lineTo(newDistance, value);
})

context.fillStyle = 'grey';
context.fill();
context.stroke();

context.closePath();