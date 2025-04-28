import React, { useState } from 'react';

export default function PersonalInfoView({ user, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...user });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = async () => {
    if (Object.values(errors).some(msg => msg)) {
      alert('Please resolve the highlighted errors first.');
      return;
    }
    const payload = { ...form };
          console.log(user.customerID, payload);
    try {
      const res = await fetch(
        `http://localhost:3100/customer/${user.customerID}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );


      if (!res.ok) throw new Error((await res.json()).error || res.statusText);


      const updated = await res.json();
      onUpdate(updated);
      setEditMode(false);
    } catch (err) {
      alert('Could not save changes: ' + err.message);
    }
  };
  const handleCancel = () => {
    setForm({ ...user });
    setEditMode(false);
  };
  function formatDateMMDDYYYY(isoOrDate) {
    const d = new Date(isoOrDate);
    return d.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };
function isoToDateInput(iso) {
  if (!iso) return '';
  return new Date(iso).toISOString().split('T')[0];
};
const [errors, setErrors] = useState({ email: '', phone: '' });




async function validateField(field) {
const value = form[field]?.trim();
if (!value || value === user[field]) {
setErrors(e => ({ ...e, [field]: '' }));
return;
}


try {
const res = await fetch('http://localhost:3100/customer/validate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    [field]: value,
    customerID: user.customerID
  })
});
      const data = await res.json();
      if (res.status === 200) {
        setErrors(err => ({ ...err, [field]: '' }));
      } else if (res.status === 409) {
        setErrors(err => ({ ...err, [field]: data.error || data.message }));
      }
    } catch (err) {
      console.error('validateField error:', err);
    }
  };
  return (
    <div className="container mt-5 text-dark">
      <h3 className="text-dark">Personal Information</h3>
      {editMode ? (
        <form>
          <div className="mb-2 text-dark">
            <label className="text-dark">First Name</label>
            <input name="firstName" className="form-control" value={form.firstName} onChange={handleChange} />
          </div>
          <div className="mb-2 text-dark">
            <label className="text-dark">Last Name</label>
            <input name="lastName" className="form-control" value={form.lastName} onChange={handleChange} />
          </div>
          <div className="mb-2 text-dark">
            <label className="text-dark">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.email} onChange={handleChange} onBlur={() => validateField('email')} required />
              {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
          </div>
          <div className="mb-2 text-dark">
          <label className="text-dark">Phone</label>
          <input
            name="phone"
            className="form-control"
            placeholder="Phone Number"
            value={form.phone} onChange={handleChange} onBlur={() => validateField('phone')} />
            {errors.phone && <div className="text-danger mt-1">{errors.phone}</div>}
        </div>
          <div className="mb-2 text-dark">
            <label className="text-dark">Date of Birth</label>
            <input type="date" name="dob" className="form-control" value={isoToDateInput(form.dob)} onChange={handleChange} />
          </div>
          <div className="mb-2 text-dark">
            <label className="text-dark">Gender</label>
            <select name="gender" className="form-select text-dark" value={form.gender} onChange={handleChange}>
              <option className="text-dark">Male</option>
              <option className="text-dark">Female</option>
              <option className="text-dark">Other</option>
            </select>
          </div>
          <button type="button" className="btn btn-primary me-2" onClick={handleSave}>Save</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <>  
          {/* read-only view */}
<div className="card shadow-sm">
<div className="card-header d-flex justify-content-between align-items-center">
<h4 className="mb-0 text-dark">Personal Information</h4>
<button
  className="btn btn-sm btn-outline-primary"
  onClick={() => setEditMode(true)}
>
  Edit
</button>
</div>


<ul className="list-group list-group-flush text-dark">
<li className="list-group-item">
  <strong>First Name:</strong> {user.firstName}
</li>
<li className="list-group-item">
  <strong>Last Name:</strong> {user.lastName}
</li>
<li className="list-group-item">
  <strong>Username:</strong> {user.username}
</li>
<li className="list-group-item">
  <strong>Email:</strong> {user.email}
</li>
<li className="list-group-item">
  <strong>Phone:</strong> {user.phone}
</li>
<li className="list-group-item">
  <strong>Date of Birth:</strong> {formatDateMMDDYYYY(user.dob)}
</li>
<li className="list-group-item">
  <strong>Gender:</strong> {user.gender}
</li>
<li className="list-group-item">
  <strong>Points:</strong> {user.points}
</li>
</ul>
</div>


        </>
      )}
    </div>
  );
}
