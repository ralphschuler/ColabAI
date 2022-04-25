import { TaskAction, TaskContext } from "../Task";
import { CreepDropAction, CreepMoveAction } from "./";

export class CreepHarvestAction extends TaskAction {
  private target: Source | Mineral | Deposit;

  public constructor(target: Source | Mineral | Deposit) {
    super([new CreepMoveAction(target.pos, 1), new CreepDropAction(RESOURCE_ENERGY)]);
    this.target = target;
  }

  public Execute(context: TaskContext): boolean {
    const creep = context.Get<Creep>("creep");
    const result = creep.harvest(this.target);
    if ([ERR_NO_PATH, ERR_NOT_OWNER, ERR_NO_BODYPART, ERR_INVALID_TARGET].find(r => r === result) !== undefined) {
      throw new Error(`CreepHarvestAction.Execute: ${result}`);
    }
    return creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0;
  }
}
