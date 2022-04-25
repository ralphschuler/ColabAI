import { TaskAction, TaskContext } from "../Task";
import { CreepMoveAction } from "./";

export class CreepPickupAction extends TaskAction {
  private target: Resource;

  public constructor(context: TaskContext, target: Resource) {
    super(context);
    this.target = target;
    this.PreTasks.push(new CreepMoveAction(this.context, this.target.pos, 1));
  }

  public Execute(): boolean {
    const creep = this.context.Get<Creep>("creep");
    const result = creep.pickup(this.target);
    if ([ERR_NOT_OWNER, ERR_BUSY, ERR_INVALID_TARGET, ERR_NOT_IN_RANGE].find(r => r === result) !== undefined) {
      throw new Error(`CreepPickupAction.Execute: ${result}`);
    }
    return creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0;
  }
}
