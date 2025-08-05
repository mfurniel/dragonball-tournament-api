import { PrismaClient, Tournament, User } from '@prisma/client';

type TournamentsMap = Record<string, Tournament>;
type UsersMap = Record<string, User>;

export async function seedTournaments(
  prisma: PrismaClient,
  users: UsersMap,
): Promise<TournamentsMap> {
  const data = [
    {
      name: 'World Martial Arts Tournament',
      creatorUsername: 'goku',
      location: 'Papaya Island',
      prize: '100,000 Zeni',
      startDate: new Date('0750-01-01'),
    },
    {
      name: 'Cell Games',
      creatorUsername: 'cell',
      location: 'Cell Arena',
      prize: 'Survival of Earth',
      startDate: new Date('0767-01-01'),
    },
    {
      name: 'Universe 6 vs Universe 7 Tournament',
      creatorUsername: 'beerus',
      location: 'Nameless Planet',
      prize: 'Super Dragon Balls',
      startDate: new Date('0780-01-01'),
    },
    {
      name: 'Tournament of Power',
      creatorUsername: 'zeno',
      location: 'World of Void',
      prize: 'Granting any wish with Super Dragon Balls',
      startDate: new Date('0780-01-01'),
    },
  ];

  const inserted: TournamentsMap = {};

  for (const tournament of data) {
    const creator = users[tournament.creatorUsername.toLowerCase()];
    if (!creator) {
      throw new Error(
        `No user found with username "${tournament.creatorUsername}"`,
      );
    }

    const created = await prisma.tournament.create({
      data: {
        name: tournament.name,
        location: tournament.location,
        prize: tournament.prize,
        startDate: tournament.startDate,
        creatorId: creator.id,
      },
    });

    inserted[created.name] = created;
  }

  return inserted;
}
