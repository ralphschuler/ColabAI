import { TaskAction, TaskContext } from "../Task";

export class CreepMoveAction extends TaskAction {
  private position: RoomPosition;
  private distance: number;

  public constructor(position: RoomPosition, distance: number) {
    super([]);
    this.position = position;
    this.distance = distance;
  }

  public Execute(context: TaskContext): boolean {
    const creep: Creep = context.Get<Creep>("creep");
    const result = creep.moveTo(this.position);
    if ([ERR_NO_PATH, ERR_NOT_OWNER, ERR_NO_BODYPART, ERR_INVALID_TARGET].find(r => r === result) !== undefined) {
      throw new Error(`CreepMoveAction.Execute: ${result}`);
    }
    return creep.pos.inRangeTo(this.position, this.distance);
  }
}
