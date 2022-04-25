import * as _ from "lodash";
export function watcher(): void {
  if (typeof Memory.watch !== "object") {
    Memory.watch = {
      expressions: {},
      values: {}
    };
  }
  _.each(Memory.watch.expressions, (expr, name) => {
    if (typeof expr !== "string") return;
    let result: string;
    try {
      // eslint-disable-next-line no-eval
      result = eval(expr) as string;
    } catch (error: any) {
      result = (error as Error).message;
    }
    if (name === "console") {
      if (typeof result !== "undefined") console.log(result);
    } else {
      Memory.watch.values[name] = typeof result !== "undefined" ? result.toString() : result;
    }
  });
}
