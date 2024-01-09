import { Module } from "@nestjs/common";
import { DesignsService } from "./designs.service";
import { DesignsController } from "./designs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Design } from "./design.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Design])],
  providers: [DesignsService],
  controllers: [DesignsController],
})
export class DesignsModule {}
