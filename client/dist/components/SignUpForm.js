import React, { useState } from 'react';
export default function SignUpForm({
  onSuccess,
  onSwitch
}) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: ''
  });
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
    setErrors(err => ({
      ...err,
      [name]: ''
    }));
  };
  const validateField = async field => {
    const value = form[field]?.trim();
    if (!value) return;
    try {
      const res = await fetch('http://localhost:3100/customer/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          [field]: value
        })
      });
      const data = await res.json();
      if (res.status === 200) {
        setErrors(err => ({
          ...err,
          [field]: ''
        }));
      } else if (res.status === 409) {
        setErrors(err => ({
          ...err,
          [field]: data.error || data.message
        }));
      }
    } catch (err) {
      console.error('validateField error:', err);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (Object.values(errors).some(msg => msg)) return alert('Fix validation errors first');
    if (form.password !== form.password2) return alert('Passwords must match');
    try {
      const payload = {
        ...form,
        points: 77
      };
      const res = await fetch('http://localhost:3100/customer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || err.message || res.statusText);
      }
      alert('Account created! Please log in.');
      onSuccess();
    } catch (err) {
      alert('Sign-up failed: ' + err.message);
    }
  };
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "mx-auto mt-5 p-4 bg-dark text-white rounded",
    style: {
      maxWidth: 600
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mb-3"
  }, "Sign Up"), /*#__PURE__*/React.createElement("div", {
    className: "row mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("input", {
    name: "firstName",
    className: "form-control bg-secondary text-white",
    placeholder: "First Name",
    value: form.firstName,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("input", {
    name: "lastName",
    className: "form-control bg-secondary text-white",
    placeholder: "Last Name",
    value: form.lastName,
    onChange: handleChange,
    required: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/React.createElement("input", {
    name: "username",
    className: "form-control bg-secondary text-white",
    placeholder: "Username",
    value: form.username,
    onChange: handleChange,
    onBlur: () => validateField('username'),
    required: true
  }), errors.username && /*#__PURE__*/React.createElement("div", {
    className: "text-danger mt-1"
  }, errors.username)), /*#__PURE__*/React.createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "email",
    className: "form-control bg-secondary text-white",
    placeholder: "Email",
    value: form.email,
    onChange: handleChange,
    onBlur: () => validateField('email'),
    required: true
  }), errors.email && /*#__PURE__*/React.createElement("div", {
    className: "text-danger mt-1"
  }, errors.email)), /*#__PURE__*/React.createElement("div", {
    className: "row mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("input", {
    name: "phone",
    className: "form-control bg-secondary text-white",
    placeholder: "Phone Number",
    value: form.phone,
    onChange: handleChange,
    onBlur: () => validateField('phone')
  }), errors.phone && /*#__PURE__*/React.createElement("div", {
    className: "text-danger mt-1"
  }, errors.phone)), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "dob",
    className: "form-control bg-secondary text-white",
    value: form.dob,
    onChange: handleChange
  }))), /*#__PURE__*/React.createElement("div", {
    className: "row mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("select", {
    name: "gender",
    className: "form-select bg-secondary text-white",
    value: form.gender,
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Select Gender"), /*#__PURE__*/React.createElement("option", null, "Male"), /*#__PURE__*/React.createElement("option", null, "Female"), /*#__PURE__*/React.createElement("option", null, "Other")))), /*#__PURE__*/React.createElement("div", {
    className: "row mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    name: "password",
    className: "form-control bg-secondary text-white",
    placeholder: "Password",
    value: form.password,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    name: "password2",
    className: "form-control bg-secondary text-white",
    placeholder: "Confirm Password",
    value: form.password2,
    onChange: handleChange,
    required: true
  }))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary w-100"
  }, "Sign Up"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-center"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-info",
    onClick: onSwitch
  }, "Already have an account? Log In")));
}