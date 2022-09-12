import { prisma } from "../dbStrategy/postgres";
import { TypeNewCreditCardData } from "../types/creditCardTypes";

export async function createCreditCard(card: TypeNewCreditCardData) {
  await prisma.cards.create({ data: card });
}

export async function checkTitle(title: string) {
  const result = await prisma.cards.findFirst({ where: { title } });
  return result;
};

export async function getAllCreditCards(userId: number) {
  const result = await prisma.cards.findMany({ where: { userId } });
  return result;
};

export async function getCreditCardsById(id: number) {
  const result = await prisma.cards.findFirst({ where: { id } });
  return result;
};

export async function deleteCreditCards(id: number) {
  await prisma.cards.delete({ where: { id } });
}