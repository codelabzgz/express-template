import { Router } from "express";
import * as authCtrl from "./controllers/auth";

const router = Router();

router.post("/sign-in", authenticatedUser, authCtrl.signIn);
router.post("/sign-out", userMiddleware.isAuthenticated, authCtrl.signOut);
router.post("/sign-up", authenticatedUser, authCtrl.signUp);

export default router;
