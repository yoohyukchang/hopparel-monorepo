import { IsNotEmpty, IsString } from "class-validator";

export class CreateDesignDto {
    @IsString()
    @IsNotEmpty({ message: 'Product Type cannot be empty' })
    productType: string;

    @IsString()
    @IsNotEmpty({ message: 'Image of the product cannot be empty' })
    image: string;
}