import React from 'react';
export default function OffcanvasMenu({ user, onNavigate, onLogout }) {
  return React.createElement(
    "div",
    { className: "offcanvas offcanvas-start text-bg-dark", tabIndex: -1, id: "offcanvasMenu" },
    React.createElement(
      "div",
      { className: "offcanvas-header" },
      React.createElement("h5", { className: "offcanvas-title" }, user.firstName, " ", user.lastName),
      React.createElement("button", {
        type: "button",
        className: "btn-close btn-close-white",
        "data-bs-dismiss": "offcanvas",
        "aria-label": "Close"
      })
    ),
    React.createElement(
      "div",
      { className: "offcanvas-body" },
      React.createElement(
        "ul",
        { className: "list-unstyled" },
        React.createElement(
          "li",
          null,
          React.createElement(
            "button",
            {
              className: "btn btn-link text-white",
              onClick: () => onNavigate('personalInfo'),
              "data-bs-dismiss": "offcanvas"
            },
            "Personal Info"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "button",
            {
              className: "btn btn-link text-white",
              onClick: () => onNavigate('reservation'),
              "data-bs-dismiss": "offcanvas"
            },
            "Reservation"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "button",
            {
              className: "btn btn-link text-white",
              onClick: () => onNavigate('rewards'),
              "data-bs-dismiss": "offcanvas"
            },
            "Rewards"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "button",
            {
              className: "btn btn-link text-white",
              onClick: () => onNavigate('survey'),
              "data-bs-dismiss": "offcanvas"
            },
            "Survey"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "button",
            {
              className: "btn btn-link text-white",
              onClick: onLogout,
              "data-bs-dismiss": "offcanvas"
            },
            "Logout"
          )
        )
      )
    )
  );
}