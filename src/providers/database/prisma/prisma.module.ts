import { Module } from "@nestjs/common";
import { CustomPrismaModule } from "nestjs-prisma";
import { extendedPrismaClient } from "./extenstions/extension";

@Module({
    imports: [
      CustomPrismaModule.forRootAsync({
        name: 'PrismaService',
        useFactory: () => {
          return extendedPrismaClient;
        },
        isGlobal: true,
      }),
    ],
  })
export default class PrismaModule {}