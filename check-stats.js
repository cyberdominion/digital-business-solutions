const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const total = await prisma.application.count();
  const submitted = await prisma.application.count({ where: { status: 'SUBMITTED' } });
  const approved = await prisma.application.count({ where: { status: 'APPROVED' } });
  const paid = await prisma.application.count({ where: { status: 'PAID' } });
  const live = await prisma.application.count({ where: { status: 'LIVE' } });
  
  console.log('Total:', total);
  console.log('Submitted:', submitted);
  console.log('Approved:', approved);
  console.log('Paid:', paid);
  console.log('Live:', live);
}
main().catch(console.error).finally(() => prisma.$disconnect());