export class Logger {
  private static checkGroup(group: string): boolean {
    const selector = process.env.LOG_GROUP || "*";
    return selector === "*" || selector.indexOf(group) >= 0;
  }

  public static Log(group: string, message: string, ...args: any[]): void {
    if (!Logger.checkGroup(group)) return;
    console.log(`[${group}] ${message}`, ...args);
  }

  public static Error(group: string, message: string, ...args: any[]): void {
    if (!Logger.checkGroup(group)) return;
    console.error(`[${group}] ${message}`, ...args);
  }

  public static Warn(group: string, message: string, ...args: any[]): void {
    if (!Logger.checkGroup(group)) return;
    console.warn(`[${group}] ${message}`, ...args);
  }

  public static Info(group: string, message: string, ...args: any[]): void {
    if (!Logger.checkGroup(group)) return;
    console.info(`[${group}] ${message}`, ...args);
  }

  public static Debug(group: string, message: string, ...args: any[]): void {
    if (!Logger.checkGroup(group)) return; // was ist mit dem taskrequesthandler? sind nur zahlen :D
    console.debug(`[${group}] ${message}`, ...args);
  }

  public static Trace(group: string, message: string, ...args: any[]): void {
    if (!Logger.checkGroup(group)) return;
    console.trace(`[${group}] ${message}`, ...args);
  }
}
