import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
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
            password: '',
            salary: '',
            address: '',
            categoryId: '',
            image: '',
      })
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
      }, [])

      const handelSubmit=(e)=>{
            e.preventDefault();
            const formData=new FormData();
            formData.append('firstName',employee.firstName);
            formData.append('lastName',employee.lastName);
            formData.append('password',employee.password);
            formData.append('salary',employee.salary);
            formData.append('address',employee.address);
            formData.append('categoryId',employee.categoryId);
            formData.append('image',employee.image);
            axios.post("http://localhost:3000/auth/AddEmployee",formData)
            .then(result=>{
                  if(result.data.Status){
                        navigate('/dashboard/Employee')
                  }else{
                        alert(result.data.Error);
                  }
            })
            .catch(err=>console.log(err));
      }

      const navigate = useNavigate();

      return <>
            <div className="container1" style={style}>
                  <div className="box m-1">
                        <form onSubmit={handelSubmit}>
                        <h2 className="font-weight-bold">ADD EMPLOYEE</h2>
                              <div className="d-flex text-start p-0">
                                    <div>
                                          <label htmlFor="name" className="form-label" style={label}>FIRST NAME</label>
                                          <input autoComplete="Username" name="name" type="text" placeholder="First Name" className="form-control"
                                                onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })} required />
                                    </div>
                                    <div>
                                          <label htmlFor="name" className="form-label" style={label}>LAST NAME</label>
                                          <input autoComplete="Username" name="name" type="text" placeholder="Last Name" className="form-control"
                                                onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })} />
                                    </div>
                              </div>
                              <div className="d-flex text-start p-0">
                                    <div>
                                          <label htmlFor="password" className="form-label" style={label}>PASSWORD</label>
                                          <input name="password" type="password" placeholder="Password" className="form-control"
                                                onChange={(e) => setEmployee({ ...employee, password: e.target.value })} />
                                    </div>
                                    <div>
                                          <label htmlFor="salary" className="form-label" style={label}>SALARY</label>
                                          <input name="salary" type="text" placeholder="Salary" className="form-control"
                                                onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
                                    </div>
                              </div>
                              <div className="text-start py-0">
                                    <label htmlFor="address" className="form-label" style={label}>ADDRESS</label>
                                    <input name="address" type="text" placeholder="Address" className="form-control"
                                          onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
                              </div>
                              <div className="text-start py-0">
                                    <label htmlFor="category" className="form-label" style={label}>CATEGORY</label>
                                    <select className="form-select" name="category" onChange={(e) => setEmployee({ ...employee, categoryId: e.target.value })} required>
                                          {category.map(val => <option key={val.id} value={val.id}>{val.name}</option>)}
                                    </select>
                              </div>
                              <div className="text-start py-0">
                                    <label htmlFor="image" className="form-label" style={label}>ADD IMAGE</label>
                                    <input name="image" type="file" className="form-control"
                                          onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })} required/>
                              </div>
                              <button className="btn btn-success w-50">ADD EMPLOYEE</button>

                        </form>

                  </div>
            </div>
      </>
}

export default AddEmployee;