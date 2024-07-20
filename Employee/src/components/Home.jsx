import axios from "axios";
import { useEffect, useState } from "react";

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
                console.log(err);
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
                console.log(err);
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
                console.log(err);
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
                console.log(err);
            });


    }, []);

    return <>
        <div className="container2 d-flex flex-wrap">
            <div className="box2 shadow">
                <h2>ADMIN</h2>
                <hr />
                <h2> TOTAL: {admin}</h2>
            </div>
            <div className="box2 shadow">
                <h2>EMPLOYEE</h2>
                <hr />
                <h2>TOTAL: {employee}</h2>
            </div>
            <div className="box2 shadow">
                <h2>TOTAL SALARY</h2>
                <hr />
                <h2>TOTAL: {salary}</h2>
            </div>
        </div>
        <center id="admin">ADMIN</center>
        <div className="container">
            <table className="table text-center p-3 shadow">
                <thead className="table-dark">
                    <tr>
                        <th>SL.NO</th>
                        <th>USER ID</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {allAdmin.map((res, index) => (
                        <tr className="align-middle">
                            <td>{index+1}</td>
                            <td>{res.username}</td>
                            <td>
                                <button className="btn btn-danger">DELETE</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    </>
}

export default Home;