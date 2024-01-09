import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./create-user.dto";
import { AuthService } from "src/auth/auth.service";
import { UserResponseDTO } from "./user-response.dto";
import { UserLoginDTO } from "./user-login.dto";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("login")
  async login(@Body() userDto: UserLoginDTO): Promise<{
    access_token: string;
  }> {
    const user = await this.authService.validateUser(
      userDto.username,
      userDto.password,
    );
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return this.authService.login(user);
  }

  @Post("register")
  async register(@Body() userDto: CreateUserDTO): Promise<UserResponseDTO> {
    const user = await this.userService.createUser(userDto);
    delete user.password;
    return user;
  }
}
