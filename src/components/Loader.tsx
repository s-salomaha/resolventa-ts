import React from 'react';

export const Loader: React.FC = () => (
  <div className="d-flex align-items-center">
    <div className="spinner-grow text-primary" style={{width: '3rem', height: '3rem'}} role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <span className="pl-3">Loading...</span>
  </div>
);
