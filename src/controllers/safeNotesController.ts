import { Request, Response } from 'express';
import * as safeNotesServices from '../services/safeNotesService'

export async function createNote(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const { title, note } = req.body;

  let objectData = {
    userId: verifiedToken.id,
    title,
    note
  };

  await safeNotesServices.createSafeNotes(objectData);
  res.sendStatus(200);
}

export async function getAllNotes(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const result = await safeNotesServices.getAllNotes(verifiedToken.id);
  res.send(result).status(200);
}

export async function GetNoteById(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const { id } = req.params;
  const result = await safeNotesServices.getNotesById(Number(id), verifiedToken.id);
  res.send(result).status(200);
}

export async function deleteNote(req: Request, res: Response) {
  const { verifiedToken } = res.locals;
  const { id } = req.params;
  await safeNotesServices.deleteNotes(Number(id), verifiedToken.id);
  res.sendStatus(200);
}