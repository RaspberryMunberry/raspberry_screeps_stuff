// primitive worker
var roleMolder = {
    run: function(creep) {

        if (creep.store[RESOURCE_ENERGY] == 0) creep.memory.intension = 'extracting';

        switch(creep.memory.intension){
            case 'extracting':
                if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) creep.memory.intension = 'stockpiling';
                else{
                    let sources = creep.room.find(FIND_SOURCES);
                    if(!sources.length) break;
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                    creep.say('extracting');
                }
                break;

            case 'stockpiling':
                let target = creep.room.find(FIND_STRUCTURES, {filter: s => s.structureType === STRUCTURE_SPAWN})[0];
                if(target.store.getFreeCapacity(RESOURCE_ENERGY) == 0) creep.memory.intension = 'constructing';
                else if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00ff'}});
                    creep.say('stockpiling');}
                break;

            case 'constructing':
                let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length){
                    creep.say('constructing');
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE)
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                else creep.memory.intension = 'upgrading';
                break;

            case 'upgrading':
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#6252f1ff'}});
                creep.say('upgrading');
                break;

            default:
                console.log(`${creep.name}: unprocessed intension -${creep.memory.intension}-`);
                break;
        }
    }
};

module.exports = roleMolder;