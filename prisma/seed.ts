import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tournaments = [
    {
      name: 'World Martial Arts Tournament',
      creator: 'Rey Peludo',
      location: 'Papaya Island',
      prize: '100,000 Zeni',
      startDate: new Date('0750-01-01'),
    },
    {
      name: 'Cell Games',
      creator: 'Cell',
      location: 'Cell Arena',
      prize: 'Survival of Earth',
      startDate: new Date('0767-01-01'),
    },
    {
      name: 'Universe 6 vs Universe 7 Tournament',
      creator: 'Beerus',
      location: 'Nameless Planet',
      prize: 'Super Dragon Balls',
      startDate: new Date('0780-01-01'),
    },
    {
      name: 'Tournament of Power',
      creator: 'Zeno',
      location: 'World of Void',
      prize: 'Granting any wish with Super Dragon Balls',
      startDate: new Date('0780-01-01'),
    },
  ];

  const warriors = [
    {
      name: 'Goku',
      race: 'Saiyan',
      powerLevel: 9000,
    },
    {
      name: 'Vegeta',
      race: 'Saiyan',
      powerLevel: 18000,
    },
    {
      name: 'Piccolo',
      race: 'Namekian',
      powerLevel: 3000,
    },
    {
      name: 'Krillin',
      race: 'Human',
      powerLevel: 1500,
    },
    {
      name: 'Frieza',
      race: 'Frieza Race',
      powerLevel: 15000,
    },
    {
      name: 'Cell',
      race: 'Bio-Android',
      powerLevel: 3000000000,
    },
    {
      name: 'Majin Buu',
      race: 'Majin',
      powerLevel: 30000000000,
    },
    {
      name: 'Gohan',
      race: 'Saiyan-Human Hybrid',
      powerLevel: 40000000000,
    },
  ];

  for (const tournament of tournaments) {
    await prisma.tournament.create({
      data: tournament,
    });
  }

  for (const warrior of warriors) {
    await prisma.warrior.create({
      data: warrior,
    });
  }

  console.log('Seed data inserted successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
