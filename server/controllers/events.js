const prisma = require('../prismaClient');

exports.getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { eventDate: 'asc' },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description = '', location, eventDate } = req.body;

    if (!title || !location || !eventDate) {
      return res.status(400).json({ error: 'Title, location and eventDate are required' });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        eventDate: new Date(eventDate),
      },
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

exports.rsvpEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.update({
      where: { id: parseInt(id, 10) },
      data: { rsvpCount: { increment: 1 } },
    });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to RSVP event' });
  }
};
