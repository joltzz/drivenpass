import { Request, Response } from 'express';
import * as wifiServices from '../services/wifisService'


export async function createWifi(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const { title, wifiName, wifiPassword } = req.body;

  let objectData = {
    title,
    wifiName,
    wifiPassword,
    userId: verifiedToken.id
  };

  await wifiServices.createWifis(objectData);
  res.sendStatus(200);
}

export async function getAllWifi(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const result = await wifiServices.getAllWifis(verifiedToken.id);
  res.send(result).status(200);
}

export async function GetWifiById(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const { id } = req.params;
  const result = await wifiServices.getWifisById(Number(id), verifiedToken.id);
  res.send(result).status(200);
}

export async function deleteWifi(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const { id } = req.params;
  await wifiServices.deleteWifis(Number(id), verifiedToken.id);
  res.sendStatus(200);
}