const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Posts
  await prisma.post.createMany({
    data: [
      { content: 'Garage sale announcement - This Saturday at 123 Maple St!' },
      { content: 'Lost dog notice - Golden Retriever named "Buddy" last seen near the park.' },
      { content: 'Community meeting - Tuesday at 7 PM in the community center.' },
    ],
  });

  // Issues
  await prisma.issue.createMany({
    data: [
      { title: 'Broken streetlight', description: 'Corner of 4th and Oak is Pitch black.' },
      { title: 'Garbage overflow', description: 'Park bins haven\'t been emptied in a week.' },
    ],
  });

  // Tasks
  await prisma.task.createMany({
    data: [
      { title: 'Clean neighborhood park', assignedTo: 'John Doe', status: 'PENDING' },
      { title: 'Organize community meeting', assignedTo: 'Jane Smith', status: 'COMPLETED' },
    ],
  });

  // Events
  await prisma.event.createMany({
    data: [
      {
        title: 'Weekend Park Cleanup',
        description: 'Join neighbors to clean the central park and plant flowers.',
        location: 'Central Park Entrance',
        eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        rsvpCount: 8,
      },
      {
        title: 'Neighborhood Potluck',
        description: 'Bring one dish and meet new neighbors.',
        location: 'Community Hall',
        eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        rsvpCount: 14,
      },
    ],
  });

  // Help Requests
  await prisma.helpRequest.createMany({
    data: [
      {
        title: 'Need grocery pickup for senior resident',
        description: 'Pickup needed from local market before evening.',
        neededBy: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'OPEN',
      },
      {
        title: 'Help assembling study desk',
        description: 'Looking for someone with basic tools for 1 hour.',
        neededBy: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: 'MATCHED',
        volunteerName: 'Aisha',
      },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
