import React, { useState, useEffect } from 'react';

export default function Dashboard({ user, onNavigate }) {
  const [reservations, setReservations] = useState([]);
  const [survey, setSurvey] = useState(null);
  const today = new Date();

  // Fetch reservations
  useEffect(() => {
    if (!user?.customerID) return;
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3100/customer/reservations?customerID=${user.customerID}`
        );
        if (!res.ok) throw new Error('Reservations fetch failed');
        const data = await res.json();
        setReservations(data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user]);

  // Fetch survey data
  useEffect(() => {
    if (!user?.customerID) return;
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3100/customer/survey?customerID=${user.customerID}`
        );
        if (!res.ok) throw new Error('Survey fetch failed');
        const data = await res.json();
        setSurvey(data || null);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user]);

  // Prepare upcoming reservations
  const upcoming = reservations
    .map(r => ({ ...r, dateValue: new Date(r.reservedFor) }))
    .filter(r => r.dateValue >= today)
    .sort((a, b) => a.dateValue - b.dateValue);
  const nextRes = upcoming[0] || null;

  return (
    <div className="container mt-5 text-dark">
      <h2 className="text-dark">Welcome, {user.firstName}!</h2>
      <p className="text-dark">Your current points: {user.points}</p>

      {/* INFO TILES */}
      <div className="row mt-4">
        {/* Personal Info Tile */}
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm px-3 py-2" style={{ minHeight: '100px' }}>
            <h6 className="mb-2 text-dark">👤 Personal Info</h6>
            <p className="mb-1 text-dark">
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p className="mb-0 text-dark">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>

        {/* Reservation Info Tile */}
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm px-3 py-2" style={{ minHeight: '100px' }}>
            <h6 className="mb-2 text-dark">📅 Reservations</h6>
            <p className="mb-1 text-dark">
              <strong>Upcoming:</strong> {upcoming.length}
            </p>
            {nextRes ? (
              <p className="mb-0 text-dark">
                <strong>Next:</strong> {nextRes.dateValue.toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                })}
              </p>
            ) : (
              <p className="mb-0 text-dark">No upcoming</p>
            )}
          </div>
        </div>

        {/* Survey Info Tile */}
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm px-3 py-2" style={{ minHeight: '100px' }}>
            <h6 className="mb-2 text-dark">📝 Survey</h6>
            {survey ? (
              <>
                <p className="mb-1 text-dark">
                  <strong>Overall:</strong> {survey.overall_score}
                </p>
                <p className="mb-0 text-dark">
                  <strong>Feedback:</strong> {survey.feedback || '—'}
                </p>
              </>
            ) : (
              <p className="mb-0 text-dark">No survey data</p>
            )}
          </div>
        </div>
      </div>

      {/* NAVIGATION CARDS */}
      <div className="row mt-4">
        {[
          { title: 'Personal Info', key: 'personalInfo' },
          { title: 'Reservations', key: 'reservation' },
          { title: 'Survey', key: 'survey' },
          { title: 'Rewards', key: 'rewards' },
        ].map(({ title, key }) => (
          <div className="col-md-3 mb-4" key={key}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-dark">{title}</h5>
                <div className="mt-auto d-flex justify-content-center">
                  <button
                    className="btn btn-sm text-white"
                    style={{
                      backgroundColor: '#2b7e7e',
                      borderColor: '#2b7e7e',
                      padding: '0.25rem 0.5rem'
                    }}
                    onClick={() => onNavigate(key)}
                  >Go</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
