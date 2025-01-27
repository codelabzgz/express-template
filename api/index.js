import { ExpressAuth } from "@auth/express";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../db/index.js";
import express from "express";
// import authRouter from "./routes/auth.js";
import healthRouter from "./routes/health.js";

const app = express();
const port = process.env.PORT || 3000;

app.use("/api/v1/health", healthRouter);

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

// app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
