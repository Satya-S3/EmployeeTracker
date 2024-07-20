import Sidebar from "./SideBar";
import "./DashBoard.css"
import { Outlet } from "react-router-dom";
function DashBoard() {
      return <>
            <div className="container-fluid">
                  <div className="row flex-nowrap">
                        <Sidebar/>
                        <div className="col p-0 m-0 ">
                              <div className="p-3 d-flex justify-content-center shadow text-white bg-dark"> 
                                    <h2 id="title">EMPLOYEE MANAGEMENT</h2>
                              </div>
                              <Outlet/>
                        </div>
                  </div>

            </div>
      </>
}
export default DashBoard;