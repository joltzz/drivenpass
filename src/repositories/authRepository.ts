import { prisma } from "../db/postgres";
import { TypeNewUserData } from "../types/userTypes";

export async function checkEmail(email: string) {
  const result = await prisma.users.findFirst({ where: { email } });
  return result;
};

export async function createUser(user: TypeNewUserData) {
  await prisma.users.create({ data: user });
};

export async function createUserToken(userId: number, token: string) {
  await prisma.tokens.create({ data: { userId, token } });
};

export async function getUserData(id: number) {
  const result = prisma.users.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      tokens: {
        select: {
          token: true,
        },
      },
    },
  });
  return result;
};
