;(function(window) {
  'use strict';

  var CONFIG = Object.freeze({
    sprites: {
      height: 32,
      width: 32
    },
    start: {
      x: 1,
      y: 1
    },
    tags: {
      char: 'char_01',
      item: 'item_01',
      mob: 'mon_01',
      mvp: 'mvp_01',
      npc: 'npc_01',
      player: 'player_01',
      wall: 'wall_01',
      warp: 'warp_01'
    },
    tile: {
      height: 16,
      width: 16
    },
    maps: {
      block: 'assets/block.png',
      hero: 'assets/hero.png',
      enemy: 'assets/enemy.png'
    },
    keys: {
      none: '',
      up: 'up',
      left: 'left',
      right: 'right',
      down: 'down'
    },
    events: {
      onMapRender: 'map_rerender',
      onPlayerMove: 'player_move',
      onPlayerUpdate: 'player_update',
      onOtherUpdate: 'other_update'
    },
    intervals: {
      keyInterval: 150
    }
  });

  window.CONFIG = CONFIG;
})(window);
