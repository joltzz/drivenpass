import JoiBase from 'joi';
import JoiDate from '@joi/date';

const joi = JoiBase.extend(JoiDate);

export const createCreditCardSchema = joi.object({
  title: joi.string().max(50).required(),
  cardNumber: joi.string().pattern(/^\d{4} \d{4} \d{4} \d{4}$/).required(),
  cvv: joi.string().pattern(/^\d{3}$/).length(3).required(),
  expirationDate: joi.date().format('MM/YY').required(),
  password: joi.string().pattern(/^\d{4}$/).length(4).required(),
  isVirtual: joi.boolean().strict().required(),
  type: joi.string().valid('credit', 'debit', 'both').required(),
  cardName: joi.string().min(1).required()
});
