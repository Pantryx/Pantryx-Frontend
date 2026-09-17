/** Mirrors next.config.ts: the backend the site proxies /api/* to. */
export const backendUrl = (
  process.env.BACKEND_URL ?? "https://pantryx-9007814d1092.herokuapp.com"
).replace(/\/+$/, "");
