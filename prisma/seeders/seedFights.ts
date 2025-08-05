import { PrismaClient, FightStatus } from '@prisma/client';

export async function seedFights(
  prisma: PrismaClient,
  tournaments: Record<string, { id: string }>,
  warriors: Record<string, { id: string }>,
) {
  const fights = [
    {
      tournamentId: tournaments['World Martial Arts Tournament'].id,
      warrior1Id: warriors['Goku'].id,
      warrior2Id: warriors['Krillin'].id,
      winnerId: warriors['Goku'].id,
      creator: 'Master Roshi',
      description: 'Goku vs Krillin en las semifinales del torneo clásico.',
      startTime: new Date('0750-01-10T10:00:00Z'),
      endTime: new Date('0750-01-10T10:30:00Z'),
      status: FightStatus.FINISHED,
    },
    {
      tournamentId: tournaments['Cell Games'].id,
      warrior1Id: warriors['Gohan'].id,
      warrior2Id: warriors['Cell'].id,
      winnerId: warriors['Gohan'].id,
      creator: 'Kami',
      description: 'La icónica pelea final entre Gohan y Cell.',
      startTime: new Date('0767-01-15T15:00:00Z'),
      endTime: new Date('0767-01-15T15:45:00Z'),
      status: FightStatus.FINISHED,
    },
    {
      tournamentId: tournaments['Tournament of Power'].id,
      warrior1Id: warriors['Frieza'].id,
      warrior2Id: warriors['Vegeta'].id, // o Jiren si lo agregas
      creator: 'Zeno',
      description: 'Una pelea intensa en el mundo del vacío.',
      startTime: new Date('0780-01-01T12:00:00Z'),
      endTime: null,
      status: FightStatus.IN_PROGRESS,
    },
  ];

  for (const fight of fights) {
    await prisma.fight.create({ data: fight });
  }
}
