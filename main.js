var roleMolder = require('role.molder');

module.exports.loop = function () {

    for (let name in Game.creeps){
        let creep = Game.creeps[name];

        if (!creep.memory.role) if(creep.name.includes('drone')) creep.memory.role = 'roleMolder';
        if (creep.memory.role == 'roleMolder') roleMolder.run(creep);
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