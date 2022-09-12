import * as safeNotesRepository from '../repositories/safeNotesRepository'
import { TypeNewSafeNotesData } from "../types/safeNotesTypes";

export async function createSafeNotes(noteData: TypeNewSafeNotesData) {
  const titleExists = await safeNotesRepository.checkTitle(noteData.title);
  if (titleExists) throw { type: 'conflict' };

  await safeNotesRepository.createSafeNote(noteData);
};

export async function getAllNotes(userId: number) {
  const result = await safeNotesRepository.getAllSafeNotes(userId);
  return result;
};

export async function getNotesById(noteId: number, userId: number) {
  const result = await safeNotesRepository.getSafeNotesById(noteId);

  if(!result) throw { type: 'not_found' };
  if(result?.userId !== userId) throw { type: 'unauthorized' };

  return result;
};

export async function deleteNotes(noteId: number, userId: number) {
  const result = await safeNotesRepository.getSafeNotesById(noteId);

  if(!result) throw { type: 'not_found' };
  if(result?.userId !== userId) throw { type: 'unauthorized' };

  await safeNotesRepository.deleteSafeNotes(noteId);
};