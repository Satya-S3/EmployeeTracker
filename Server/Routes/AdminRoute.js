import express from "express";
import connection from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";
const router = express.Router();

router.post('/adminlogin', (req, res) => {
      const sql = "SELECT * FROM login WHERE username = ? and password = ?"
      connection.query(sql, [req.body.email, req.body.password], (err, result) => {
            if (err) return res.json({ loginStatus: false, Error: "Query Error" })
            if (result.length > 0) {
                  const email = result[0].email;
                  const token = jwt.sign({ role: "admin", email: email }, "secret_Key123", { expiresIn: "1d" })
                  res.cookie('token', token)
                  return res.json({ loginStatus: true })
            } else {
                  return res.json({ loginStatus: false, error: "Wrong Email or Password" })
            }
      })
})

router.get('/category', (req, res) => {
      const sql = "SELECT * FROM category"
      connection.query(sql, (err, result) => {
            if (err) return res.json({ Status: false, Error: "Query Error" })
            return res.json({ Status: true, Result: result })
      })
})
router.post('/AddCategory', (req, res) => {
      const sql = "INSERT INTO category (name) VALUES(?)"
      connection.query(sql, [req.body.category], (err, result) => {
            if (err) return res.json({ Status: false, Error: "Query Error" })
            return res.json({ Status: true })
      })
})
// image upload
const storage=multer.diskStorage({
      destination:(req,file,cb)=>{
            cb(null,'Public/Images')
      },
      filename:(req,file,cb)=>{
            cb(null,file.fieldname+ "_" +Date.now()+path.extname(file.originalname))
      }
})
const upload=multer({
      storage:storage
})

router.post('/AddEmployee',upload.single('image'), (req, res) => {
      if (!req.body.password) {
            return res.json({ Status: false, Error: "Password is required" });
      }

      const sql = "INSERT INTO employee (firstName,lastName,password,salary,address,image,categoryId) VALUES(?)";
      bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return res.json({ Status: false, Error: "Query Error 1" });

            const values = [
                  req.body.firstName,
                  req.body.lastName,
                  hash,
                  req.body.salary,
                  req.body.address,
                  req.file.filename,
                  req.body.categoryId,
            ];

            connection.query(sql, [values], (err, result) => {
                  if (err) {
                        return res.json({ Status: false, Error: "ADD Category" })
                  };
                  return res.json({ Status: true });
            });
      });
});

router.get('/employee', (req, res) => {
      const sql = "SELECT * FROM employee"
      connection.query(sql, (err, result) => {
            if (err) return res.json({ Status: false, Error: "Query Error" })
            return res.json({ Status: true, Result: result })
      })
})
router.get('/employee/:id', (req, res) => {
      const id=req.params.id;
      const sql = "SELECT * FROM employee WHERE id = ?"
      connection.query(sql,[id], (err, result) => {
            if (err) return res.json({ Status: false, Error: "Query Error" })
            return res.json({ Status: true, Result: result })
      })
})

router.put('/EditEmployee/:id', (req, res) => {

      const id=req.params.id;
      const sql = "UPDATE employee set firstName=? , lastName=? ,salary=? , address=?,categoryId=? WHERE id=?"
            const values = [
                  req.body.firstName,
                  req.body.lastName,
                  req.body.salary,
                  req.body.address,
                  req.body.categoryId,
            ];

            connection.query(sql, [...values,id], (err, result) => {
                  if (err) {
                        return res.json({ Status: false, Error: "EDIT EMPLOYEE" })
                  };
                  return res.json({ Status: true });
            });
});


router.delete('/deleteEmployee/:id', (req, res) => {
      const id=req.params.id;
      const sql = "DELETE from employee WHERE id = ?"
      connection.query(sql, [id], (err, result) => {
            if (err) {
                  return res.json({ Status: false, Error: err.message })
            };
            return res.json({ Status: true });
      });
})

router.get('/countAdmin', (req, res) => {
      const sql = "SELECT count(id) as admin from login"
      connection.query(sql, (err, result) => {
            if (err) return res.json({ Status: false, Error: err.message })
            return res.json({ Status: true, Result: result })
      })
})
router.get('/countEmployee', (req, res) => {
      const sql = "SELECT count(id) as employee from employee"
      connection.query(sql, (err, result) => {
            if (err) return res.json({ Status: false, Error: err.message })
            return res.json({ Status: true, Result: result })
      })
})
router.get('/totalSalary', (req, res) => {
      const sql = "SELECT sum(salary) as salary from employee"
      connection.query(sql, (err, result) => {
            if (err) return res.json({ Status: false, Error: err.message })
            return res.json({ Status: true, Result: result })
      })
})
router.get('/logout', (req, res) => {
      res.clearCookie('token');
      return res.json({Status:true});
})
router.get('/getAdmin', (req, res) => {
      const sql = "SELECT * from login"
      connection.query(sql, (err, result) => {
            if (err) return res.json({ Status: false, Error: err.message })
            return res.json({ Status: true, Result: result })
      })
})

export { router as adminrouter };