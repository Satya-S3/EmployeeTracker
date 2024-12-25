import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    axios.post('http://localhost:3000/employee/changePassword', {
      currentPassword,
      newPassword
    })
    .then(response => {
      if (response.data.Status) {
        alert("Password changed successfully");
        navigate(-1);
      } else {
        alert(response.data.Error);
      }
    })
    .catch(error => {
      console.error("There was an error changing the password!", error);
    });
  };

  return (
    <div className="container">
      <h1>CHANGE PASSWORD</h1>
      <form onSubmit={handleChangePassword} >
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="text"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="text"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="btn btn-primary m-3">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;