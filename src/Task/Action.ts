import { TaskContext } from "./Context";
export enum TaskActionStatus {
  Pending = "Pending",
  Running = "Running",
  Success = "Success",
  Failure = "Failure"
}
export class TaskAction {
  private status: TaskActionStatus;
  private preTasks: TaskAction[];

  public constructor(preTasks: TaskAction[]) {
    this.preTasks = preTasks;
    this.status = TaskActionStatus.Pending;
  }

  protected Execute(context: TaskContext): boolean {
    throw new Error("Method not implemented.");
  }

  public get Status(): TaskActionStatus {
    return this.status;
  }

  public Invoke(context: TaskContext): TaskActionStatus {
    for (const preTask of this.preTasks) {
      preTask.Invoke(context);
      if (preTask.Status === TaskActionStatus.Failure) {
        return (this.status = TaskActionStatus.Failure);
      }
    }

    try {
      return (this.status = this.Execute(context) ? TaskActionStatus.Pending : TaskActionStatus.Running);
    } catch (e) {
      console.error(e);
      return (this.status = TaskActionStatus.Failure);
    }
  }
}
