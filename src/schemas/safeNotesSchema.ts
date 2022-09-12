import joi from "joi";

export const createSafeNotesSchema = joi.object({
  title: joi.string().min(1).max(50).required(),
  note: joi.string().min(1).max(1000).required()
});