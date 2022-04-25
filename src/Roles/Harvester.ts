import { TaskContext, TaskRequest, TaskRequestHandler } from "../Task";
import { CreepHarvestAction } from "../CreepActions";
export class HarvesterRole {
  private creep: Creep;
  private requestHandler: TaskRequestHandler;

  public static bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];

  public constructor(creep: Creep) {
    this.creep = creep;

    this.requestHandler = new TaskRequestHandler();

    const context: TaskContext = new TaskContext();
    context.Set<Creep>("creep", this.creep);

    const request: TaskRequest = new TaskRequest(new CreepHarvestAction(context, this.findSource()), 0, true);

    this.requestHandler.Add(request);
  }

  private findSource(): Source | Mineral | Deposit {
    const sources = this.creep.room.find(FIND_SOURCES_ACTIVE).sort((a, b) => a.energy - b.energy);
    if (sources.length === 0) {
      throw new Error("HarvesterRole.findSource: no sources found");
    }
    return sources[0];
  }

  public Invoke(): void {
    this.requestHandler.Invoke();
  }
}
