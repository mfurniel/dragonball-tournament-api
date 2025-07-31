import { PrismaClient, FightStatus } from '@prisma/client';

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
      powerLevel: 3000,
    },
    {
      name: 'Majin Buu',
      race: 'Majin',
      powerLevel: 3000,
    },
    {
      name: 'Gohan',
      race: 'Saiyan-Human Hybrid',
      powerLevel: 4000,
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

  // Obtener torneos y guerreros desde la DB
  const dbTournaments = await prisma.tournament.findMany();
  const dbWarriors = await prisma.warrior.findMany();

  // Crear un mapa rápido para facilitar acceso por nombre
  const tournamentMap = Object.fromEntries(
    dbTournaments.map((t) => [t.name, t]),
  );
  const warriorMap = Object.fromEntries(dbWarriors.map((w) => [w.name, w]));

  // Definir un tipo para los datos de las peleas para un tipado explícito
  type FightSeedData = {
    tournamentId: string;
    warrior1Id: string;
    warrior2Id: string;
    winnerId?: string; // 'winnerId' es opcional porque la pelea en progreso no tiene uno
    creator: string;
    description: string;
    startTime: Date;
    endTime: Date | null;
    status: FightStatus;
  };

  const fights: FightSeedData[] = [
    // Aplicamos el tipo aquí
    {
      tournamentId: tournamentMap['World Martial Arts Tournament'].id,
      warrior1Id: warriorMap['Goku'].id,
      warrior2Id: warriorMap['Krillin'].id,
      winnerId: warriorMap['Goku'].id,
      creator: 'Master Roshi',
      description: 'Goku vs Krillin en las semifinales del torneo clásico.',
      startTime: new Date('0750-01-10T10:00:00Z'),
      endTime: new Date('0750-01-10T10:30:00Z'),
      status: FightStatus.FINISHED,
    },
    {
      tournamentId: tournamentMap['Cell Games'].id,
      warrior1Id: warriorMap['Gohan'].id,
      warrior2Id: warriorMap['Cell'].id,
      winnerId: warriorMap['Gohan'].id,
      creator: 'Kami',
      description: 'La icónica pelea final entre Gohan y Cell.',
      startTime: new Date('0767-01-15T15:00:00Z'),
      endTime: new Date('0767-01-15T15:45:00Z'),
      status: FightStatus.FINISHED,
    },
    {
      tournamentId: tournamentMap['Tournament of Power'].id,
      warrior1Id: warriorMap['Frieza'].id,
      warrior2Id: warriorMap['Jiren']?.id || warriorMap['Vegeta'].id, // fallback si no tienes a Jiren
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
