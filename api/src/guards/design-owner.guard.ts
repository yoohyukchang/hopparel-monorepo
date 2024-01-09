import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { RequestWithUser } from "src/decorators/user-id.decorator";
import { DesignsService } from "src/designs/designs.service";

@Injectable()
export class DesignOwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private designService: DesignsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Get the user id from the request object
    const user = (request as RequestWithUser).user;
    const userId = user.userId;
    // The JWT strategy will throw an error if it fails to validate the token

    // Get the design id from the request params
    const designId = request.params.id;

    // If designId is not provided
    if (!designId) {
      throw new BadRequestException("Invalid or missing design ID");
    }

    const design = await this.designService.findOneDesign(designId);

    // If post does not exist
    if (!design) {
      throw new NotFoundException(`Design with ID ${designId} not found`);
    }

    // Check if the design belongs to the user
    return design.userId == userId;
  }
}
