import "./SideBar.css";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SideBar() {
      const navigate = useNavigate();
      const [open, setOpen] = useState(false);

      const handleLogout = () => {
            axios.get("http://localhost:3000/auth/logout")
                  .then(result => {
                        if (result.data.Status) {
                              localStorage.removeItem("Valid")
                              navigate('/')
                        } else {
                              alert(result.data.Error);
                        }
                  })
                  .catch(err => {
                        console.log(err);
                  });
      }

      const toggleNavbar = () => {
            setOpen(!open);
      }

      return <>
            <button onClick={toggleNavbar} className="btn btn-dark toggle">☰</button>
            <div className={open ? "open" : "open close"}>
                  <ul>
                        <li>
                              <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                              <Link to="/dashboard/Employee">Employees</Link>
                        </li>
                        <li>
                              <Link to="/dashboard/Category">Category</Link>
                        </li>
                        <li>
                              <Link onClick={handleLogout}>Logout</Link>
                        </li>
                  </ul>
            </div>
      </>
}

export default SideBar;