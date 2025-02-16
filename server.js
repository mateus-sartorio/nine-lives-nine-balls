require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const socket = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const { getRandomPosition } = require('./utils.js');
const { uuid } = require('uuidv4');
const {
  PLAYER_SIZE,
  COLLECTBLE_SIZE
} = require('./constants.js');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();
const server = createServer(app);
const io = socket(server);

app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }));

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({origin: '*'})); 

// Index page (static HTML)
app.route('/')
  .get(function (_req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(_req, res) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

let playerList = [];
let collectiblesList = [];

setInterval(() => {
  if(collectiblesList.length < 10 * playerList.length) {
    collectiblesList.push({ id: uuid(), ...getRandomPosition(COLLECTBLE_SIZE), value: 1 });
    io.emit('collectibles-list', collectiblesList);
  }
}, 1000);

io.on('connection', socket => {
  console.log('A user has connected');

  const newPlayer = { id: socket.id, ...getRandomPosition(PLAYER_SIZE), score: 0 };
  playerList.push(newPlayer);

  io.emit('collectibles-list', collectiblesList);
  io.emit('player-list', playerList);
  socket.emit('update-player', newPlayer);

  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  
    playerList = playerList.filter(player => player.id !== socket.id);
  
    io.emit('player-list', playerList);
  });

  socket.on('player-move', (payload) => {
    playerList = playerList.map(player => player.id !== socket.id ? player : { ...payload });
    io.emit('player-list', playerList);
    socket.emit('update-player', payload);
  });

  socket.on('collect', (payload) => {
    collectiblesList = collectiblesList.filter(collectible => collectible.id !== payload.id);
    io.emit('collectibles-list', collectiblesList);
  });
});

// Set up server and tests
server.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

module.exports = app; // For testing