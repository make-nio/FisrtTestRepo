import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('sanchezm', 10);
  await prisma.user.upsert({
    where: { username: 'sanchezm' },
    update: {},
    create: { username: 'sanchezm', password: hashed },
  });
  console.log('Admin user created: sanchezm');
}

main().catch(console.error).finally(() => prisma.$disconnect());
