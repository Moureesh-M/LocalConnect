const prisma = require('../prismaClient');

exports.getMetrics = async (req, res) => {
  try {
    const totalPosts = await prisma.post.count();
    const totalIssues = await prisma.issue.count();
    const tasksCompleted = await prisma.task.count({
      where: { status: 'COMPLETED' }
    });
    const upcomingEvents = await prisma.event.count({
      where: {
        eventDate: {
          gte: new Date(),
        },
      },
    });
    const openHelpRequests = await prisma.helpRequest.count({
      where: {
        status: {
          in: ['OPEN', 'MATCHED'],
        },
      },
    });

    res.json({
      totalPosts,
      totalIssues,
      tasksCompleted,
      upcomingEvents,
      openHelpRequests
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
};
