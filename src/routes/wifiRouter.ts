import express from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import { createWifiSchema } from "../schemas/wifiSchema"
import * as wifiController from "../controllers/wifiController"


const router = express.Router();

router.post(
  "/wifi/create",
  validateToken,
  validateSchemaMiddleware(createWifiSchema),
  wifiController.createWifi
);

router.get(
  "/wifi/getAll",
  validateToken,
  wifiController.getAllWifi
);

router.get(
  "/wifi/getById/:id",
  validateToken,
  wifiController.GetWifiById
);

router.delete(
  "/wifi/delete/:id",
  validateToken,
  wifiController.deleteWifi
);

export default router;