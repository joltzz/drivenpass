import * as credentialRepository from '../repositories/credentialRepository';
import { TypeNewCredentialData } from '../types/credentialTypes';
import Cryptr from 'cryptr';
import * as decryptUtils from '../utils/decryptData';


export async function createCredential(credential: TypeNewCredentialData) {
  const titleExists = await credentialRepository.checkTitle(credential.title);
  if (titleExists) throw { type: 'conflict' };

  const CRYPTR_KEY = String(process.env.CRYPTR_SECRET)
  const cryptr = new Cryptr(CRYPTR_KEY);

  const { userId, url, username, password, title } = credential;

  const encryptedPassword = cryptr.encrypt(password);

  let objectData = {
    userId,
    url,
    username,
    password: encryptedPassword,
    title
  };

  await credentialRepository.createCredencial(objectData);
};

export async function getAllUserCredentials(userId: number) {
  const result = await credentialRepository.getAllCredentials(userId);
  const decryptedData = await decryptUtils.decryptPassword(result);
  
  return decryptedData;
};

export async function getCredentialById(credentialId: number, userId: number) {
  const result = await credentialRepository.getCredentialsById(credentialId);
  const CRYPTR_KEY = String(process.env.CRYPTR_SECRET)
  const cryptr = new Cryptr(CRYPTR_KEY);

  if(!result) throw { type: 'not_found' };
  if(result?.userId !== userId) throw { type: 'unauthorized' };

  const { password } = result
  const decryptedPassword = cryptr.decrypt(password);
  const decryptedData = {...result, password: decryptedPassword};

  return decryptedData;
};

export async function deleteCredential(credentialId: number, userId: number) {
  const result = await credentialRepository.getCredentialsById(credentialId);

  if(!result) throw { type: 'not_found' };
  if(result?.userId !== userId) throw { type: 'unauthorized' };

  await credentialRepository.deleteCredentials(credentialId);
};