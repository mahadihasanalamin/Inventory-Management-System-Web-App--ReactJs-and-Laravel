import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const ProductList = () =>{
    document.title='Product List';
    const [products, setProducts]=useState([]);
    const [searchBy, setSearchBy] =useState({'searchBy': 'name'});

    useEffect(()=>{
        axios.get("api/products")
        .then(resp=>{
            setProducts(resp.data)
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    const DeleteProduct=(id)=>{
        var answer = window.confirm('Are you sure you want to delete the product (id ='+id+') ?');
        if (answer)
        {
            axios.delete(`api/products/delete/${id}`)
            .then(resp=>{
                setProducts(resp.data)
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    const handleSearch =(e)=>{
        setSearchBy({[e.target.name]:e.target.value});
    }

    const searchProduct=(e)=>{
        const value= e.target.value;
        const search={'content':value}

        const obj={...search, ...searchBy};
        axios.post("api/products",obj)
        .then(resp=>{
            setProducts(resp.data);
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div>
            <h1>Product List</h1>
            <div className="container-2">
            <div className='col-md-2 form-group'>
                <input type='text' name='search' onChange={searchProduct} placeholder="search" className='form-control'/>
            </div>
            <br/><br/>

            <div class="col-md-4 row" style={{marginLeft:25}}>
                <label class="col-md-4 col-form-label">Search By</label>
                <div class="col-md-4" style={{marginLeft:-75}}>
                    <select name='searchBy' onChange={handleSearch} className='form-control'>
                        <option value='name'>Name</option>
                        <option value='p_id'>ID</option>
                        <option value='category'>Category</option>
                        <option value='brand'>Brand</option>
                    </select>
                </div>
            </div>
            
            </div>
            <div className="scrollTable" style={{marginLeft: 180}}>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Weight</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.map(product=>(
                                <tr key={product.p_id}>
                                    <td>{product.p_id}</td>
                                    <td>{product.name}</td>
                                    <td><img width='30px' height='60px' 
                                    src={'http://localhost:8000/'+product.image} alt=""/></td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.model}</td>
                                    <td>{product.weight}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td><Link className='btn btn-success' to={'/products/edit/'+product.p_id}>Edit</Link></td>
                                    <td><button className='btn btn-danger' 
                                    onClick={()=>DeleteProduct(product.p_id)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductList;