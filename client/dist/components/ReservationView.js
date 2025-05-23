//written by: Kamdon Basinger & Simin Krug
import React, { useState, useEffect } from 'react';
export default function ReservationView({
  user
}) {
  const [form, setForm] = useState({
    reserved_for: '',
    group_size: 1,
    special_event: ''
  });
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reservations on mount/user change
  useEffect(() => {
    if (!user?.customerID) return;
    setLoading(true);
    fetch(`http://localhost:3100/customer/reservations?customerID=${user.customerID}`).then(res => {
      if (!res.ok) throw new Error(res.statusText || 'Fetch failed');
      return res.json();
    }).then(data => {
      setReservations(data || []);
      setError(null);
    }).catch(err => setError(err.message)).finally(() => setLoading(false));
  }, [user]);

  // Handle input changes
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
  };

  // Submit new reservation
  const handleSubmit = async e => {
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(res.statusText || 'Create failed');
      const raw = await res.json();
      // normalize the field names:
      const newRes = {
        reservationID: raw.reservationID ?? raw.reservation_id,
        customerID: raw.customerID ?? raw.customer_id,
        reservedFor: raw.reservedFor ?? raw.reserved_for,
        groupSize: raw.groupSize ?? raw.group_size,
        specialEvent: raw.specialEvent ?? raw.special_event,
        status: raw.status ?? 'Closed',
        createdAt: raw.createdAt ?? raw.created_at
      };
      setReservations(r => [newRes, ...r]);
      setForm({
        reserved_for: '',
        group_size: 1,
        special_event: ''
      });
      setError(null);
    } catch (err) {
      alert(`Error while creating reservation: ${err.message}`);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "container mt-5 text-dark"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-dark"
  }, "Make a Reservation"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "mt-3 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Date & Time"), /*#__PURE__*/React.createElement("input", {
    type: "datetime-local",
    name: "reserved_for",
    value: form.reserved_for,
    onChange: handleChange,
    className: "form-control",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Group Size"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "group_size",
    min: "1",
    value: form.group_size,
    onChange: handleChange,
    className: "form-control",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Special Event"), /*#__PURE__*/React.createElement("select", {
    name: "special_event",
    value: form.special_event,
    onChange: handleChange,
    className: "form-select"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "None"), /*#__PURE__*/React.createElement("option", {
    value: "Anniversary"
  }, "Anniversary"), /*#__PURE__*/React.createElement("option", {
    value: "Birthday"
  }, "Birthday"), /*#__PURE__*/React.createElement("option", {
    value: "Date Night"
  }, "Date Night"), /*#__PURE__*/React.createElement("option", {
    value: "Business Meeting"
  }, "Business Meeting"))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Submit Reservation")), /*#__PURE__*/React.createElement("h4", null, "Your Reservations"), loading ? /*#__PURE__*/React.createElement("p", null, "Loading...") : error ? /*#__PURE__*/React.createElement("p", {
    className: "text-danger"
  }, "Error: ", error) : /*#__PURE__*/React.createElement("table", {
    className: "table table-striped"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "Date & Time"), /*#__PURE__*/React.createElement("th", null, "Group Size"), /*#__PURE__*/React.createElement("th", null, "Special Event"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Created At"))), /*#__PURE__*/React.createElement("tbody", null, reservations.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.reservationID
  }, /*#__PURE__*/React.createElement("td", null, reservations.indexOf(r) + 1), /*#__PURE__*/React.createElement("td", null, new Date(r.reservedFor).toLocaleString()), /*#__PURE__*/React.createElement("td", null, r.groupSize), /*#__PURE__*/React.createElement("td", null, r.specialEvent || 'None'), /*#__PURE__*/React.createElement("td", null, r.status || 'Active'), /*#__PURE__*/React.createElement("td", null, new Date(r.createdAt).toLocaleString()))))));
}