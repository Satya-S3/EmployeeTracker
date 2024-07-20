import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCategory(){

      const [category,setCategory] =useState();
      const navigate=useNavigate();
      const style={
            height:"50vh"
      }

      const handelSubmit=(e)=>{
            e.preventDefault();
            axios.post("http://localhost:3000/auth/AddCategory", {category})
            .then(result=>{
                  if(result.data.Status){
                        navigate('/dashboard/Category')
                  }else{
                        alert(result.data.Error);
                  }
            })
            .catch(err=>console.log(err));
      }

      return<>
             <div className="container1"  style={style}>
                  <div className="box">
                        <center className="mb-3">CATEGORY</center>
                        <form onSubmit={handelSubmit}>
                              <div>
                                    <input autoComplete="Username" name="category" type="text" placeholder="Category" className="form-control"
                                    onChange={(e)=>{setCategory(e.target.value)}}/>
                              </div>
                              <button className="btn btn-success w-50">Add category</button>
                             
                        </form>

                  </div>
            </div>
      </>
}

export default AddCategory;