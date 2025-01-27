import { ExpressAuth } from "@auth/express";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../db/index.js";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// If your app is served through a proxy
// trust the proxy to allow us to read the `X-Forwarded-*` headers
app.set("trust proxy", true);
app.use(
  "/auth/*",
  ExpressAuth({
    providers: [],
    adapter: DrizzleAdapter(db),
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
