import joi from "joi";

export const createCredentialSchema = joi.object({
  password: joi.string().min(1).required(),
  url: joi.string().uri().required(),
  username: joi.string().min(1).required(),
  title: joi.string().min(1).required()
});