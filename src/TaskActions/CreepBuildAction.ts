import { TaskAction } from "../Task/Action";
import { TaskContext } from "../Task/Context";
import { CreepMoveAction } from "./CreepMoveAction";

export class CreepBuildAction extends TaskAction {
  private target: ConstructionSite;

  public constructor(target: ConstructionSite) {
    super([new CreepMoveAction(target.pos, 1)]);
    this.target = target;
  }

  public Execute(context: TaskContext): boolean {
    const creep = context.Get<Creep>("creep");
    const result = creep.build(this.target);
    if ([ERR_NO_PATH, ERR_NOT_OWNER, ERR_NO_BODYPART, ERR_INVALID_TARGET].find(r => r === result) !== undefined) {
      throw new Error(`CreepBuildAction.Execute: ${result}`);
    }
    return creep.carry.energy === creep.carryCapacity;
  }
}
