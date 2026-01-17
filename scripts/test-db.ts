
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
    try {
        console.log("⏳ Testing database connection...");
        const userCount = await prisma.user.count();
        console.log(`✅ Connected! User count: ${userCount}`);
    } catch (error) {
        console.error("❌ Connection failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
