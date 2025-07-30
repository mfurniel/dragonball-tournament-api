import { Test, TestingModule } from '@nestjs/testing';
import { WarriorController } from './warrior.controller';
import { WarriorService } from './warrior.service';
import { PrismaService } from '../prisma/prisma.service';
import { FeatureFlagGuard } from '../common/features-flags/feature-flag.guard';
import { Reflector } from '@nestjs/core';
import { FeatureFlagsService } from '../common/features-flags/feature-flags.service';

describe('WarriorController', () => {
  let controller: WarriorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarriorController],
      providers: [
        WarriorService,
        PrismaService,
        FeatureFlagGuard,
        Reflector,
        {
          provide: FeatureFlagsService,
          useValue: {
            isFeatureEnabled: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<WarriorController>(WarriorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
