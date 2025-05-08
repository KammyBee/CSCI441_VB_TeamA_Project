import React, { useState, useEffect } from 'react';
export default function Dashboard({
  user,
  onNavigate
}) {
  const [reservations, setReservations] = useState([]);
  const [survey, setSurvey] = useState(null);
  const today = new Date();

  // Fetch reservations
  useEffect(() => {
    if (!user?.customerID) return;
    (async () => {
      try {
        const res = await fetch(`http://localhost:3100/customer/reservations?customerID=${user.customerID}`);
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
        const res = await fetch(`http://localhost:3100/customer/survey?customerID=${user.customerID}`);
        if (!res.ok) throw new Error('Survey fetch failed');
        const data = await res.json();
        setSurvey(data || null);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user]);

  // Prepare upcoming reservations
  const upcoming = reservations.map(r => ({
    ...r,
    dateValue: new Date(r.reservedFor)
  })).filter(r => r.dateValue >= today).sort((a, b) => a.dateValue - b.dateValue);
  const nextRes = upcoming[0] || null;
  return /*#__PURE__*/React.createElement("div", {
    className: "container mt-5 text-dark"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-dark"
  }, "Welcome, ", user.firstName, "!"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark"
  }, "Your current points: ", user.points), /*#__PURE__*/React.createElement("div", {
    className: "row mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-4 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card h-100 shadow-sm px-3 py-2",
    style: {
      minHeight: '100px'
    }
  }, /*#__PURE__*/React.createElement("h6", {
    className: "mb-2 text-dark"
  }, "\uD83D\uDC64 Personal Info"), /*#__PURE__*/React.createElement("p", {
    className: "mb-1 text-dark"
  }, /*#__PURE__*/React.createElement("strong", null, "Name:"), " ", user.firstName, " ", user.lastName), /*#__PURE__*/React.createElement("p", {
    className: "mb-0 text-dark"
  }, /*#__PURE__*/React.createElement("strong", null, "Email:"), " ", user.email))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-4 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card h-100 shadow-sm px-3 py-2",
    style: {
      minHeight: '100px'
    }
  }, /*#__PURE__*/React.createElement("h6", {
    className: "mb-2 text-dark"
  }, "\uD83D\uDCC5 Reservations"), /*#__PURE__*/React.createElement("p", {
    className: "mb-1 text-dark"
  }, /*#__PURE__*/React.createElement("strong", null, "Upcoming:"), " ", upcoming.length), nextRes ? /*#__PURE__*/React.createElement("p", {
    className: "mb-0 text-dark"
  }, /*#__PURE__*/React.createElement("strong", null, "Next:"), " ", nextRes.dateValue.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })) : /*#__PURE__*/React.createElement("p", {
    className: "mb-0 text-dark"
  }, "No upcoming"))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-4 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card h-100 shadow-sm px-3 py-2",
    style: {
      minHeight: '100px'
    }
  }, /*#__PURE__*/React.createElement("h6", {
    className: "mb-2 text-dark"
  }, "\uD83D\uDCDD Survey"), survey ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "mb-1 text-dark"
  }, /*#__PURE__*/React.createElement("strong", null, "Overall:"), " ", survey.overall_score), /*#__PURE__*/React.createElement("p", {
    className: "mb-0 text-dark"
  }, /*#__PURE__*/React.createElement("strong", null, "Feedback:"), " ", survey.feedback || '—')) : /*#__PURE__*/React.createElement("p", {
    className: "mb-0 text-dark"
  }, "No survey data")))), /*#__PURE__*/React.createElement("div", {
    className: "row mt-4"
  }, [{
    title: 'Personal Info',
    key: 'personalInfo'
  }, {
    title: 'Reservations',
    key: 'reservation'
  }, {
    title: 'Survey',
    key: 'survey'
  }, {
    title: 'Rewards',
    key: 'rewards'
  }].map(({
    title,
    key
  }) => /*#__PURE__*/React.createElement("div", {
    className: "col-md-3 mb-4",
    key: key
  }, /*#__PURE__*/React.createElement("div", {
    className: "card h-100 shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-body d-flex flex-column"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "card-title text-dark"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "mt-auto d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm text-white",
    style: {
      backgroundColor: '#2b7e7e',
      borderColor: '#2b7e7e',
      padding: '0.25rem 0.5rem'
    },
    onClick: () => onNavigate(key)
  }, "Go"))))))));
}