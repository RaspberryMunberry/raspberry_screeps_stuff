let roleKeeper = {
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0)
            creep.memory.upgrading = false;
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0)
	        creep.memory.upgrading = true;

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4159e0ff'}});
            }
        }
        else {
            let sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources.at(-1)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources.at(-1), {visualizePathStyle: {stroke: '#4159e0ff'}});
            }
        }

    }
}
module.exports = roleKeeper;