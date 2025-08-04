import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { Public } from './decorators/public.decorator';
import { FeatureFlagGuard } from '../common/features-flags/feature-flag.guard';
import { FeatureFlag } from '../common/features-flags/feature-flag.decorator';

@Controller('auth')
@UseGuards(FeatureFlagGuard)
@FeatureFlag('FEATURE_AUTH')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('log-in')
  @FeatureFlag('FEATURE_AUTH_LOG_IN')
  @HttpCode(HttpStatus.OK)
  logIn(@Body() user: UserDto) {
    return this.authService.logIn(user);
  }

  @Public()
  @Post('sign-up')
  @FeatureFlag('FEATURE_AUTH_SIGN_IN')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
}
