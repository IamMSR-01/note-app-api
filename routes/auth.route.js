import express from "express";
import { signup, login, logout, checkAuth } from "../controllers/auth.controller.js" 
import { verifyJWT  } from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", verifyJWT , checkAuth)

export default router;
