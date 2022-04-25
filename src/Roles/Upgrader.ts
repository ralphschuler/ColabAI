import { TaskContext, TaskRequest, TaskRequestHandler } from "../Task";
import { CreepUpgradeAction } from "../CreepActions";
export class UpgraderRole {
  private creep: Creep;
  private requestHandler: TaskRequestHandler;

  public static bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];

  public constructor(creep: Creep) {
    this.creep = creep;

    this.requestHandler = new TaskRequestHandler();

    const context: TaskContext = new TaskContext();
    context.Set<Creep>("creep", this.creep);

    if (!this.creep.room?.controller) {
      throw new Error("UpgraderRole.constructor: no controller found");
    }
    const request: TaskRequest = new TaskRequest(new CreepUpgradeAction(context, this.creep.room.controller), 0, true);

    this.requestHandler.Add(request);
  }

  public Invoke(): void {
    this.requestHandler.Invoke();
  }
}
