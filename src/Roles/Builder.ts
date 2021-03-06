import { TaskContext, TaskRequest, TaskRequestHandler } from "../Task";
import { CreepBuildAction } from "../CreepActions";
export class BuilderRole {
  private creep: Creep;
  private requestHandler: TaskRequestHandler;

  public static bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];

  public constructor(creep: Creep) {
    this.creep = creep;

    this.requestHandler = new TaskRequestHandler();

    const context: TaskContext = new TaskContext();
    context.Set<Creep>("creep", this.creep);

    const request: TaskRequest = new TaskRequest(new CreepBuildAction(context, this.findConstructionSite()), 0, true);

    this.requestHandler.Add(request);
  }

  private findConstructionSite(): ConstructionSite {
    const constructionSites = this.creep.room
      .find(FIND_MY_CONSTRUCTION_SITES)
      .sort((a, b) => a.progressTotal - b.progressTotal);
    if (constructionSites.length === 0) {
      throw new Error("BuilderRole.findSource: no construction sites found");
    }
    return constructionSites[0];
  }

  public Invoke(): void {
    this.requestHandler.Invoke();
  }
}
