import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

canvas.style.background = "#000";

class Circle {
  constructor(x, y, radius, color, width = 1) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.width = width;
  }

  draw() {
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = this.width;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }
}

const circle = new Circle(10, 10, 10, "white");
debugger;
circle.draw();