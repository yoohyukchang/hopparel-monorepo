import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDTO } from "./create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async createUser(userDto: CreateUserDTO): Promise<User> {
    const { password, ...userInfo } = userDto;
    const user = await this.userRepository.create({
      ...userInfo,
      password: await bcrypt.hash(password, 10),
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      // Check if the error message contains a specific keyword indicating a duplicate username
      if (error.message && error.message.includes("duplicate key")) {
        throw new ConflictException("Username already exists.");
      }
      // Re-throw the error for any other cases
      throw error;
    }
  }
}