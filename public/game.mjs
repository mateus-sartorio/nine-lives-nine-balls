import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

canvas.style.background = "yellow";

class Circle {
  constructor(x, y, radius, color, width, text) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.width = width;
    this.text = text;
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
}

const circle = new Circle(100, 100, 50, "black", 1, "cool text");
circle.draw(context);