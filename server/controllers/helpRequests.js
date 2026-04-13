const prisma = require('../prismaClient');

exports.getHelpRequests = async (req, res) => {
  try {
    const requests = await prisma.helpRequest.findMany({
      orderBy: { neededBy: 'asc' },
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch help requests' });
  }
};

exports.createHelpRequest = async (req, res) => {
  try {
    const { title, description = '', neededBy } = req.body;

    if (!title || !neededBy) {
      return res.status(400).json({ error: 'Title and neededBy are required' });
    }

    const request = await prisma.helpRequest.create({
      data: {
        title,
        description,
        neededBy: new Date(neededBy),
      },
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create help request' });
  }
};

exports.updateHelpRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, volunteerName } = req.body;

    const request = await prisma.helpRequest.update({
      where: { id: parseInt(id, 10) },
      data: {
        ...(status ? { status } : {}),
        ...(volunteerName !== undefined ? { volunteerName } : {}),
      },
    });

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update help request' });
  }
};
