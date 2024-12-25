import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.css";
import { RiAdminFill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";

function Home() {
    const [admin, setAdmin] = useState();
    const [employee, setEmployee] = useState();
    const [salary, setSalary] = useState();
    const [allAdmin, setAllAdmin] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/auth/countAdmin")
            .then(result => {
                if (result.data.Status) {
                    setAdmin(result.data.Result[0].admin);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => {
                console.log("Error fetching admin count:", err);
            });
        axios.get("http://localhost:3000/auth/countEmployee")
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.Result[0].employee);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => {
                console.log("Error fetching employee count:", err);
            });
        axios.get("http://localhost:3000/auth/totalSalary")
            .then(result => {
                if (result.data.Status) {
                    setSalary(result.data.Result[0].salary);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => {
                console.log("Error fetching total salary:", err);
            });
        axios.get("http://localhost:3000/auth/getAdmin")
            .then(result => {
                if (result.data.Status) {
                    setAllAdmin(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => {
                console.log("Error fetching admin details:", err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/auth/deleteAdmin/${id}`)
            .then(result => {
                console.log(result.data);
                if (result.data.Status) {
                    setAllAdmin(prevAdmins => prevAdmins.filter(admin => admin.id !== id));
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => {
                console.log("Error deleting admin:", err);
            });
    };

    return (
        <>
            <div className="container2">
                <div>
                    <RiAdminFill className="icon admin" />
                    <h1>ADMIN</h1>
                    <p>{admin}</p>
                </div>
                <div>
                    <FaPeopleGroup className="icon employee" />
                    <h1>EMPLOYEE</h1>
                    <p>{employee}</p>
                </div>
                <div>
                    <GrMoney className="icon salary" />
                    <h1>SALARY</h1>
                    <p>{salary}</p>
                </div>
            </div>
            <h2 id="admin">ADMIN DETAILS</h2>
            <div className="below">
                <div>
                    {allAdmin.map((res, index) => (
                        <div key={index} className="align-middle details">
                            <p>{res.username}</p>
                            <button className="btn btn-danger" onClick={() => handleDelete(res.id)}>DELETE</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;