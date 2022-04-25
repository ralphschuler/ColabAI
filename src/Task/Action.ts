import { TaskContext } from "./Context";
export enum TaskActionStatus {
  Pending = "Pending",
  Running = "Running",
  Success = "Success",
  Failure = "Failure"
}
export class TaskAction {
  private status: TaskActionStatus;
  public context: TaskContext;
  private preTasks: TaskAction[];

  public constructor(context: TaskContext) {
    this.context = context;
    this.preTasks = [];
    this.status = TaskActionStatus.Pending;
  }

  protected Execute(): boolean {
    throw new Error("Method not implemented.");
  }

  public get Status(): TaskActionStatus {
    return this.status;
  }

  public get PreTasks(): TaskAction[] {
    return this.preTasks;
  }

  public set PreTasks(preTasks: TaskAction[]) {
    this.preTasks = preTasks;
  }

  public Invoke(): TaskActionStatus {
    for (const preTask of this.preTasks) {
      preTask.Invoke();
      if (preTask.Status === TaskActionStatus.Failure) {
        return (this.status = TaskActionStatus.Failure);
      }
    }

    try {
      return (this.status = this.Execute() ? TaskActionStatus.Pending : TaskActionStatus.Running);
    } catch (e) {
      console.error(e);
      return (this.status = TaskActionStatus.Failure);
    }
  }
}
