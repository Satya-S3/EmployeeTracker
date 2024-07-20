import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Category() {

      const [category, setCategory] = useState([]);
      const [loading, setLoading] = useState(false);

      useEffect(() => {
            axios.get("http://localhost:3000/auth/category")
                  .then(result => {
                        if (result.data.Status) {
                              setCategory(result.data.Result);
                              setLoading(true);
                        } else {
                              alert(result.data.Error);
                        }
                  })
                  .catch(err => {
                        console.log(err);
                  })
      }, [])

      return <>
            <div className="text-center border border-rounded m-3 p-3 shadow">
                  <h2>Add Category</h2>
                  <Link className="btn btn-success" to="/dashboard/AddCategory">ADD</Link>
            </div>
            {loading &&
                  <table className="table text-center p-3 shadow">
                        <thead className="table-dark">
                              <tr>
                                    <th>ID</th>
                                    <th>NAMES</th>
                              </tr>
                        </thead>
                        <tbody>
                              {category.map((res,index) => (
                                    <tr key={index}>
                                          <td>{index+1}</td>
                                          <td>{res.name}</td>
                                    </tr>
                              ))}
                        </tbody>
                  </table>
            }

      </>
}

export default Category;