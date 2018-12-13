// let's go!
require('dotenv').config({path: './.env'});
const createServer = require('./createServer');
const db = require('./db');
const cookieParser = require('cookie-parser');
const server = createServer();
const jwt  = require('jsonwebtoken');
server.express.use(cookieParser())
// TODO use express middleware to populate current users
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const {userId} = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});


server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, deets => {
  console.log(`Server running on port http://localhost:${deets.port}`);
});