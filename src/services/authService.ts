import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authRepository from "../repositories/authRepository"

export async function signup(email: string, password: string) {
  const SALT = 10;
  const encryptedPassword = bcrypt.hashSync(password, SALT);

  const emailExists = await authRepository.checkEmail(email);
  if (emailExists) throw { type: 'conflict' };

  await authRepository.createUser({ email, password: encryptedPassword });
};

export async function login(userEmail: string, userPassword: string) {
  const userData: any = await authRepository.checkEmail(userEmail);
  const checkpassword = bcrypt.compareSync(userPassword, userData.password);
  const KEY_JWT = process.env.JWT_SECRET;

  if(!checkpassword) throw { type: 'unauthorized' };

  const token = jwt.sign(userData, String(KEY_JWT));
  await authRepository.createUserToken(userData.id, token)
  
  const data = await authRepository.getUserData(userData.id);

  return data;
};