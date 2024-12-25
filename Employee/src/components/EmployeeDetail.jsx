import axios from "axios";
import "./EmployeeDetail.css"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeDetail() {
      const [employee, setEmployee] = useState([]);
      const { id } = useParams();
      const [category, setCategory] = useState([]);
      useEffect(() => {
            axios.get("http://localhost:3000/employee/detail/" + id)
                  .then(result => {
                        setEmployee(result.data[0]);
                  })
                  .catch(err => console.log(err));

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
      })

      const getCategoryName = (categoryId) => {
            const categoryObj = category.find(cat => cat.id === categoryId);
            return categoryObj ? categoryObj.name : "NAN";
      };

      const navigate = useNavigate();
      axios.defaults.withCredentials = true;
      const handelLogout = () => {
            axios.get("http://localhost:3000/employee/logout")
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

      const handelChange = () => {
            navigate('/changePassword');
      }

      return <>
            <div className="container-fluid">
                  <h1 id="title" className="bg-dark text-white text-center p-3">EMPLOYEE DETAIL</h1>
                  <div className="employeeDetails">
                              <div className="inner3">
                                    <img src={"http://localhost:3000/Images/" + employee.image} alt="" />
                                    <h3>{employee.firstName} {employee.lastName}<span id="cat">({getCategoryName(employee.categoryId)})</span></h3>
                                    <h4>Salary : {employee.salary} /-</h4>
                                    <p>Address : {employee.address}</p>
                                    <div>
                                          <button className="btn btn-warning" onClick={handelChange}>Change Password</button>
                                          <button className="btn btn-danger" onClick={handelLogout}>LOGOUT</button>
                                    </div>
                              </div>
                  </div>
                 
            </div>
      </>
}
export default EmployeeDetail;