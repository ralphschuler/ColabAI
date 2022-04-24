import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

export function initSentry() {
  Sentry.init({
    dsn: "https://30f93167037641f1b595b1d27ae86274@o207953.ingest.sentry.io/6359999",
    tracesSampleRate: 1.0,
}
