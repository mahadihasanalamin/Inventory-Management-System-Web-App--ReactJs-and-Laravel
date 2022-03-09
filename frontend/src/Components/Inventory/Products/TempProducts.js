import React,{useState, useEffect} from "react";
import axios from "axios";
import AddProduct from "./AddProduct";

let TempProducts=()=>{
    const [tempProducts, setTempProducts] =useState([]);

    useEffect(()=>{
        axios.get("api/tempproducts")
        .then(resp=>{
            setTempProducts(resp.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const hp = AddProduct.handleProduct

    const DeleteProduct =(e,id)=>{
        e.preventDefault();
        axios.delete(`api/tempproducts/delete/${id}`)
        .then(resp=>{
            setTempProducts(resp.data)
        }).catch(err=>{
            console.log(err);
        })
      }
    
    return (
        <div>
            <form>
                <div>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tempProducts.map(product=>(
                                    <tr key={product.p_id}>
                                        <td>{product.p_id}</td>
                                        <td>{product.name}</td>
                                        <td><img width='30px' height='60px' 
                                        src={'http://localhost:8000/'+product.image} alt=""/></td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.model}</td>
                                        <td>{product.price}</td>
                                        <td><input type='number' value={product.quantity} name={product.p_id} onChange={hp} /></td>
                                        <td>{product.amount}</td>
                                        <td><button className='btn btn-danger'
                                        onClick={e=>DeleteProduct(e,product.p_id)}>Delete</button></td>
                                    </tr>
                                ))
                               
                            }
                        </tbody>
                    </table>
                    <input type='submit' value='Update' className='btn btn-success'/>
                </div>
            </form>
            
        </div>
    )
}
export default TempProducts