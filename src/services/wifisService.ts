import * as wifiRepository from '../repositories/wifiRepository';
import { TypeNewWifiData } from "../types/wifiTypes";
import Cryptr from 'cryptr';


export async function createWifis(wifi: TypeNewWifiData) {
  const titleExists = await wifiRepository.checkTitle(wifi.title);
  if (titleExists) throw { type: 'conflict' };

  const CRYPTR_KEY = String(process.env.CRYPTR_SECRET)
  const cryptr = new Cryptr(CRYPTR_KEY);

  const { title, wifiName, wifiPassword, userId } = wifi;
  const encryptedPassword = cryptr.encrypt(wifiPassword);
  let objectData = {
    title,
    wifiName,
    wifiPassword: encryptedPassword,
    userId
  };

  await wifiRepository.createWifi(objectData);
};

export async function getAllWifis(userId: number) {
  const result = await wifiRepository.getAllWifis(userId);
  const CRYPTR_KEY = String(process.env.CRYPTR_SECRET)
  const cryptr = new Cryptr(CRYPTR_KEY);

  let decryptedData = result.map((r: any) => {
    const { wifiPassword } = r;
    const decryptedPassword = cryptr.decrypt(wifiPassword);
    return { ...r, wifiPassword: decryptedPassword };
  });
  
  return decryptedData;
};

export async function getWifisById(wifiId: number, userId: number) {
  const result = await wifiRepository.getWifisById(wifiId);
  const CRYPTR_KEY = String(process.env.CRYPTR_SECRET)
  const cryptr = new Cryptr(CRYPTR_KEY);

  if (!result) throw { type: 'not_found' };
  if (result?.userId !== userId) throw { type: 'unauthorized' };

  const { wifiPassword } = result
  const decryptedPassword = cryptr.decrypt(wifiPassword);
  const decryptedData = { ...result, wifiPassword: decryptedPassword };

  return decryptedData;
};

export async function deleteWifis(wifiId: number, userId: number) {
  const result = await wifiRepository.getWifisById(wifiId);

  if(!result) throw { type: 'not_found' };
  if(result?.userId !== userId) throw { type: 'unauthorized' };

  await wifiRepository.deleteWifis(wifiId);
};