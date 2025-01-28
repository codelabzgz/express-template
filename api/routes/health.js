import { Router } from "express";
import * as healthCtrl from "#api/controllers/health.js";

const router = Router();

router.get("/ping", healthCtrl.ping);

export default router;
