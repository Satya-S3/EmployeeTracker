import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

function Sidebar() {
      const navigate = useNavigate();
      axios.defaults.withCredentials=true;
      const handelLogout = () => {
            axios.get("http://localhost:3000/auth/logout")
                  .then(result => {
                        if (result.data.Status) {
                              navigate('/adminLogin')
                        } else {
                              alert(result.data.Error);
                        }
                  })
                  .catch(err => {
                        console.log(err);
                  });
      }

      return <>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: "280px", height: "100vh" }}>
                  <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-4 text-center">Sidebar</span>
                  </a>
                  <hr />
                  <ul className="nav nav-pills flex-column mb-auto">
                        <Link className="nav-link link text-white text-decoration-none" to="/dashboard">Dashboard</Link>
                        <Link className="nav-link link text-white text-decoration-none" to="/dashboard/Employee">Manage Employees</Link>
                        <Link className="nav-link link text-white text-decoration-none" to="/dashboard/Category">Category</Link>
                        <Link className="nav-link link text-white text-decoration-none" to="/dashboard/Profile">Profile</Link>
                        <Link className="nav-link link text-white text-decoration-none" onClick={handelLogout}>Logout</Link>
                  </ul>
                  <hr />

            </div>
      </>
}
export default Sidebar;