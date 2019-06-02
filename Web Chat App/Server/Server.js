const express = require('express');
var app = express();
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage,generateLocationMessage} = require('./utils/Message.js');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/Users');

const PublicPath = path.join(__dirname , "../public");
const port = process.env.PORT || 3000;
const users = new Users();

var server = http.createServer(app);

app.use(express.static(PublicPath));
var io = socketIO(server);

io.on('connection',(socket)=>{
   console.log("New User connected");

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and Room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.adduser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));

        socket.emit('newMessage',generateMessage('Admin','Welcome to chat room'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
    });

    socket.on('createMessage',(Message,callback)=>{
        console.log('message sent',Message);
        var user = users.getUser(socket.id);

        if(user && isRealString(Message.text)){
            socket.emit('newMessage',generateMessage('You',Message.text));
            socket.broadcast.to(user.room).emit('newMessage',generateMessage(user.name,Message.text));
        }
        callback();
    });

    socket.on('createLocationMessage',(position)=>{
        var user = users.getUser(socket.id);

        socket.emit('newLocationMessage',generateLocationMessage('You',position.latitude, position.longitude));
       socket.broadcast.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,position.latitude, position.longitude));

    });

   socket.on('disconnect',()=>{
      console.log('User disconnected');

      var user = users.removeUser(socket.id);

      if(user){
          io.to(user.room).emit('updateUserList',users.getUserList(user.room));
          io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} left`));
      }
   });
});

server.listen(port,() => {
    console.log("server has started");
});