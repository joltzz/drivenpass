import { Request, Response } from 'express';
import * as creditCardServices from '../services/creditCardService'

export async function createCreditCard(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  /* const { cardNumber, cardName, cvv, expirationDate, password, isVirtual, type, title  } = req.body;
  let objectData = {
    userId: verifiedToken.id,
    cardNumber,
    cardName,
    cvv,
    expirationDate,
    password,
    isVirtual,
    type,
    title
  }; */

  const data = req.body;

  await creditCardServices.createCreditCard({ ...data, userId: verifiedToken.id });
  res.sendStatus(200);
};


export async function getAllCreditCards(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const result = await creditCardServices.getAllCreditCard(verifiedToken.id);
  res.send(result).status(200);
};

export async function getCreditCardById(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const { id } = req.params;
  const result = await creditCardServices.getCreditCardsById(Number(id), verifiedToken.id);
  res.send(result).status(200);
};

export async function deleteCreditCard (req: Request, res: Response){
  const { verifiedToken } = res.locals;
  const { id } = req.params;
  await creditCardServices.deleteCreditCard(Number(id), verifiedToken.id);
  res.sendStatus(200);
};