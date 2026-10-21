import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../generated/prisma/client/index.js';

const email = (process.env.SEED_SUPERADMIN_EMAIL ?? '').trim().toLowerCase();
const password = process.env.SEED_SUPERADMIN_PASSWORD ?? '';

if (!email || password.length < 12) {
  console.error('Set SEED_SUPERADMIN_EMAIL and SEED_SUPERADMIN_PASSWORD (12+ characters).');
  process.exit(1);
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

const user = await prisma.user.findUnique({ where: { email } });
if (!user) {
  console.error(`No account found for ${email}.`);
  await prisma.$disconnect();
  process.exit(1);
}

await prisma.user.update({
  where: { id: user.id },
  data: { passwordHash: await bcrypt.hash(password, 12), status: 'ACTIVE' },
});
console.log(`password reset for ${email} (role ${user.role})`);
await prisma.$disconnect();