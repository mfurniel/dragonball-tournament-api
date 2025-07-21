import { Injectable } from '@nestjs/common';

@Injectable()
export class FeatureFlagsService {
  isFeatureEnabled(flag: string): boolean {
    return process.env[flag] === 'true';
  }
}
