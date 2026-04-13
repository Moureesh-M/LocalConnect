import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getPosts = () => axios.get(`${API_URL}/posts`);
export const createPost = (content) => axios.post(`${API_URL}/posts`, { content });

export const getIssues = () => axios.get(`${API_URL}/issues`);
export const createIssue = (title, description) => axios.post(`${API_URL}/issues`, { title, description });
export const updateIssue = (id, status) => axios.patch(`${API_URL}/issues/${id}`, { status });

export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const createTask = (title, assignedTo) => axios.post(`${API_URL}/tasks`, { title, assignedTo });
export const updateTask = (id, status) => axios.patch(`${API_URL}/tasks/${id}`, { status });

export const getEvents = () => axios.get(`${API_URL}/events`);
export const createEvent = (payload) => axios.post(`${API_URL}/events`, payload);
export const rsvpEvent = (id) => axios.patch(`${API_URL}/events/${id}/rsvp`);

export const getHelpRequests = () => axios.get(`${API_URL}/help-requests`);
export const createHelpRequest = (payload) => axios.post(`${API_URL}/help-requests`, payload);
export const updateHelpRequest = (id, payload) => axios.patch(`${API_URL}/help-requests/${id}`, payload);

export const getMetrics = () => axios.get(`${API_URL}/metrics`);
