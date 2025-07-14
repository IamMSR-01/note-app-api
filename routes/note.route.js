import express from "express"
import { verifyJWT } from "../middleware/verifyJWT.js";
import { createNote, deleteNote, getNotes, updateNotes } from "../controllers/note.controller.js";



const router = express.Router();

router.post("/", verifyJWT, createNote);
router.get("/", verifyJWT, getNotes);
router.put("/:id", verifyJWT, updateNotes);
router.delete("/:id", verifyJWT, deleteNote);

export default router;