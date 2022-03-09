import axios from "axios";
import React,{useState, useEffect} from "react";

const Categories =()=>{
    document.title='Categories';
    const [categories, setCategories] =useState([]);
    const [errors, setErrors] =useState([]);
    const [cat, setCat] =useState({});


    useEffect(()=>{

        axios.get("api/products/categories")
            .then(resp=>{
                setCategories(resp.data);
            }).catch(err=>{
                console.log(err);
            })
    },[])
    const handleCategory =(e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setCat({...cat, [name]:value});
    }

    const Add =(e)=>{
        e.preventDefault();
        if(!cat.category)
        {
            setErrors('category field required');
        }
        else
        {
            axios.post("api/products/categories/add",cat)
            .then(resp=>{
                setCategories(resp.data);
            }).catch(err=>{
                console.log(err);
            })

            cat.category ='';
        }

    }

    const DeleteCategory =(e,Id)=>{
        e.preventDefault();
        axios.delete(`api/products/categories/delete/${Id}`)
        .then(resp=>{
            setCategories(resp.data)
        }).catch(err=>{
            console.log(err);
        })
        
      }

    return(
        <div>
            <h1>Product Categories</h1>

            <div className="container-1">
            <form onSubmit={Add}>
                <div className='col-md-12 form-group'>
                    <label>Category</label>
                    <input type='text' name='category' value={cat.category} onChange={handleCategory} className='form-control'/>
                    <span className="text-danger">{errors}</span>
                </div>
                <button type='submit' className='btn btn-success'>Add</button>
            </form>
            <div className="scrollTable" style={{marginLeft: 180, width: 700}}>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody style={{textAlign: "center"}}>
                        {
                            categories.map(category=>(
                                <tr key={category.id}>
                                    <td>{category.category}</td>
                                    <td><button className='btn btn-danger' 
                                    onClick={e=>DeleteCategory(e, category.id)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            </div>
            
            
        </div>
    )
}
export default Categories;