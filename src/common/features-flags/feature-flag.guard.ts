import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { FeatureFlagsService } from './feature-flags.service';
import { FEATURE_FLAG_KEY } from './feature-flag.decorator';

@Injectable()
export class FeatureFlagGuard implements CanActivate {
  constructor(
    private readonly featureFlagsService: FeatureFlagsService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();

    // Obtener la flag desde la metadata del método
    const featureFlag = this.reflector.get<string>(FEATURE_FLAG_KEY, handler);

    if (!featureFlag) {
      // Ahora se niega el acceso si no se define una flag
      throw new HttpException(
        'Feature flag not defined for this route',
        HttpStatus.FORBIDDEN, // O HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    if (!this.featureFlagsService.isFeatureEnabled(featureFlag)) {
      throw new HttpException('This feature is disabled', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
