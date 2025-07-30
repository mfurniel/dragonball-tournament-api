import { Test, TestingModule } from '@nestjs/testing';
import { WarriorService } from './warrior.service';
import { WarriorDto } from './dto/warrior.dto';
import { PrismaService } from '../prisma/prisma.service';

describe('WarriorService', () => {
  let service: WarriorService;

  const mockWarriorService = {
    warrior: {
      findMany: jest.fn(),
    },
  };

  const mockWarriors: WarriorDto[] = [
    {
      id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
      name: 'Goku',
      race: 'Saiyan',
      powerLevel: 9000,
      createdAt: new Date('2025-03-27T10:00:00.000Z'),
      updatedAt: new Date('2025-03-27T10:00:00.000Z'),
    },
    {
      id: 'b2c3d4e5-f6a7-8901-bcde-2345678901bc',
      name: 'Vegeta',
      race: 'Saiyan',
      powerLevel: 8500,
      createdAt: new Date('2025-03-28T12:00:00.000Z'),
      updatedAt: new Date('2025-03-28T12:00:00.000Z'),
    },
    {
      id: 'c3d4e5f6-a789-0123-cdef-3456789012cd',
      name: 'Piccolo',
      race: 'Namekian',
      powerLevel: 3000,
      createdAt: new Date('2025-03-29T14:00:00.000Z'),
      updatedAt: new Date('2025-03-29T14:00:00.000Z'),
    },
  ] as WarriorDto[];

  beforeEach(async () => {
    jest.clearAllMocks();

    mockWarriorService.warrior.findMany.mockImplementation(
      ({ skip = 0, take = 10 }) => {
        return Promise.resolve(
          mockWarriors.slice(Number(skip), Number(skip + take)),
        );
      },
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WarriorService,
        {
          provide: PrismaService,
          useValue: mockWarriorService,
        },
      ],
    }).compile();

    service = module.get<WarriorService>(WarriorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
