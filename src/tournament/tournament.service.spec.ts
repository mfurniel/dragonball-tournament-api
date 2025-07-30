import { Test, TestingModule } from '@nestjs/testing';
import { TournamentService } from './tournament.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationRequestDto } from '../common/pagination/dto/pagination-request.dto';
import { TournamentsGetAllDto } from '../common/pagination/dto/get-all-responses/tournaments-get-all.dto';
import { Tournament } from '@prisma/client';
import { TournamentDto } from './dto/tournament.dto';
import { plainToInstance } from 'class-transformer';

describe('TournamentService', () => {
  let service: TournamentService;

  const mockPrismaService = {
    tournament: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  };

  const mockTournaments: Tournament[] = [
    {
      id: '05d32af1-9a7b-40ca-a0d2-709f4ba51e15',
      name: 'Tournament of Power',
      creator: 'Zeno',
      location: 'World of Void',
      prize: 'Granting any wish with Super Dragon Balls',
      startDate: new Date('0780-01-01T00:00:00.000Z'),
      createdAt: new Date('2025-03-27T15:33:03.469Z'),
      updatedAt: new Date('2025-03-27T15:33:03.469Z'),
    },
    {
      id: 'otra-id-de-torneo',
      name: 'Otro Torneo',
      creator: 'Otro Creador',
      location: 'Otra Ubicación',
      prize: 'Otro Premio',
      startDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'otra-id-de-torneo2',
      name: 'Otro Torneo 2',
      creator: 'Otro Creador 2',
      location: 'Otra Ubicación 2',
      prize: 'Otro Premio 2',
      startDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as Tournament[];

  const mockTournamentsDto = plainToInstance(TournamentDto, mockTournaments);

  const mockTotalCount = 3;
  const defaultPaginationDto: PaginationRequestDto = {};

  beforeEach(async () => {
    jest.clearAllMocks();

    mockPrismaService.tournament.findMany.mockImplementation(
      ({ skip = 0, take = 10 }) => {
        return Promise.resolve(
          mockTournaments.slice(Number(skip), Number(skip + take)),
        );
      },
    );
    mockPrismaService.tournament.count.mockResolvedValue(mockTotalCount);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TournamentService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TournamentService>(TournamentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTournaments', () => {
    it('should call prisma.tournament.findMany and prisma.tournament.count with default pagination', async () => {
      await service.getAllTournaments(defaultPaginationDto);

      expect(mockPrismaService.tournament.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { id: 'asc' },
      });
      expect(mockPrismaService.tournament.count).toHaveBeenCalled();
    });

    it('should call prisma.tournament.findMany and prisma.tournament.count with provided pagination', async () => {
      const paginationDto: PaginationRequestDto = {
        page: 2,
        limit: 5,
        order: 'desc',
      };

      await service.getAllTournaments(paginationDto);

      expect(mockPrismaService.tournament.findMany).toHaveBeenCalledWith({
        skip: 5,
        take: 5,
        orderBy: { id: 'desc' },
      });
      expect(mockPrismaService.tournament.count).toHaveBeenCalled();
    });

    it('should return a TournamentsGetAllDto with correct data and totalCount', async () => {
      const result = await service.getAllTournaments(defaultPaginationDto);

      expect(result).toBeInstanceOf(TournamentsGetAllDto);
      expect(result.tournaments).toEqual(mockTournamentsDto);
      expect(result.totalCount).toEqual(mockTotalCount);
      expect(result).toHaveProperty('itemsPage');
    });

    it('should handle empty tournaments from prisma', async () => {
      mockPrismaService.tournament.findMany.mockResolvedValue([]);
      mockPrismaService.tournament.count.mockResolvedValue(0);

      const result = await service.getAllTournaments(defaultPaginationDto);

      expect(result).toBeInstanceOf(TournamentsGetAllDto);
      expect(result.tournaments).toEqual([]);
      expect(result.totalCount).toEqual(0);
      expect(result).toHaveProperty('itemsPage');
      expect(result.itemsPage).toBe(0);
    });

    it('should calculate itemsPage correctly based on limit and totalCount', async () => {
      const paginationDto: PaginationRequestDto = {
        limit: 1,
      };

      const result = await service.getAllTournaments(paginationDto);

      expect(result).toBeInstanceOf(TournamentsGetAllDto);
      expect(result.tournaments).toEqual([mockTournamentsDto[0]]);
      expect(result.totalCount).toBe(mockTotalCount);
      expect(result).toHaveProperty('itemsPage');
      expect(result.itemsPage).toBe(1);
    });
  });
});
