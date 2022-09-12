import express from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { createCredentialSchema } from "../schemas/credentialSchema";
import { validateToken } from "../middlewares/validateToken";
import {
  createCredencial,
  getAllCredentials,
  getById,
  deleteCredential
} from "../controllers/credentialController";

const router = express.Router();

router.post(
  "/credentials/create",
  validateToken,
  validateSchemaMiddleware(createCredentialSchema),
  createCredencial
);

router.get(
  "/credentials/getAll",
  validateToken,
  getAllCredentials
);

router.get(
  "/credentials/getById/:id",
  validateToken,
  getById
);

router.delete(
  "/credentials/delete/:id",
  validateToken,
  deleteCredential
);

export default router;