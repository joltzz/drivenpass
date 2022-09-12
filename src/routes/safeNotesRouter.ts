import express from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { createSafeNotesSchema } from "../schemas/safeNotesSchema";
import { validateToken } from "../middlewares/validateToken";
import * as safeNotesController from "../controllers/safeNotesController"

const router = express.Router();

router.post(
  "/safe_notes/create",
  validateToken,
  validateSchemaMiddleware(createSafeNotesSchema),
  safeNotesController.createNote
);

router.get(
  "/safe_notes/getAll",
  validateToken,
  safeNotesController.getAllNotes
);

router.get(
  "/safe_notes/getById/:id",
  validateToken,
  safeNotesController.GetNoteById
);

router.delete(
  "/safe_notes/delete/:id",
  validateToken,
  safeNotesController.deleteNote
);

export default router;