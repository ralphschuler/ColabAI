import { TaskAction } from "../Task/Action";

export class CreepHarvestAction extends TaskAction {
  private target: Source | Mineral | Deposit;

  public constructor(target: Source | Mineral | Deposit) {
    super([new CreepMoveAction(target.pos, 1)]);
    this.target = target;
  }

  public Execute(context: TaskContext): boolean {
    const creep = context.Get<Creep>("creep") as Creep;
    const result = creep.harvest(this.target);
    if ([ERR_NO_PATH, ERR_NOT_OWNER, ERR_NO_BODYPART, ERR_INVALID_TARGET].includes(result)) {
      throw new Error(`CreepHarvestAction.Execute: ${result}`);
    }
    return creep.carry.energy === creep.carryCapacity;
  }
}
