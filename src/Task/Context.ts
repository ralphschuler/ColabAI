export class TaskContext {
  private context: { [key: string]: any };

  public get<T>(key: string): T {
    return this.context[key.toLowerCase()] as T;
  }

  public set<T>(key: string, value: T): void {
    this.context[key.toLowerCase()] = value;
  }
}
