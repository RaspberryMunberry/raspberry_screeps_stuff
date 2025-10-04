let generalController = {

    cleanupCreepMemory : function(game, memory, data) {
        if (!memory.creeps) return;
        for (const name in memory.creeps) if (!game.creeps[name] && !(game.spawns['Spawn1'].spawning && game.spawns['Spawn1'].spawning.name === name)) {
            if(name.includes('T0')) Object.values(data.larvas).forEach(arr => arr.splice(arr.indexOf(name), 1));
            else if(name.includes('T1')) Object.values(data.tier1).forEach(arr => arr.splice(arr.indexOf(name), 1));
            delete memory.creeps[name];
        }
    },    

    earlyStartStrategy : function(game, memory, data) {
        let expected_molders = 3;
        let expected_keepers = 1;
        let base = game.spawns['Spawn1'];
        let availableEnergy = base.room.energyAvailable;

        if (data.larvas.molders.length < expected_molders || data.larvas.ctrlkeepers.length < expected_keepers){
            let id = String(Date.now());

            if (data.larvas.molders.length < expected_molders && availableEnergy >= 200 && !game.spawns['Spawn1'].spawning) {
                let creep_name = 'T0_drone'+id;
                base.spawnCreep([WORK, CARRY, MOVE], creep_name, {memory: {role: 'molder'}});
                availableEnergy -= 200;
                data.larvas.molders.push(creep_name);
            }
            if (data.larvas.ctrlkeepers.length < expected_keepers && availableEnergy >= 200 && !game.spawns['Spawn1'].spawning) {
                let creep_name = 'T0_keeper'+id;
                base.spawnCreep([WORK, CARRY, MOVE], creep_name, {memory: {role: 'keeper'}});
                availableEnergy -= 200;
                data.larvas.ctrlkeepers.push(creep_name);
            }
        }

        let raws = base.room.lookForAtArea(LOOK_STRUCTURES, base.pos.y-3, base.pos.x-3, base.pos.y+3, base.pos.x+3, true);
        let exts = raws.filter(r => r.structure.structureType === STRUCTURE_EXTENSION).map(r => r.structure);

        //let extensions = game.spawns['Spawn1'].pos.findInRange(FIND_STRUCTURES, 3, {filter: s => (s.structureType == STRUCTURE_EXTENSION)});
        //if (exts < 5 && base.room.controller.level > 1){

        //}
    }


}


module.exports = generalController;