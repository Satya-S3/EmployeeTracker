import express from "express";
import connection from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/employeeLogin', (req, res) => {
  const sql = "SELECT * FROM employee WHERE firstName = ?"
  connection.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query Error" })
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err) return res.json({ loginStatus: false, Error: "Wrong Password" })
        if (response) {
          const email = result[0].email;
          const token = jwt.sign({ role: "employee", email: email ,id:result[0].id}, "secret_Key123", { expiresIn: "1d" })
          res.cookie('token', token)
          return res.json({ loginStatus: true ,id:result[0].id})
        } else {
          return res.json({ loginStatus: false, error: "Wrong Email or Password" })
        }
      })
    } else {
      return res.json({ loginStatus: false, error: "Wrong Email or Password" })
    }
  })
})

router.get('/detail/:id', (req, res) => {
  const id=req.params.id;
  const sql = "SELECT * from employee WHERE id=?"
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json(result)
  })
})

router.post('/changePassword', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const token = req.cookies.token;

  if (!token) return res.json({ Status: false, Error: "Not Authenticated" });

  jwt.verify(token, "secret_Key123", (err, decoded) => {
    if (err) return res.json({ Status: false, Error: "Invalid Token" });

    const sql = "SELECT * FROM employee WHERE id = ?";
    connection.query(sql, [decoded.id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      if (result.length === 0) return res.json({ Status: false, Error: "User not found" });

      bcrypt.compare(currentPassword, result[0].password, (err, response) => {
        if (err || !response) return res.json({ Status: false, Error: "Current password is incorrect" });

        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        const updateSql = "UPDATE employee SET password = ? WHERE id = ?";
        connection.query(updateSql, [hashedPassword, decoded.id], (err, result) => {
          if (err) return res.json({ Status: false, Error: "Update Error" });
          return res.json({ Status: true, Message: "Password changed successfully" });
        });
      });
    });
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status:true});
})

export { router as employeeRouter };