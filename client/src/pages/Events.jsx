import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { getEvents, createEvent, rsvpEvent } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    eventDate: '',
  });

  const fetchEvents = async () => {
    try {
      const { data } = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim() || !form.eventDate) return;

    try {
      await createEvent(form);
      setForm({ title: '', description: '', location: '', eventDate: '' });
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRsvp = async (id) => {
    try {
      await rsvpEvent(id);
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="page-title">Neighborhood Events</h1>
      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '1rem' }}>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="input-field"
              placeholder="Event title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={{ marginBottom: '0.5rem' }}
            />
            <textarea
              className="input-field"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="2"
              style={{ marginBottom: '0.5rem' }}
            />
            <input
              className="input-field"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              style={{ marginBottom: '0.5rem' }}
            />
            <input
              className="input-field"
              type="date"
              value={form.eventDate}
              onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary">Publish Event</button>
        </form>
      </div>
      <div className="grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onRsvp={handleRsvp} />
        ))}
      </div>
    </div>
  );
};

export default Events;
