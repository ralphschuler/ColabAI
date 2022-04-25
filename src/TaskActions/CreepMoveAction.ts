import { TaskAction } from "../Task/Action";

export class CreepMoveAction extends TaskAction {
  private position: RoomPosition;
  private distance: number;

  public constructor(position: RoomPosition, distance: number) {
    super([]);
    this.position = position;
    this.distance = distance;
  }

  public Execute(context: TaskContext): boolean {
    const creep: Creep = context.Get<Creep>("creep") as Creep;
    const result = creep.moveTo(this.position);
    if ([ERR_NO_PATH, ERR_NOT_OWNER, ERR_NO_BODYPART, ERR_INVALID_TARGET].includes(result)) {
      throw new Error(`CreepMoveAction.Execute: ${result}`);
    }
    return creep.pos.isInRangeTo(this.position, this.distance);
  }
}
