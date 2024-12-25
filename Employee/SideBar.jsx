import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

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

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className={`d-flex flex-column flex-shrink-0 p-3 text-white bg-dark `}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4 text-center">Sidebar</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <Link className="nav-link link text-white text-decoration-none" to="/dashboard">Dashboard</Link>
                    <Link className="nav-link link text-white text-decoration-none" to="/dashboard/Employee">Manage Employees</Link>
                    <Link className="nav-link link text-white text-decoration-none" to="/dashboard/Category">Category</Link>
                    <Link className="nav-link link text-white text-decoration-none" onClick={handleLogout}>Logout</Link>
                </ul>
            </div>
            <button className="btn btn-dark d-md-none" onClick={toggleSidebar} style={{ position: "fixed", top: "10px", left: "10px" }}>
                <FaBars />
            </button>
        </>
    );
}

export default SideBar;