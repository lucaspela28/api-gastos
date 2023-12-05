import { PrismaClient } from "@prisma/client";

// Exporta una instancia de PrismaClient
export const prisma = new PrismaClient();

/*export function deleteSoft() {
  prismaClient = new PrismaClient();
  prismaClient.$use(async (params, next) => {
    if (params.action == "delete") {
      params.action = "update";
      params.args["data"] = { deleted_at: new Date() };
    }

    return next(params);
  });
  return prismaClient;
}*/
