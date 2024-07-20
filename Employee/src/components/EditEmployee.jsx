import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee(){

      
      const navigate = useNavigate();

      const style = {
            height: "10vh"
      }
      const label = {
            fontSize: "15px",
            textAlign: "left"
      }

      const [employee, setEmployee] = useState({
            firstName: '',
            lastName: '',
            salary: '',
            address: '',
            categoryId: '',
      })
      
      const {id}=useParams();

      const [category, setCategory] = useState([]);

      useEffect(() => {
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
                  })

                  axios.get("http://localhost:3000/auth/employee/"+id)
                  .then(result=>{
                        setEmployee({
                              ...employee,
                              firstName:result.data.Result[0].firstName,
                              lastName:result.data.Result[0].lastName,
                              salary:result.data.Result[0].salary,
                              address:result.data.Result[0].address,
                              categoryId:result.data.Result[0].categoryId,
                        })
                  })
                  .catch(err=> console.log(err));
      }, [])

      const handelSubmit=(e)=>{
            e.preventDefault();
            axios.put("http://localhost:3000/auth/EditEmployee/"+id,employee)
            .then(result=>{
                  if(result.data.Status){
                        navigate('/dashboard/Employee')
                  }else{
                        alert(result.data.Error);
                  }
            })
            .catch(err=>console.log(err));
      }


      

      return<>
             <div className="container1" style={style}>
                  <div className="box m-1">
                        <form onSubmit={handelSubmit}>
                              <h2 className="font-weight-bold">EDIT EMPLOYEE</h2>
                              <div className="d-flex text-start p-0">
                                    <div>
                                          <label htmlFor="name" className="form-label" style={label}>FIRST NAME</label>
                                          <input value={employee.firstName} autoComplete="Username" name="name" type="text" placeholder="First Name" className="form-control"
                                                onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })} required />
                                    </div>
                                    <div>
                                          <label htmlFor="name" className="form-label" style={label}>LAST NAME</label>
                                          <input value={employee.lastName} autoComplete="Username" name="name" type="text" placeholder="Last Name" className="form-control"
                                                onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })} />
                                    </div>
                              </div>
                              <div className="d-flex text-start p-0">
                                    <div>
                                          <label htmlFor="salary" className="form-label" style={label}>SALARY</label>
                                          <input value={employee.salary} name="salary" type="text" placeholder="Salary" className="form-control"
                                                onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
                                    </div>
                              </div>
                              <div className="text-start py-0">
                                    <label htmlFor="address" className="form-label" style={label}>ADDRESS</label>
                                    <input value={employee.address} name="address" type="text" placeholder="Address" className="form-control"
                                          onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
                              </div>
                              <div className="text-start py-0">
                                    <label htmlFor="category" className="form-label" style={label}>CATEGORY</label>
                                    <select value={employee.categoryId} className="form-select" name="category" onChange={(e) => setEmployee({ ...employee, categoryId: e.target.value })} required>
                                          {category.map(val => <option key={val.id} value={val.id}>{val.name}</option>)}
                                    </select>
                              </div>
                              <button className="btn btn-success w-50">EDIT EMPLOYEE</button>

                        </form>

                  </div>
            </div>
      </>
}
export default EditEmployee;