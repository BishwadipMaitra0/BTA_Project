import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        Messenger
      </div>
      <ul className="nav-links">
        <li>Chats</li>
        <li>Contacts</li>
        <li>Settings</li>
      </ul>
    </nav>
  );
}

export default Navbar;
