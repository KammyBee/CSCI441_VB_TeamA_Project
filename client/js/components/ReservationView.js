import React, { useState, useEffect } from 'react';

export default function ReservationView({ user }) {
  const [form, setForm] = useState({ reserved_for: '', group_size: 1, special_event: '' });
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reservations on mount/user change
  useEffect(() => {
    if (!user?.customerID) return;
    setLoading(true);
    fetch(`http://localhost:3100/customer/reservations?customerID=${user.customerID}`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText || 'Fetch failed');
        return res.json();
      })
      .then(data => {
        setReservations(data || []);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Submit new reservation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.reserved_for) {
      alert('Please select a date and time');
      return;
    }
    try {
      // Convert HTML datetime-local format to MySQL DATETIME format
      // form.reserved_for is "YYYY-MM-DDTHH:mm"
      const sqlDateTime = form.reserved_for.replace('T', ' ') + ':00';
      const payload = {
        customer_id: user.customerID,
        reserved_for: sqlDateTime,
        group_size: form.group_size,
        special_event: form.special_event || null
      };

      const res = await fetch('http://localhost:3100/customer/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(res.statusText || 'Create failed');
      const raw = await res.json();
        // normalize the field names:
        const newRes = {
          reservationID: raw.reservationID ?? raw.reservation_id,
          customerID:   raw.customerID   ?? raw.customer_id,
          reservedFor:  raw.reservedFor  ?? raw.reserved_for,
          groupSize:    raw.groupSize    ?? raw.group_size,
          specialEvent: raw.specialEvent ?? raw.special_event,
          status:       raw.status       ?? 'Active',
          createdAt:    raw.createdAt    ?? raw.created_at
        };

      setReservations(r => [newRes, ...r]);
      setForm({ reserved_for: '', group_size: 1, special_event: '' });
      setError(null);
    } catch (err) {
      alert(`Error while creating reservation: ${err.message}`);
    }
  };

  return (
    <div className="container mt-5 text-dark">
      <h3 className='text-dark'>Make a Reservation</h3>
      <form onSubmit={handleSubmit} className="mt-3 mb-4">
        <div className="mb-3">
          <label className="form-label">Date & Time</label>
          <input
            type="datetime-local"
            name="reserved_for"
            value={form.reserved_for}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Group Size</label>
          <input
            type="number"
            name="group_size"
            min="1"
            value={form.group_size}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Special Event</label>
          <select
            name="special_event"
            value={form.special_event}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">None</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Birthday">Birthday</option>
            <option value="Date Night">Date Night</option>
            <option value="Business Meeting">Business Meeting</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit Reservation</button>
      </form>

      <h4>Your Reservations</h4>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">Error: {error}</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Date & Time</th>
              <th>Group Size</th>
              <th>Special Event</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.reservationID}>
                <td>{reservations.indexOf(r) + 1}</td>
                <td>{new Date(r.reservedFor).toLocaleString()}</td>
                <td>{r.groupSize}</td>
                <td>{r.specialEvent || 'None'}</td>
                <td>{r.status || 'Active'}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
