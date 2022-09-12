import { Request, Response } from 'express';
import * as authService from '../services/authService'


export async function signup(req: Request, res: Response){
  const {email, password} = req.body;
  await authService.signup(email, password);
  res.sendStatus(200);
};

export async function login(req: Request, res: Response){
  const {email, password} = req.body;
  const result = await authService.login(email, password);
  res.send(result).status(200);
};