import { Test } from '@nestjs/testing';
import { TournamentsModule } from './tournament.module';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { PrismaService } from '../prisma/prisma.service';

describe('TournamentsModule', () => {
  let service: TournamentService;
  let controller: TournamentController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TournamentsModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    service = moduleRef.get<TournamentService>(TournamentService);
    controller = moduleRef.get<TournamentController>(TournamentController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });
});
