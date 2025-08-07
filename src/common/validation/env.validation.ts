import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  DATABASE_URL: string;

  @IsString()
  POSTGRES_USER: string;

  @IsString()
  POSTGRES_PASSWORD: string;

  @IsString()
  POSTGRES_DB: string;

  @IsNumber()
  PORT: number;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  EXPIRES_TIME_JWT: string;

  // Flags generales
  @IsBoolean()
  FEATURE_TOURNAMENTS: boolean;

  @IsBoolean()
  FEATURE_TOURNAMENTS_GET_ALL_TOURNAMENTS: boolean;

  @IsBoolean()
  FEATURE_TOURNAMENTS_GET_TOURNAMENT: boolean;

  @IsBoolean()
  FEATURE_TOURNAMENTS_CREATE_TOURNAMENT: boolean;

  @IsBoolean()
  FEATURE_TOURNAMENTS_UPDATE_TOURNAMENT: boolean;

  @IsBoolean()
  FEATURE_TOURNAMENTS_DELETE_TOURNAMENT: boolean;

  @IsBoolean()
  FEATURE_WARRIORS_GET: boolean;

  @IsBoolean()
  FEATURE_WARRIORS_GET_ALL_WARRIORS: boolean;

  @IsBoolean()
  FEATURE_WARRIORS_CREATE_WARRIOR: boolean;

  @IsBoolean()
  FEATURE_WARRIORS_GET_WARRIOR: boolean;

  @IsBoolean()
  FEATURE_WARRIORS_UPDATE_WARRIOR: boolean;

  @IsBoolean()
  FEATURE_WARRIORS_DELETE_WARRIOR: boolean;

  @IsBoolean()
  FEATURE_FIGHTS_GET: boolean;

  @IsBoolean()
  FEATURE_FIGHTS_GET_ALL_FIGHTS: boolean;

  @IsBoolean()
  FEATURE_FIGHTS_CREATE_FIGHT: boolean;

  @IsBoolean()
  FEATURE_FIGHTS_GET_FIGHT: boolean;

  @IsBoolean()
  FEATURE_FIGHTS_UPDATE_FIGHT: boolean;

  @IsBoolean()
  FEATURE_FIGHTS_DELETE_FIGHT: boolean;

  @IsBoolean()
  FEATURE_AUTH: boolean;

  @IsBoolean()
  FEATURE_AUTH_LOG_IN: boolean;

  @IsBoolean()
  FEATURE_AUTH_SIGN_IN: boolean;
}
