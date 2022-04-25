import { ErrorMapper } from "./Utils/ErrorMapper";
import { BuilderRole } from "./Roles/BuilderRole";
import { HarvesterRole } from "./Roles/HarvesterRole";
import { watcher } from "./Modules/Watcher";
import { initSentry } from "./Modules/Sentry";
declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
    watch: {
      expressions: { [name: string]: string };
      values: { [name: string]: string };
    };
  }

  interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
  }

  // Syntax for adding properties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

initSentry();
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    } else {
      const memory = Memory.creeps[name];
      let role;
      switch (memory.role) {
        case "builder":
          role = new BuilderRole(Game.creeps[name]);
          break;

        case "harvester":
          role = new HarvesterRole(Game.creeps[name]);
          break;

        case "upgrader":
          role = new UpgraderRole(Game.creeps[name]);
          break;
      }
      if (!role) {
        continue;
      }
      role.Invoke();
    }
  }

  watcher();
});
