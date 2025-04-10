import { Test, TestingModule } from '@nestjs/testing';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationRequestDto } from 'src/common/pagination/dto/pagination-request.dto';

describe('TournamentsController', () => {
  let controller: TournamentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentController],
      providers: [TournamentService, PrismaService],
    }).compile();

    controller = module.get<TournamentController>(TournamentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the correct formatted response', async () => {
    const paginationDto: PaginationRequestDto = { page: 1, limit: 10 };

    const mockResult = {
      tournaments: [],
      totalCount: 0,
      itemsPage: 0,
    };

    jest
      .spyOn(controller['tournamentService'], 'getAllTournaments')
      .mockResolvedValue(mockResult);

    const result = await controller.getAllTournaments(paginationDto);

    // Aquí puedes verificar que la respuesta esté formateada correctamente
    expect(result).toHaveProperty('tournaments');
    expect(result).toHaveProperty('totalCount');
    expect(result).toHaveProperty('itemsPage');
  });
});
