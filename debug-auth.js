const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🔍 Checking Admin User...');

    // 1. Cek Admin
    const user = await prisma.user.findUnique({ where: { nip: 'admin' } });

    if (!user) {
        console.error('❌ User "admin" NOT FOUND in database!');
        console.log('🛠️ Creating admin user...');
        const hash = await bcrypt.hash('admin123', 10);
        await prisma.user.create({
            data: {
                nip: 'admin',
                name: 'Super Administrator',
                password: hash,
                role: 'INTERNAL',
                isActive: true
            }
        });
        console.log('✅ Admin user created.');
        return;
    }

    console.log('✅ User found:', {
        id: user.id,
        nip: user.nip,
        role: user.role,
        isActive: user.isActive
    });

    // 2. Cek Password
    const isMatch = await bcrypt.compare('admin123', user.password);
    console.log('🔐 Validating password "admin123":', isMatch ? '✅ MATCH' : '❌ INVALID PWD');

    if (!isMatch) {
        console.log('⚠️ Password mismatch detected. Resetting password to "admin123"...');
        const newHash = await bcrypt.hash('admin123', 10);
        await prisma.user.update({
            where: { nip: 'admin' },
            data: { password: newHash }
        });
        console.log('✅ Password Reset Done. Try Login again.');
    } else {
        console.log('👍 Account is healthy. Login should work.');
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
