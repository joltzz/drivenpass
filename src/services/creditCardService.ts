import * as creditCardRepository from '../repositories/creditCardRepository';
import { TypeNewCreditCardData } from '../types/creditCardTypes';
import Cryptr from 'cryptr';

export async function createCreditCard(cardData: TypeNewCreditCardData) {
  const titleExists = await creditCardRepository.checkTitle(cardData.title);
  if (titleExists) throw { type: 'conflict' };

  const CRYPTR_KEY = String(process.env.CRYPTR_SECRET)
  const cryptr = new Cryptr(CRYPTR_KEY);
  const { password, cvv } = cardData;

  const encryptedPassword = cryptr.encrypt(password);
  const encryptedCVV = cryptr.encrypt(cvv);

  await creditCardRepository.createCreditCard({
    ...cardData,
    password: encryptedPassword,
    cvv: encryptedCVV
  });
};

export async function getAllCreditCard(userId: number) {
  const result = await creditCardRepository.getAllCreditCards(userId);
  const CRYPTR_KEY = String(process.env.CRYPTR_SECRET)
  const cryptr = new Cryptr(CRYPTR_KEY);

  let decryptedData = result.map((r: any) => {
    const { password, cvv } = r;
    const decryptedPassword = cryptr.decrypt(password);
    const decryptedCVV = cryptr.decrypt(cvv);
    return { ...r, password: decryptedPassword, cvv: decryptedCVV };
  });
  
  return decryptedData;
};

export async function getCreditCardsById(cardId: number, userId: number) {
  const result = await creditCardRepository.getCreditCardsById(cardId)
  const CRYPTR_KEY = String(process.env.CRYPTR_SECRET)
  const cryptr = new Cryptr(CRYPTR_KEY);

  if (!result) throw { type: 'not_found' };
  if (result?.userId !== userId) throw { type: 'unauthorized' };

  const {password, cvv} = result;
  const decryptedPassword = cryptr.decrypt(password);
  const decryptedCVV = cryptr.decrypt(cvv);
  const decryptedData = ({...result, password: decryptedPassword, cvv: decryptedCVV});

  return decryptedData;
};

export async function deleteCreditCard(cardId: number, userId: number) {
  const result: any = await creditCardRepository.getCreditCardsById(cardId);

  if(!result) throw { type: 'not_found' };
  if(result?.userId !== userId) throw { type: 'unauthorized' };

  await creditCardRepository.deleteCreditCards(cardId);
};