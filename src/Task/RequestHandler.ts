export class TaskRequestHandler {
  private requests: TaskRequest[];

  constructor() {
    this.requests = [];
  }

  public Add(request: TaskRequest): void {
    this.requests.push(request);
  }

  public Invoke(): void {
    this.requests.
      .filter(r => r.Status === TaskRequestStatus.Pending|TaskRequestStatus.Running)
      .sort((a, b) => a.Priority - b.Priority);
    for (const request of this.requests) {
      const status: TaskRequestStatus = request.Invoke();
      if (status === TaskRequestStatus.Success|TaskRequestStatus.Failure) {
        this.requests.splice(this.requests.indexOf(request), 1);
      }
    }
  }
}
