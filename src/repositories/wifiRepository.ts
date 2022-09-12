import { prisma } from "../db/postgres";
import { TypeNewWifiData } from "../types/wifiTypes";

export async function createWifi(wifi: TypeNewWifiData) {
  await prisma.wifis.create({ data: wifi });
};

export async function checkTitle(title: string) {
  const result = await prisma.wifis.findFirst({ where: { title } });
  return result;
};

export async function getAllWifis(userId: number) {
  const result = await prisma.wifis.findMany({ where: { userId } });
  return result;
};

export async function getWifisById(id: number) {
  const result = await prisma.wifis.findFirst({ where: { id } });
  return result;
};

export async function deleteWifis(id: number) {
  await prisma.wifis.delete({ where: { id } });
};