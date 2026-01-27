
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Checking User Satker IDs...");
    const users = await prisma.user.findMany({
        select: {
            nip: true,
            name: true,
            role: true,
            satkerId: true,
            isActive: true
        }
    });

    console.log("\nUsers:");
    users.forEach(u => {
        console.log(`- [${u.role}] ${u.name} (${u.nip}) -> SatkerId: '${u.satkerId}'`);
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
