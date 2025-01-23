import express from "express";
import { usersSelectSchema, usersInsertSchema } from "@db/schemas/schema";
import * as authCtrl from "@controllers/auth";

const router = express.Router();

router.post("/sign-in", authenticatedUser, authCtrl.signIn);
router.post("/sign-out", userMiddleware.isAuthenticated, authCtrl.signOut);
router.post("/sign-up", authenticatedUser, authCtrl.signUp);

export default router;
