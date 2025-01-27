import { Router } from "express";
import * as healthCtrl from "@controllers/health";

const router = Router();

router.get("/health", healthCtrl.ping);

export default router;
