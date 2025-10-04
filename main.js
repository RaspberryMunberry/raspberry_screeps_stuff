let general_controller = require('00.controller.general');

let roleMolder = require('role.molder');
let roleKeeper = require('role.ctrlkeeper');

Memory.mydata = Memory.mydata || {
    /*MODES : {
        EARLY_START: 0
    },

    mode : this.MODES.EARLY_START,*/
    larvas : {
        molders : [],
        ctrlkeepers : []
    },
}

module.exports.loop = function () {

    general_controller.cleanupCreepMemory(Game, Memory, Memory.mydata);
    general_controller.earlyStartStrategy(Game, Memory, Memory.mydata);

    for (let name in Game.creeps){
        let creep = Game.creeps[name];

        if (creep.memory.role == 'molder') roleMolder.run(creep);

        if (creep.memory.role == 'keeper') roleKeeper.run(creep);
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