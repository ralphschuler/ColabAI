import { TaskAction, TaskContext } from "../Task";
import { CreepMoveAction } from "./";

export class CreepCollectAction extends TaskAction {
  private target: Resource;

  public constructor(target: Resource) {
    super([new CreepMoveAction(target.pos, 1)]);
    this.target = target;
  }

  public Execute(context: TaskContext): boolean {
    const creep = context.Get<Creep>("creep");
    const result = creep.harvest(this.target);
    if ([ERR_NOT_OWNER, ERR_BUSY, ERR_INVALID_TARGET, ERR_NOT_IN_RANGE].find(r => r === result) !== undefined) {
      throw new Error(`CreepHarvestAction.Execute: ${result}`);
    }
    return creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0;
  }
}
