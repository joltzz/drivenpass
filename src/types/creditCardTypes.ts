import { cards } from "@prisma/client";

export type TypeNewCreditCardData = Omit<cards, 'id'>;