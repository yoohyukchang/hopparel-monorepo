import { plainToInstance } from "class-transformer";
import {
  IsNumber,
  IsString,
  IsEnum,
  validateSync,
  MinLength,
} from "class-validator";

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
  Provision = "provision",
}

class EnvironmentVariables {
  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  @MinLength(8, { message: "JWT secret is too short" })
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRATION: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
