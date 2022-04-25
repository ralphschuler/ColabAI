import { TaskAction } from "../Task/Action";

export class CreepBuildAction extends TaskAction {
  private target: ConstructionSite;

  public constructor(target: ConstructionSite) {
    super([new CreepMoveAction(target.pos, 1)]);
    this.target = target;
  }

  public Execute(context: TaskContext): boolean {
    const creep = context.Get<Creep>("creep") as Creep;
    const result = creep.build();
    if ([ERR_NO_PATH, ERR_NOT_OWNER, ERR_NO_BODYPART, ERR_INVALID_TARGET].includes(result)) {
      throw new Error(`CreepBuildAction.Execute: ${result}`);
    }
    return creep.carry.energy === creep.carryCapacity;
  }
}
