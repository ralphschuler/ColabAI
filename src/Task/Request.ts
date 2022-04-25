import { TaskAction } from "./Action";
import { TaskContext } from "./Context";

export enum TaskRequestStatus {
  Pending = "Pending",
  Running = "Running",
  Success = "Success",
  Failure = "Failure"
}

export class TaskRequest {
  private task: TaskAction;
  private priority: number;
  private recuring: boolean;
  private status: TaskRequestStatus;

  public constructor(task: TaskAction, priority: number, recuring: boolean) {
    this.status = TaskRequestStatus.Pending;
    this.task = task;
    this.priority = priority;
    this.recuring = recuring;
  }

  public get Status(): TaskRequestStatus {
    return this.status;
  }

  public get Priority(): number {
    return this.priority;
  }

  public Invoke(): TaskRequestStatus {
    try {
      return (this.status = this.task.Invoke() ? TaskRequestStatus.Success : TaskRequestStatus.Running);
    } catch (e) {
      console.error(e);
      return (this.status = TaskRequestStatus.Failure);
    }
  }
}
