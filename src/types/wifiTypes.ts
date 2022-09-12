import { wifis } from "@prisma/client";

export type TypeNewWifiData = Omit<wifis, 'id'>;