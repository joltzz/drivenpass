import { users } from "@prisma/client";

export type TypeNewUserData = Omit<users, 'id'>;