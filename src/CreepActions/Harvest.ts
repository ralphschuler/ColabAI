import { TaskAction, TaskContext } from "../Task";
import { CreepDropAction, CreepMoveAction } from "./";

export class CreepHarvestAction extends TaskAction {
  private target: Source | Mineral | Deposit;

  public constructor(context: TaskContext, target: Source | Mineral | Deposit) {
    super(context);
    this.target = target;
    this.PreTasks.push(new CreepDropAction(this.context, RESOURCE_ENERGY));
    this.PreTasks.push(new CreepMoveAction(this.context, this.target.pos, 1));
  }

  public Execute(): boolean {
    const creep = this.context.Get<Creep>("creep");
    const result = creep.harvest(this.target);
    if ([ERR_NO_PATH, ERR_NOT_OWNER, ERR_NO_BODYPART, ERR_INVALID_TARGET].find(r => r === result) !== undefined) {
      throw new Error(`CreepHarvestAction.Execute: ${result}`);
    }
    return creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0;
  }
}
