import React from 'react';

export default function Dashboard({ user }) {
  return (
    <div className="container mt-5 text-dark">
      <h2 className="text-dark">Welcome, {user.firstName}!</h2>
      <p className="text-dark">Your current points: {user.points}</p>
    </div>
  );

}