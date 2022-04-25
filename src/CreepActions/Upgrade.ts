import { TaskAction, TaskContext } from "../Task";
import { CreepMoveAction, CreepPickupAction } from "./";

export class CreepUpgradeAction extends TaskAction {
  private target: StructureController;

  public constructor(context: TaskContext, target: StructureController) {
    super(context);
    this.target = target;
    this.PreTasks.push(new CreepPickupAction(this.context, this.findDroppedEnergy()));
    this.PreTasks.push(new CreepMoveAction(this.context, this.target.pos, 1));
  }

  private findDroppedEnergy(): Resource {
    const creep = this.context.Get<Creep>("creep");
    const dropedEnergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1, {
      filter: r => r.resourceType === RESOURCE_ENERGY
    });
    if (!dropedEnergy) {
      throw new Error("CreepUpgradeAction.findDroppedEnergy: no dropped energy");
    }
    return dropedEnergy[0];
  }

  public Execute(): boolean {
    const creep = this.context.Get<Creep>("creep");
    const result = creep.upgradeController(this.target);
    if ([ERR_NO_PATH, ERR_NOT_OWNER, ERR_NO_BODYPART, ERR_INVALID_TARGET].find(r => r === result) !== undefined) {
      throw new Error(`CreepUpgradeAction.Execute: ${result}`);
    }
    return creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0;
  }
}
