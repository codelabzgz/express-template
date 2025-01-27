import { ExpressAuth } from "@auth/express";
import express from "express";
import healthRouter from "#api/routes/health.js";
import { authConfig } from "#api/config/auth.js";

export const app = express();
app.set("port", process.env.PORT || 3000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

// If your app is served through a proxy
// trust the proxy to allow us to read the `X-Forwarded-*` headers
app.set("trust proxy", true);
app.use("/auth/*", ExpressAuth(authConfig));

app.use("/health", healthRouter);
