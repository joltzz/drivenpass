import { notes } from "@prisma/client";

export type TypeNewSafeNotesData = Omit<notes, 'id'>;