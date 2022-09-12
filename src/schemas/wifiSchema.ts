import joi from "joi";

export const createWifiSchema = joi.object({
  title: joi.string().min(1).max(50).required(),
  wifiName: joi.string().min(1).max(100).required(),
  wifiPassword: joi.string().min(1).max(50).required()
});