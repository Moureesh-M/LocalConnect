import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle, CheckSquare, BarChart2, CalendarDays, HandHelping } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">LocalConnect</Link>
        <div className="nav-links">
          <Link to="/" className="nav-item"><BarChart2 size={18} /> Dashboard</Link>
          <Link to="/feed" className="nav-item"><Home size={18} /> Feed</Link>
          <Link to="/issues" className="nav-item"><AlertCircle size={18} /> Issues</Link>
          <Link to="/tasks" className="nav-item"><CheckSquare size={18} /> Tasks</Link>
          <Link to="/events" className="nav-item"><CalendarDays size={18} /> Events</Link>
          <Link to="/help-requests" className="nav-item"><HandHelping size={18} /> Help</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
