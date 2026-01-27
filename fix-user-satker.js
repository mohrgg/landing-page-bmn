
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const targetSatkerId = '026010199450938000KP';
    const targetNip = 'satker01';

    console.log(`Ensuring Satker ${targetSatkerId} exists...`);

    // Upsert Satker to ensure it exists
    await prisma.satker.upsert({
        where: { kode: targetSatkerId },
        update: {},
        create: {
            kode: targetSatkerId,
            nama: 'Satker Contoh (Dari Siman)',
            wilayah: 'Pusat'
        }
    });

    console.log(`Updating user ${targetNip} to use satkerId: ${targetSatkerId}...`);

    const updatedUser = await prisma.user.update({
        where: { nip: targetNip },
        data: { satkerId: targetSatkerId }
    });

    console.log("Update successful:", updatedUser);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
