import { Router } from "express";
import { authenticatedUser } from "#api/middlewares/auth.js";
import * as healthCtrl from "#api/controllers/health.js";

const router = Router();

router.get("/ping", healthCtrl.ping);
router.get("/secured-ping", authenticatedUser, healthCtrl.ping);

export default router;
