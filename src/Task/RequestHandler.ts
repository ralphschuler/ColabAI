import { TaskRequest, TaskRequestStatus } from "./Request";
export class TaskRequestHandler {
  private requests: TaskRequest[];

  public constructor() {
    this.requests = [];
  }

  public Add(request: TaskRequest): void {
    this.requests.push(request);
  }

  public Invoke(): void {
    this.requests
      .filter((r: TaskRequest) => r.Status === TaskRequestStatus.Pending || r.Status === TaskRequestStatus.Running)
      .sort((a, b) => a.Priority - b.Priority);
    for (const request of this.requests) {
      const status: TaskRequestStatus = request.Invoke();
      if (status === TaskRequestStatus.Success || status === TaskRequestStatus.Failure) {
        this.requests.splice(this.requests.indexOf(request), 1);
      }
    }
  }
}
