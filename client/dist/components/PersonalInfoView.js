import React, { useState } from 'react';
export default function PersonalInfoView({
  user,
  onUpdate
}) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    ...user
  });
  const handleChange = e => setForm({
    ...form,
    [e.target.name]: e.target.value
  });
  const handleSave = async () => {
    if (Object.values(errors).some(msg => msg)) {
      alert('Please resolve the highlighted errors first.');
      return;
    }
    const payload = {
      ...form
    };
    console.log(user.customerID, payload);
    try {
      const res = await fetch(`http://localhost:3100/customer/${user.customerID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error((await res.json()).error || res.statusText);
      const updated = await res.json();
      onUpdate(updated);
      setEditMode(false);
    } catch (err) {
      alert('Could not save changes: ' + err.message);
    }
  };
  const handleCancel = () => {
    setForm({
      ...user
    });
    setEditMode(false);
  };
  function formatDateMMDDYYYY(isoOrDate) {
    const d = new Date(isoOrDate);
    return d.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }
  ;
  function isoToDateInput(iso) {
    if (!iso) return '';
    return new Date(iso).toISOString().split('T')[0];
  }
  ;
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });
  async function validateField(field) {
    const value = form[field]?.trim();
    if (!value || value === user[field]) {
      setErrors(e => ({
        ...e,
        [field]: ''
      }));
      return;
    }
    try {
      const res = await fetch('http://localhost:3100/customer/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          [field]: value,
          customerID: user.customerID
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
  }
  ;
  return /*#__PURE__*/React.createElement("div", {
    className: "container mt-5 text-dark"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-dark"
  }, "Personal Information"), editMode ? /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
    className: "mb-2 text-dark"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-dark"
  }, "First Name"), /*#__PURE__*/React.createElement("input", {
    name: "firstName",
    className: "form-control",
    value: form.firstName,
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-2 text-dark"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-dark"
  }, "Last Name"), /*#__PURE__*/React.createElement("input", {
    name: "lastName",
    className: "form-control",
    value: form.lastName,
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-2 text-dark"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-dark"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "email",
    className: "form-control",
    placeholder: "Email",
    value: form.email,
    onChange: handleChange,
    onBlur: () => validateField('email'),
    required: true
  }), errors.email && /*#__PURE__*/React.createElement("div", {
    className: "text-danger mt-1"
  }, errors.email)), /*#__PURE__*/React.createElement("div", {
    className: "mb-2 text-dark"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-dark"
  }, "Phone"), /*#__PURE__*/React.createElement("input", {
    name: "phone",
    className: "form-control",
    placeholder: "Phone Number",
    value: form.phone,
    onChange: handleChange,
    onBlur: () => validateField('phone')
  }), errors.phone && /*#__PURE__*/React.createElement("div", {
    className: "text-danger mt-1"
  }, errors.phone)), /*#__PURE__*/React.createElement("div", {
    className: "mb-2 text-dark"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-dark"
  }, "Date of Birth"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "dob",
    className: "form-control",
    value: isoToDateInput(form.dob),
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-2 text-dark"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-dark"
  }, "Gender"), /*#__PURE__*/React.createElement("select", {
    name: "gender",
    className: "form-select text-dark",
    value: form.gender,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    className: "text-dark"
  }, "Male"), /*#__PURE__*/React.createElement("option", {
    className: "text-dark"
  }, "Female"), /*#__PURE__*/React.createElement("option", {
    className: "text-dark"
  }, "Other"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary me-2",
    onClick: handleSave
  }, "Save"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: handleCancel
  }, "Cancel")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "card shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header d-flex justify-content-between align-items-center"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "mb-0 text-dark"
  }, "Personal Information"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-outline-primary",
    onClick: () => setEditMode(true)
  }, "Edit")), /*#__PURE__*/React.createElement("ul", {
    className: "list-group list-group-flush text-dark"
  }, /*#__PURE__*/React.createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/React.createElement("strong", null, "First Name:"), " ", user.firstName), /*#__PURE__*/React.createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/React.createElement("strong", null, "Last Name:"), " ", user.lastName), /*#__PURE__*/React.createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/React.createElement("strong", null, "Username:"), " ", user.username), /*#__PURE__*/React.createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/React.createElement("strong", null, "Email:"), " ", user.email), /*#__PURE__*/React.createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/React.createElement("strong", null, "Phone:"), " ", user.phone), /*#__PURE__*/React.createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/React.createElement("strong", null, "Date of Birth:"), " ", formatDateMMDDYYYY(user.dob)), /*#__PURE__*/React.createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/React.createElement("strong", null, "Gender:"), " ", user.gender), /*#__PURE__*/React.createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/React.createElement("strong", null, "Points:"), " ", user.points)))));
}