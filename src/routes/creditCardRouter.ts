import express from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import { createCreditCardSchema } from "../schemas/creditCardSchema";
import * as creditCardController from "../controllers/creditCardController"

const router = express.Router();

router.post(
  "/card/create",
  validateToken,
  validateSchemaMiddleware(createCreditCardSchema),
  creditCardController.createCreditCard
);

router.get(
  "/card/getAll",
  validateToken,
  creditCardController.getAllCreditCards
);

router.get(
  "/card/getById/:id",
  validateToken,
  creditCardController.getCreditCardById
);

router.delete(
  "/card/delete/:id",
  validateToken,
  creditCardController.deleteCreditCard
);

export default router;