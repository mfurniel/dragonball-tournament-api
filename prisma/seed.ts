import { PrismaClient } from '@prisma/client';
import { seedTournaments } from './seeders/seedTournaments';
import { seedWarriors } from './seeders/seedWarriors';
import { seedFights } from './seeders/seedFights';
import { seedUsers } from './seeders/seedUsers';

const prisma = new PrismaClient();

async function main() {
  const users = await seedUsers(prisma);
  const warriors = await seedWarriors(prisma, users);
  const tournaments = await seedTournaments(prisma, users);
  await seedFights(prisma, tournaments, warriors);

  console.log('Seed completed successfully ✅');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
