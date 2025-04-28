import React from 'react';
export default function Dashboard({
  user
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "container mt-5 text-dark"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-dark"
  }, "Welcome, ", user.firstName, "!"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark"
  }, "Your current points: ", user.points));
}