import axios from "axios";
import "./EmployeeDetail.css"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeDetail() {
      const [employee, setEmployee] = useState([]);
      const { id } = useParams();
      useEffect(() => {
            axios.get("http://localhost:3000/employee/detail/" + id)
                  .then(result => {
                        setEmployee(result.data[0]);
                  })
                  .catch(err => console.log(err));
      })

      const navigate = useNavigate();
      axios.defaults.withCredentials=true;
      const handelLogout = () => {
            axios.get("http://localhost:3000/employee/logout")
                  .then(result => {
                        if (result.data.Status) {
                              navigate('/')
                        } else {
                              alert(result.data.Error);
                        }
                  })
                  .catch(err => {
                        console.log(err);
                  });
      }

      return <>
            <div className="container">
                  <h1 id="title" className="bg-dark text-white px-5 mb-5">EMPLOYEE DETAIL</h1>
                  <div id="name">{employee.firstName} {employee.lastName}</div>
                  <img src={"http://localhost:3000/Images/" + employee.image} alt="" />

                  <table className="table text-center p-3 shadow m-5">
                        <thead className="table-dark">
                              <tr>
                                    <th>ADDRESS</th>
                                    <th>SALARY</th>
                                    <th>CATEGORY</th>
                              </tr>
                        </thead>
                        <tbody>
                              <tr className="align-middle">
                                    <td>{employee.address}</td>
                                    <td>{employee.salary}</td>
                                    <td>{employee.categoryId}</td>

                              </tr>
                        </tbody>
                  </table>
                  <div>
                        <button className="btn btn-warning">EDIT</button>
                        <button className="btn btn-danger" onClick={handelLogout}>LOGOUT</button>
                  </div>
            </div>
      </>
}
export default EmployeeDetail;