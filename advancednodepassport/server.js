'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./db/connection.js');
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
const auth = require("./db/auth.js");
const routes = require('./routes/routes.js');
const todoRoutes = require('./routes/todolistApi.js');
const Messages = require("./db/models/messageModel.js");

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const URI = process.env.MONGO_URI;
const store = new MongoStore({ url: URI });

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(cors({origin: "*"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  key: 'express.sid',
  store: store
}));

app.use(passport.initialize());
app.use(passport.session());

//app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
  console.log("______________________");
  console.log(new Date().toUTCString());
  console.log(req.method);
  console.log(req.path);
  next();
})

io.use(
  passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: 'express.sid',
    secret: process.env.SESSION_SECRET,
    store: store,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
  })
);

myDB(async client => {
  routes(app);
  todoRoutes(app);
  auth(app);
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });

  let currentUsers = 0;

  io.on("connection", async (socket) => {
    console.log(`${socket.request.user.username} has connected to socket`);
    ++currentUsers;
    let lastMessages;
    try {
      await Messages.find({})
        .then((result) => {lastMessages = result})
        .catch((err) => {console.log("error fetching messages")});
    } catch(err) {
      console.log("Error retrieving messages");
    }

    io.emit('user', {
      username: socket.request.user.username,
      currentUsers,
      connected: true
    });

    io.emit("last_messages", {messageList: lastMessages});

    socket.on('send_message', async (data) => {
      console.log(socket.request.user.username + " sent message");
      let messages;
      try {
        await Messages.create({
          username: socket.request.user.username,
          messageText: data.message,
          date: new Date().toUTCString()
        });
        await Messages.find({})
          .then((result) => {messages = result})
          .catch((err) => {console.log("error fetching messages")});
      } catch(err) {
        console.log(err);
      }

      io.emit('message_received', {
        messageList: messages
      });
    });

    socket.on('disconnect', () => {
      --currentUsers;
      console.log(`${socket.request.user.username} disconnected`)

      io.emit("user", {
        username: socket.request.user.username,
        currentUsers,
        connected: false
      });
    });
  })

}).catch(e => {
  app.route('/').get((req, res) => {
    res.render('index', { title: e, message: 'Unable to connect to database' });
  });
});

function onAuthorizeSuccess(data, accept) {
  console.log('successful connection to socket.io');
  accept(null, true);
}

function onAuthorizeFail(data, message, error, accept) {
  if (error) throw new Error(message);
  console.log('failed connection to socket.io:', message);
  accept(null, false);
}

// app.listen out here...
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});