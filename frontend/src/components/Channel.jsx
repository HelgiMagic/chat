import React from 'react';

const Channel = ({ children }) => (
  <li className="nav-item w-100">
    <button
      type="button"
      className="w-100 rounded-0 text-start btn btn-secondary"
    >
      <span className="me-1">#</span>
      {children}
    </button>
  </li>
);

export default Channel;
