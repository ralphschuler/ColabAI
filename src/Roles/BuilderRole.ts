import { TaskRequestHandler } from "../Task/RequestHandler";
import { TaskRequest } from "../Task/Request";
import { TaskContext } from "../Task/Context";
export class BuilderRole {
  private creep: Creep;
  private requestHandler: TaskRequestHandler;

  public static bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];

  public constructor(creep: Creep) {
    this.creep = creep;

    this.requestHandler = new TaskRequestHandler();

    const context: TaskContext = new TaskContext();
    context.Add<Creep>("creep", this.creep);

    const request: TaskContext = new TaskRequest(new CreepBuildAction(this.findConstructionSite()), 0, true, context);

    this.requestHandler.Add(request);
  }

  private findConstructionSite(): ConstructionSite {
    const constructionSites = this.creep.room
      .find(FIND_CONSTRUCTION_SITE)
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
