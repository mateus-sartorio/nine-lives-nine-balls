import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

canvas.style.background = "yellow";

class Circle {
  constructor(x, y, radius, color, width, text, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.width = width;
    this.text = text;
    this.dx = 1 * speed;
    this.dy = 1 * speed;
  }

  draw(context) {
    context.beginPath();

    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `${this.radius/3}px Arial`
    context.fillText(this.text, this.x, this.y);

    context.strokeStyle = this.color;
    context.lineWidth = this.width;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.draw(context);

    if(((this.x + this.radius) > canvas.width) || ((this.x - this.radius) < 0)) {
      this.dx = -this.dx;
    }

    if(((this.y + this.radius) > canvas.height) || ((this.y - this.radius) < 0)) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

  }
}

const circle = new Circle(100, 100, 50, "black", 1, "cool text", 10);
circle.draw(context);

function update() {
  requestAnimationFrame(update);
  circle.update(context);
}

update();