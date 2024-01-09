import { DesignResponseDto } from "./design-response.dto";

export class FindDesignsResponseDTO {
    limit: number;
    offset: number;
    search?: string;
    username?: string;
    data: DesignResponseDto[];
}
