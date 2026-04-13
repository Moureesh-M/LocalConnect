import React from 'react';

const EventCard = ({ event, onRsvp }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{event.title}</h3>
        <span className="badge status-blue">{new Date(event.eventDate).toLocaleDateString()}</span>
      </div>
      <p className="card-description">{event.description}</p>
      <p className="card-description"><strong>Location:</strong> {event.location}</p>
      <div className="card-footer card-footer-inline">
        <span className="metric-chip">{event.rsvpCount} RSVPs</span>
        <button onClick={() => onRsvp(event.id)} className="btn-primary" type="button">
          RSVP
        </button>
      </div>
    </div>
  );
};

export default EventCard;
