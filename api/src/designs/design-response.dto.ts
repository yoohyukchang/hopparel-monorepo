import { UserResponseDTO } from "src/user/user-response.dto";

export class DesignResponseDto {
    id: string;
    productType: string;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    user?: UserResponseDTO;
}