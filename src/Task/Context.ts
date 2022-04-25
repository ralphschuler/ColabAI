export class TaskContext {
  private context: { [key: any]: any };

  public get<T>(key: any): T {
    return this.context[key] as T;
  }

  public set<T>(key: any, value: T): void {
    this.context[key] = value;
  }
}
