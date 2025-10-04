let general_controller = require('00.controller.general');

let roleMolder = require('role.molder');
let roleKeeper = require('role.ctrlkeeper');
let roleMiner = require('role.miner')
let roleCargador = require('role.cargador')

Memory.mydata = Memory.mydata || {
    MODES: {
        CUSTOM: -1,
        EARLY_START: 0
    },

    mode: 0,
    larvas: {
        molders: [],
        ctrlkeepers: []
    },

    tier1: {
        miners: [],
        cargadors: []
    },

}

module.exports.loop = function () {

    general_controller.cleanupCreepMemory(Game, Memory, Memory.mydata);
    if(Memory.mydata.mode == Memory.mydata.MODES.EARLY_START)
        general_controller.earlyStartStrategy(Game, Memory, Memory.mydata);

    for (let name in Game.creeps){
        let creep = Game.creeps[name];

        if(name.includes('miner')){
            if(!Memory.mydata.tier1.miners.includes(name)){
                Memory.mydata.tier1.miners.push(name);
                roleMiner.set_source(creep,creep.room.find(FIND_SOURCES)[0])
            }
        }

        if (creep.memory.role == 'molder') roleMolder.execute(creep);
        if (creep.memory.role == 'keeper') roleKeeper.execute(creep);
        if (creep.memory.role == 'miner') roleMiner.execute(creep);
        if (creep.memory.role == 'cargador') roleCargador.execute(creep);
    }

    /*var tower = Game.getObjectById('28d0c3775caf6951e1a0bee2');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }*/

    
}