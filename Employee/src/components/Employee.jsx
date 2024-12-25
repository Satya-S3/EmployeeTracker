import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Employee.css";

function Employee() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/auth/employee")
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
            });

        axios.get("http://localhost:3000/auth/category")
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/auth/deleteEmployee/${id}`)
            .then(result => {
                if (result.data.Status) {
                    setEmployee(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getCategoryName = (categoryId) => {
        const categoryObj = category.find(cat => cat.id === categoryId);
        return categoryObj ? categoryObj.name : "NAN";
    };

    return (
        <>
            <div className="text-center border border-rounded m-3 p-3 shadow">
                <h2 id="title">ADD EMPLOYEE</h2>
                <Link className="btn btn-success" to="/dashboard/AddEmployee">ADD</Link>
            </div>

            <div className="employeeContainer">
                {employee.map((res, index) => (
                    <div className="inner2" key={index}>
                        <img src={`http://localhost:3000/Images/` + res.image} alt="" />
                        <h3>{res.firstName} {res.lastName}<span id="cat">({getCategoryName(res.categoryId)})</span></h3>
                        <h4>Salary : {res.salary} /-</h4>
                        <p>Address : {res.address}</p>
                        <div>
                            <Link to={`/dashboard/editEmployee/${res.id}`} className="btn btn-warning mx-2">EDIT</Link>
                            <button className="btn btn-danger mx-2" onClick={() => handleDelete(res.id)}>DELETE</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Employee;

