const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const orgs = await prisma.organization.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, slug: true, status: true, createdAt: true }
  });
  console.log(JSON.stringify(orgs, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());