import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeLogin() {

      const bg = {
            backgroundImage: 'url(./bg.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
          };

      const [values, setValues]=useState({
            email:'',
            password:''
      })
      const [error,setError]=useState(null);
      const navigate=useNavigate();
      axios.defaults.withCredentials=true;
      const handelSubmit=(e)=>{
            e.preventDefault();
            axios.post("http://localhost:3000/employee/employeeLogin", values)
            .then(result=> {
                  if(result.data.loginStatus) navigate('/employeeDetail/'+result.data.id)
                  else setError(result.data.error)    
            })
            .catch(error=> console.log(error));
      }

      return <>
            <div className="container1" style={bg}>
                  <div className="box">
                        <center>EMPLOYEE LOGIN</center>
                        <form onSubmit={handelSubmit}>
                              <p>{error}</p>
                              <div>
                                    <p>Demo : Rahul</p>
                                    <label htmlFor="name">USER NAME</label>
                                    <input autoComplete="Username" name="name" type="text" placeholder="UserName" className="form-control"
                                          onChange={(e) => { setValues({ ...values, email: e.target.value }) }} />
                              </div>
                              <div>
                                    <p>Demo : 12345</p>
                                    <label htmlFor="pass">PASSWORD</label>
                                    <input autoComplete="current-password" name="pass" type="password" placeholder="Password" className="form-control"
                                          onChange={(e) => { setValues({ ...values, password: e.target.value }) }} />
                              </div>
                              <button className="btn btn-success w-50">SUBMIT</button>
                              <div className="tick">
                                    <input name="tick" type="checkbox" id="tick" />
                                    <label htmlFor="tick">Are you agree with Terms & Conditions</label>
                              </div>
                        </form>

                  </div>
            </div>
      </>
}
export default EmployeeLogin;