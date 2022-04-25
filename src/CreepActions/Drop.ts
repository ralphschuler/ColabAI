import { TaskAction, TaskContext } from "../Task";

export class CreepDropAction extends TaskAction {
  private resource: ResourceConstant;

  public constructor(context: TaskContext, resource: ResourceConstant) {
    super(context);
    this.resource = resource;
  }

  public Execute(): boolean {
    const creep = this.context.Get<Creep>("creep");
    const result = creep.drop(this.resource);
    if ([ERR_NO_PATH, ERR_NOT_OWNER, ERR_NO_BODYPART, ERR_INVALID_TARGET].find(r => r === result) !== undefined) {
      throw new Error(`CreepDropAction.Execute: ${result}`);
    }
    return result === OK;
  }
}
