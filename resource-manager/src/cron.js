const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Run every minute to expire outdated resources
cron.schedule("* * * * *", async () => {
  try {
    const result = await prisma.resource.updateMany({
      where: {
        expirationTime: { lte: new Date() },
        status: "active",
      },
      data: { status: "expired" },
    });

    console.log(`Expired ${result.count} resources.`);
  } catch (error) {
    console.error("Error expiring resources:", error.message);
  }
});
