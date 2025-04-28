import React from 'react';
export default function OffcanvasMenu({
  user,
  onNavigate,
  onLogout
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "offcanvas offcanvas-start text-bg-dark",
    tabIndex: -1,
    id: "offcanvasMenu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "offcanvas-header"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "offcanvas-title"
  }, user.firstName, " ", user.lastName), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-close btn-close-white",
    "data-bs-dismiss": "offcanvas",
    "aria-label": "Close"
  })), /*#__PURE__*/React.createElement("div", {
    className: "offcanvas-body"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "list-unstyled"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-link text-white",
    onClick: () => onNavigate('personalInfo'),
    "data-bs-dismiss": "offcanvas"
  }, "Personal Info")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-link text-white",
    onClick: () => onNavigate('reservation'),
    "data-bs-dismiss": "offcanvas"
  }, "Reservation")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-link text-white",
    onClick: () => onNavigate('menu'),
    "data-bs-dismiss": "offcanvas"
  }, "Menu")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-link text-white",
    onClick: () => onNavigate('rewards'),
    "data-bs-dismiss": "offcanvas"
  }, "Rewards")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-link text-white",
    onClick: onLogout,
    "data-bs-dismiss": "offcanvas"
  }, "Logout")))));
}