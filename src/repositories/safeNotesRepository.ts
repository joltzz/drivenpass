import { prisma } from "../db/postgres";
import { TypeNewSafeNotesData } from "../types/safeNotesTypes";

export async function createSafeNote(note: TypeNewSafeNotesData) {
  await prisma.notes.create({ data: note });
}

export async function checkTitle(title: string) {
  const result = await prisma.notes.findFirst({ where: { title } });
  return result;
};

export async function getAllSafeNotes(userId: number) {
  const result = await prisma.notes.findMany({ where: { userId } });
  return result;
};

export async function getSafeNotesById(id: number) {
  const result = await prisma.notes.findFirst({ where: { id } });
  return result;
};

export async function deleteSafeNotes(id: number) {
  await prisma.notes.delete({ where: { id } });
}