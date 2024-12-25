import express from 'express';
import cors from 'cors';
import { adminrouter } from './Routes/AdminRoute.js';
import { employeeRouter } from './Routes/EmployeeRoute.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/auth', adminrouter);
app.use('/employee', employeeRouter);
app.use(express.static("Public"));

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "secret_Key123", (err, decoded) => {
      if (err) res.json({ Status: false, Error: "Wrong Token" })
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    return res.json({ Status: false, Error: "Not Authenticated" });
  }
}
app.use('/verify', verifyUser, (req, res) => {
  return res.json({Status:true,role:req.role,id:req.id});
});

app.listen(3000, () => {
  console.log("Server Started at Port 3000");
})