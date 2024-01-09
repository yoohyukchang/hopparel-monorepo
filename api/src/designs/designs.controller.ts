import { Query, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { DesignsService } from "./designs.service";
import { CreateDesignDto } from "./create-design.dto";
import { DesignResponseDto } from "./design-response.dto";
import { UpdateDesignDto } from "./update-design.dto";
import { UserId } from "src/decorators/user-id.decorator";
import { DesignOwnershipGuard } from "src/guards/design-owner.guard";
import { FindDesignsQueryDTO } from "./find-designs-query.dto";
import { FindDesignsResponseDTO } from "./find-designs-response.dto";

@Controller("designs")
export class DesignsController {
  constructor(private readonly designsService: DesignsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createDesign(
    @Body() createDesignDto: CreateDesignDto,
    @UserId() userId: number,
  ): Promise<DesignResponseDto> {
    const design = await this.designsService.createDesign(
      createDesignDto,
      userId,
    );
    delete design.userId;
    return design;
  }

  @Get()
  async findAllDesigns(
    @Query() query: FindDesignsQueryDTO,
  ): Promise<FindDesignsResponseDTO> {
    const { limit, offset, search } = query;

    const designs = await this.designsService.findAllDesigns(
      limit,
      offset,
      search,
    );
    return {
      limit,
      offset,
      search,
      data: designs.map((design) => {
        delete design.userId;
        return design;
      }),
    };
  }

  @Get(":id")
  async findOneDesign(@Param("id") id: string): Promise<DesignResponseDto> {
    const design = await this.designsService.findOneDesign(id);
    if (!design) {
      throw new NotFoundException(`Design with ID ${id} not found.`);
    }
    delete design.userId;
    return design;
  }

  @UseGuards(JwtAuthGuard, DesignOwnershipGuard)
  @Patch(":id")
  async updateDesign(
    @Param("id") id: string,
    @Body() updateDesignDto: UpdateDesignDto,
  ): Promise<DesignResponseDto> {
    const design = await this.designsService.updateDesign(id, updateDesignDto);
    if (!design) {
      throw new NotFoundException(`Design with ID ${id} not found`);
    }
    delete design.userId;
    return design;
  }

  @UseGuards(JwtAuthGuard, DesignOwnershipGuard)
  @Delete(":id")
  async remove(
    @Param("id") id: string,
  ): Promise<{ statusCode: number; message: string }> {
    const design = await this.designsService.removeDesign(id);
    if (!design) {
      throw new NotFoundException(`Design with ID ${id} not found`);
    }
    return {
      statusCode: 200,
      message: "Design deleted successfully",
    };
  }
}
