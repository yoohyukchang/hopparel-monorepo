import { IsOptional, IsString } from "class-validator";

export class UpdateDesignDto {
  @IsOptional()
  @IsString()
  productType?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
