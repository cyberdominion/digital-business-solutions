const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const apps = await prisma.application.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
    select: { id: true, businessName: true, status: true, campaignId: true, createdAt: true }
  });
  console.log(JSON.stringify(apps, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());