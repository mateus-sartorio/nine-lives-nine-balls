import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

canvas.style.background = "#ff00ff";

context.fillStyle = "#ff0000";
context.fillRect(0, 0, 100, 100);
context.fillRect(0, 0, 200, 200);

context.beginPath();
context.strokeStyle = "blue";
context.lineWidth = 5;
context.arc(100, 100, 50, 0, Math.PI * 2, false);
context.stroke();
context.closePath();