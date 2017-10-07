module.exports = function Route(app, server, connectedUsers, conversations){
    var io = require('socket.io').listen(server);

    // Root route to render the index.ejs view.
    app.get('/', function(req, res) {
        res.render("index", {count: conversations});
    })

    io.sockets.on('connection', function (socket) {
        console.log("Client/socket is connected!");
        console.log("Client/socket id is: ", socket.id);
        // all the server socket code goes in here
        socket.on("got_a_new_user", function (data){
            console.log(connectedUsers);
            console.log(data.name);
            console.log("this is my socket session"+socket.id);
            connectedUsers[socket.id] = data.name;
            console.log(connectedUsers);
            // add user to object then emit it
            io.emit('convos', {convos: conversations});
        })
        socket.on("posting_form", function (data){
            console.log(data.message);
            console.log(data);
            console.log("this is my socket session2"+socket.id);
            console.log("this is the name of messenger"+ connectedUsers[socket.id]);
            console.log(conversations);
            conversations.push({name: connectedUsers[socket.id], message: data.message});
            console.log(conversations);
            // add user to object then emit it
            io.emit('convos', {convos: conversations});
        })
        socket.on('disconnect', function () {
            console.log(connectedUsers);
            console.log('User disconnected');
            // notifier.notify(`User disconnected: ${connectedUsers[socket.id]}`);
            io.emit('notifications', {message: connectedUsers[socket.id] });
            delete connectedUsers[socket.id];
            console.log("notif sent and who is left"+connectedUsers);
          });
    })
};