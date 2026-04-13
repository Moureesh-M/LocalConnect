const express = require('express');
const cors = require('cors');
require('dotenv').config();

const postsRoutes = require('./routes/posts');
const issuesRoutes = require('./routes/issues');
const tasksRoutes = require('./routes/tasks');
const metricsRoutes = require('./routes/metrics');
const eventsRoutes = require('./routes/events');
const helpRequestsRoutes = require('./routes/helpRequests');

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : '*';

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/posts', postsRoutes);
app.use('/issues', issuesRoutes);
app.use('/tasks', tasksRoutes);
app.use('/metrics', metricsRoutes);
app.use('/events', eventsRoutes);
app.use('/help-requests', helpRequestsRoutes);

app.get('/', (req, res) => {
  res.send('LocalConnect API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
