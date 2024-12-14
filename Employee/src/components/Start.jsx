import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
function Start() {

      const navigate = useNavigate();

      useEffect(() => {
            axios.get('http://localhost:5173/verify')
                  .then(result => {
                        if (result.data.Status) {
                              if (result.data.role == 'admin') {
                                    navigate('/dashboard');
                              } else {
                                    navigate('/employee/detail/' + result.data.id)
                              }
                        }
                  })
                  .catch(err => console.log(err));
      }, [])


      const bg = {
            backgroundImage: 'url(./bg.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
      };

      return <>
            <div className="container1" style={bg}>
                  <div className="box border shadow p-5 rounded">
                        <center>LOGIN AS</center>
                        <div className="d-flex justify-content-between">
                              <button className="btn btn-success" onClick={() => navigate('/employeeLogin')}>EMPLOYEE</button>
                              <button className="btn btn-warning" onClick={() => navigate('/adminLogin')}>ADMIN</button>
                        </div>

                  </div>
            </div>
      </>
}
export default Start;