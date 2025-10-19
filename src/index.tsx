import { Hono } from "hono";
import { renderer } from "./renderer";
import { getConnInfo } from "hono/cloudflare-workers";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  const info = getConnInfo(c);
  const headers = c.req.header();

  console.log({
    url: c.req.url,
    query: c.req.query(),
    ip: info.remote.address || "unknown",
  });

  return c.render(
    <ul>
      {Object.entries(headers).map(([key, value]) => (
        <li key={key}>
          {key}: {value}
        </li>
      ))}
    </ul>
  );
});

export default app;
