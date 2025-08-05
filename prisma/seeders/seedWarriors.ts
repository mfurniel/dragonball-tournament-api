import { PrismaClient, Warrior, User } from '@prisma/client';

type UsersMap = Record<string, User>;
type WarriorsMap = Record<string, Warrior>;

export async function seedWarriors(
  prisma: PrismaClient,
  users: UsersMap,
): Promise<WarriorsMap> {
  const data = [
    { name: 'Goku', race: 'Saiyan', powerLevel: 9000 },
    { name: 'Vegeta', race: 'Saiyan', powerLevel: 18000 },
    { name: 'Piccolo', race: 'Namekian', powerLevel: 3000 },
    { name: 'Krillin', race: 'Human', powerLevel: 1500 },
    { name: 'Frieza', race: 'Frieza Race', powerLevel: 15000 },
    { name: 'Cell', race: 'Bio-Android', powerLevel: 3000 },
    { name: 'Majin Buu', race: 'Majin', powerLevel: 3000 },
    { name: 'Gohan', race: 'Saiyan-Human Hybrid', powerLevel: 4000 },
  ];

  const inserted: WarriorsMap = {};

  for (const warrior of data) {
    const username = warrior.name.toLowerCase();
    const user = users[username];

    if (!user) {
      throw new Error(`No user found for warrior "${warrior.name}"`);
    }

    const created = await prisma.warrior.create({
      data: {
        name: warrior.name,
        race: warrior.race,
        powerLevel: warrior.powerLevel,
        userId: user.id,
      },
    });

    inserted[created.name] = created;
  }

  return inserted;
}
