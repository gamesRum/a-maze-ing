#!/bin/env node
(function(module) {
  'use strict';

  module.exports = function(http) {
    var io = require('socket.io')(http),
      _ = require('underscore'),
      players = require('./controllers/players'),
      rooms = require('./controllers/rooms'),
      clients = [];

    io.on('connection', function(socket) {
      clients.push(socket);
      players.create(socket.id, 'Monkey');
      players.enter2Room(socket.id, rooms.getStarter().id);
      console.info('CONN: %s', socket.id);

      socket.on('player_move', function(dir) {
        var update = players.move(socket.id, dir);
        socket.emit('player_update', update);
        updateAll();
        console.info('MOVE: %s', socket.id);
      });

      socket.on('disconnect', function() {
        var player = players.get(socket.id),
          index = clients.indexOf(socket.id);
        rooms.deletePlayerFromRoom(player.room, player.id);
        if (index >= 0) {
          clients.splice(index, 1);
        }
        players.delete(socket.id);
        io.emit('player_drop', socket.id);
        console.info('DISC: %s', socket.id);
      });

      io.emit('map_rerender', rooms.get(players.get(socket.id).room).maze);

      function updateAll() {
        var player = players.get(socket.id),
          room = rooms.get(player.room);

        room.players.forEach(function(playerId) {
          var client = _.find(clients, function(client) { return client.id === playerId }),
            otherArray = [],
            playersList = players.getAll();
          for (var player in playersList) {
            if (client.id != playersList[player].id) {
              otherArray.push({
                id: playersList[player].id,
                x: playersList[player].location.x,
                y: playersList[player].location.y
              })
            }
          }
          if (otherArray.length > 0) {
            client.emit('other_update', otherArray);
          }
        });
      };
    });
  };
})(module || this);
