export class TaskContext {
  private context: { [key: string]: any } = {};

  public Get<T>(key: string): T {
    return this.context[key.toLowerCase()] as T;
  }

  public Set<T>(key: string, value: T): void {
    this.context[key.toLowerCase()] = value;
  }
}
