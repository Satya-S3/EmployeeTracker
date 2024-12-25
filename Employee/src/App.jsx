import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import Home from './components/Home';
import Employee from './components/Employee';
import Category from './components/Category';
import AddCategory from './components/AddCategory';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import Start from './components/Start';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeDetail from './components/EmployeeDetail';
import PrivateRoute from './components/PrivateRoute';
import ChangePassword from './components/ChangePassword';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/adminLogin' element={<Login />} />
          <Route path='/employeeLogin' element={<EmployeeLogin />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/employeeDetail/:id' element={
            <PrivateRoute>
              <EmployeeDetail />
            </PrivateRoute>
            } />
          <Route path='/dashboard' element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          } >
            <Route path='' element={<Home />} />
            <Route path='/dashboard/Employee' element={<Employee />} />
            <Route path='/dashboard/Category' element={<Category />} />
            <Route path='/dashboard/AddCategory' element={<AddCategory />} />
            <Route path='/dashboard/AddEmployee' element={<AddEmployee />} />
            <Route path='/dashboard/editEmployee/:id' element={<EditEmployee />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
