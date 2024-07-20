import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
                <h2>Add Employee</h2>
                <Link className="btn btn-success" to="/dashboard/AddEmployee">ADD</Link>
            </div>
            <table className="table text-center p-3 shadow">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>IMAGE</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>SALARY</th>
                        <th>ADDRESS</th>
                        <th>CATEGORY</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map((res, index) => (
                        <tr key={index} className="align-middle">
                            <td>{index + 1}</td>
                            <td><img className="rounded" src={`http://localhost:3000/Images/`+res.image} width={50} height={50} alt="" /></td>
                            <td>{res.firstName}</td>
                            <td>{res.lastName}</td>
                            <td>{res.salary}</td>
                            <td>{res.address}</td>
                            <td>{getCategoryName(res.categoryId)}</td>
                            <td>
                                <Link to={`/dashboard/editEmployee/${res.id}`} className="btn btn-warning mx-2">EDIT</Link>
                                <button className="btn btn-danger mx-2" onClick={() => handleDelete(res.id)}>DELETE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Employee;
