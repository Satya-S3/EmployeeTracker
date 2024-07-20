import mysql from "mysql";

const connection=mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "12345", //dummypassword
      database: "employee_database"
})

connection.connect(function(err){
      if(err){
            console.log("Error!!!!!!");
      }else{
            console.log("Database connected");
      }
})

export default connection;