let roleMiner = {

    set_source: function(creep,source){
        creep.memory.source = source.id;
    },

    execute: function(creep){
        if (!creep.memory.source) return; 
        
        const source = Game.getObjectById(creep.memory.source); // восстанавливаем объект

        if (!source) return; // вдруг был разрушен/перегенерировался

        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}

module.exports = roleMiner;