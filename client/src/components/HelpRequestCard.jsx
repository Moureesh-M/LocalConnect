import React from 'react';

const statusClass = {
  OPEN: 'status-red',
  MATCHED: 'status-yellow',
  RESOLVED: 'status-green',
};

const HelpRequestCard = ({ request, onVolunteer, onResolve, onReopen }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{request.title}</h3>
        <span className={`badge ${statusClass[request.status] || 'status-blue'}`}>
          {request.status}
        </span>
      </div>
      <p className="card-description">{request.description}</p>
      <p className="card-description"><strong>Needed by:</strong> {new Date(request.neededBy).toLocaleDateString()}</p>
      <p className="card-description"><strong>Volunteer:</strong> {request.volunteerName || 'Not yet matched'}</p>
      <div className="card-footer card-footer-inline">
        {request.status !== 'RESOLVED' ? (
          <>
            <button onClick={() => onVolunteer(request.id)} className="btn-link" type="button">Volunteer</button>
            <button onClick={() => onResolve(request.id)} className="btn-link" type="button">Mark Resolved</button>
          </>
        ) : (
          <button onClick={() => onReopen(request.id)} className="btn-link" type="button">Reopen</button>
        )}
      </div>
    </div>
  );
};

export default HelpRequestCard;
