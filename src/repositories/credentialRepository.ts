import { prisma } from "../dbStrategy/postgres";
import { TypeNewCredentialData } from "../types/credentialTypes";

export async function createCredencial(credential: TypeNewCredentialData) {
  await prisma.credentials.create({ data: credential });
};

export async function checkTitle(title: string) {
  const result = await prisma.credentials.findFirst({ where: { title } });
  return result;
};

export async function getAllCredentials(userId: number) {
  const result = await prisma.credentials.findMany({ where: { userId } });
  return result;
};

export async function getCredentialsById(id: number) {
  const result = await prisma.credentials.findFirst({ where: { id } });
  return result;
};

export async function deleteCredentials(id: number) {
  await prisma.credentials.delete({ where: { id } });
}