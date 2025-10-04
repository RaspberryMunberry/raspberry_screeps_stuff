let roleCargador = {
    execute: function(creep){
        
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s => {
            return (s.structureType === STRUCTURE_SPAWN || 
                    s.structureType === STRUCTURE_EXTENSION ||
                    s.structureType === STRUCTURE_CONTAINER)
                && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}
            });
            if (target)
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffff00ff' }});
                }
        }

        const dropped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                                                    filter: r => r.resourceType === RESOURCE_ENERGY});

    }
}

module.exports = roleCargador;