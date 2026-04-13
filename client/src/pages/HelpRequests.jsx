import React, { useEffect, useState } from 'react';
import HelpRequestCard from '../components/HelpRequestCard';
import { getHelpRequests, createHelpRequest, updateHelpRequest } from '../services/api';

const HelpRequests = () => {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    neededBy: '',
  });

  const fetchRequests = async () => {
    try {
      const { data } = await getHelpRequests();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.neededBy) return;

    try {
      await createHelpRequest(form);
      setForm({ title: '', description: '', neededBy: '' });
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const handleVolunteer = async (id) => {
    const volunteerName = window.prompt('Enter your name to volunteer:');
    if (!volunteerName || !volunteerName.trim()) return;

    try {
      await updateHelpRequest(id, { status: 'MATCHED', volunteerName: volunteerName.trim() });
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const handleResolve = async (id) => {
    try {
      await updateHelpRequest(id, { status: 'RESOLVED' });
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReopen = async (id) => {
    try {
      await updateHelpRequest(id, { status: 'OPEN', volunteerName: null });
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="page-title">Neighbor Help Requests</h1>
      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '1rem' }}>Ask for Help</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="input-field"
              placeholder="What do you need help with?"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={{ marginBottom: '0.5rem' }}
            />
            <textarea
              className="input-field"
              placeholder="Add details (optional)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="2"
              style={{ marginBottom: '0.5rem' }}
            />
            <input
              className="input-field"
              type="date"
              value={form.neededBy}
              onChange={(e) => setForm({ ...form, neededBy: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary">Post Help Request</button>
        </form>
      </div>
      <div className="grid">
        {requests.map((request) => (
          <HelpRequestCard
            key={request.id}
            request={request}
            onVolunteer={handleVolunteer}
            onResolve={handleResolve}
            onReopen={handleReopen}
          />
        ))}
      </div>
    </div>
  );
};

export default HelpRequests;
