import { credentials } from "@prisma/client";

export type TypeNewCredentialData = Omit<credentials, 'id'>;