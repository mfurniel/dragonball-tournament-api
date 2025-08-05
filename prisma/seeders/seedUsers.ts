import { PrismaClient, User } from '@prisma/client';
import { encrypt } from '../../src/auth/libs/bcrypt';
import { UserRole } from '@prisma/client';

const DEFAULT_PASSWORD = 'Admin_123456';

type UsersMap = Record<string, User>;

export async function seedUsers(prisma: PrismaClient): Promise<UsersMap> {
  const warriors = [
    { name: 'Goku' },
    { name: 'Vegeta' },
    { name: 'Piccolo' },
    { name: 'Krillin' },
    { name: 'Frieza' },
    { name: 'Cell' },
    { name: 'Majin Buu' },
    { name: 'Gohan' },
  ];

  const extraUsers = [
    { username: 'admin', role: UserRole.SUPER_ADMIN },
    { username: 'superadmin', role: UserRole.ADMIN },
    { username: 'moderator', role: UserRole.MODERATOR },
    { username: 'beerus', role: UserRole.USER },
    { username: 'zeno', role: UserRole.USER },
  ];

  const inserted: UsersMap = {};

  for (const warrior of warriors) {
    const username = warrior.name.toLowerCase();

    const user = await prisma.user.create({
      data: {
        username,
        password: await encrypt(DEFAULT_PASSWORD),
        role: UserRole.USER,
        lastLoginAt: new Date(),
      },
    });

    inserted[username] = user;
  }

  for (const userInfo of extraUsers) {
    const user = await prisma.user.create({
      data: {
        username: userInfo.username,
        password: await encrypt(DEFAULT_PASSWORD),
        role: userInfo.role,
        lastLoginAt: new Date(),
      },
    });

    inserted[user.username] = user;
  }

  return inserted;
}
