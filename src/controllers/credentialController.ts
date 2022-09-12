import { Request, Response } from 'express';
import * as credentialService from '../services/credentialService'

export async function createCredencial(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const { url, username, password, title } = req.body;
  let objectData = {
    userId: verifiedToken.id,
    url,
    username,
    password,
    title
  };

  await credentialService.createCredential(objectData);
  res.sendStatus(200);
};

export async function getAllCredentials(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const result = await credentialService.getAllUserCredentials(verifiedToken.id);
  res.send(result).status(200);
};

export async function getById(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const { id } = req.params;
  const result = await credentialService.getCredentialById(Number(id), verifiedToken.id);
  res.send(result).status(200);
};

export async function deleteCredential(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const { id } = req.params;
  await credentialService.deleteCredential(Number(id), verifiedToken.id);
  res.sendStatus(200);
};