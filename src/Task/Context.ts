export class TaskContext {
  private context: { [key: any]: any };

  public get<T>(key: any): T {
    return this.context[key];
  }

  public set<T>(key: any, value: T): void {
    this.context[key] = value;
  }
}
