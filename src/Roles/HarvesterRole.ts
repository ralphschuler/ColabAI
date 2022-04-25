import { TaskRequestHandler } from "../Task/RequestHandler";
import { TaskRequest } from "../Task/Request";
import { TaskContext } from "../Task/Context";
export class HarvesterRole {
  private creep: Creep;
  private requestHandler: TaskRequestHandler;

  public static bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];

  public constructor(creep: Creep) {
    this.creep = creep;

    this.requestHandler = new TaskRequestHandler();

    const context: TaskContext = new TaskContext();
    context.Add<Creep>("creep", this.creep);

    const request: TaskContext = new TaskRequest(new CreepHarvestAction(this.findSource()), 0, true, context);

    this.requestHandler.Add(request);
  }

  private findSource(): Source | Mineral | Deposit {
    const sources = this.creep.room.find(FIND_ACTIVE_SOURCES).sort((a, b) => a.energy - b.energy);
    if (sources.length === 0) {
      throw new Error("HarvesterRole.findSource: no sources found");
    }
    return sources[0];
  }

  public Invoke(): void {
    this.requestHandler.Invoke();
  }
}
