import { TaskAction } from "../Task/Action";
import { TaskContext } from "../Task/Context";

export class CreepDropAction extends TaskAction {
  private resourceType: string;

  public constructor(resourceType: string) {
    super([]);
    this.resourceType = resourceType;
  }

  public Execute(context: TaskContext): boolean {
    const creep = context.Get<Creep>("creep");
    const result = creep.drop(this.resourceType);
    if ([ERR_NO_PATH, ERR_NOT_OWNER, ERR_NO_BODYPART, ERR_INVALID_TARGET].find(r => r === result) !== undefined) {
      throw new Error(`CreepDropAction.Execute: ${result}`);
    }
    return result === OK;
  }
}
