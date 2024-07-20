import { useNavigate } from "react-router-dom";

function Start(){
      const bg = {
            backgroundImage: 'url(./bg.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
          };
          
      const navigate = useNavigate();
      return<>
             <div className="container1" style={bg}>
                  <div className="box border shadow p-5 rounded">
                        <center>LOGIN AS</center>
                        <div className="d-flex justify-content-between">
                              <button className="btn btn-success" onClick={()=>navigate('/employeeLogin')}>EMPLOYEE</button>
                              <button className="btn btn-warning" onClick={()=>navigate('/adminLogin')}>ADMIN</button>
                        </div>

                  </div>
            </div>
      </>
}
export default Start;