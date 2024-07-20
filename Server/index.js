import express from 'express';
import cors from 'cors';
import { adminrouter } from './Routes/AdminRoute.js';
import { employeeRouter } from './Routes/EmployeeRoute.js';
import jwt from 'jsonwebtoken'
// import connection from './utils/db.js';

const app=express();
app.use(cors({
      origin:["http://localhost:5173"],
      methods:['GET', 'POST', 'PUT', 'DELETE'],
      credentials:true
}));
app.use(express.json());
app.use('/auth',adminrouter);
app.use('/employee',employeeRouter );
app.use(express.static("Public"));

app.listen(3000,()=>{
      console.log("Server Started at Port 3000");
      // connection.connect(function(err){
      //       if(err) console.log(err);
      //       else console.log("Databse connected");
      // })
})