//written by: Kamdon Basinger & Simin Krug
import React, { useState } from 'react';
export default function LoginForm({
  onSuccess,
  onSwitch
}) {
  const [creds, setCreds] = useState({
    username: '',
    password: ''
  });
  const handleChange = e => setCreds(c => ({
    ...c,
    [e.target.name]: e.target.value
  }));
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3100/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || err.message);
      }
      onSuccess(await res.json());
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "mx-auto mt-5 p-4 bg-dark text-white rounded",
    style: {
      maxWidth: 400
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mb-3"
  }, "Log In"), /*#__PURE__*/React.createElement("input", {
    name: "username",
    className: "form-control bg-secondary text-white mb-2",
    placeholder: "Username",
    value: creds.username,
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    name: "password",
    className: "form-control bg-secondary text-white mb-3",
    placeholder: "Password",
    value: creds.password,
    onChange: handleChange,
    required: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-success w-100"
  }, "Log In"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-center"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-info",
    onClick: onSwitch
  }, "Don't have an account? Sign Up")));
}