import axios from "axios";
import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";

const PurchasedHistoryDetails =()=>{
    document.title='Purchased Products Details';
    const [products, setProducts] =useState([]);
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`api/products/purchasedhistory/details/${id}`)
        .then(resp=>{
            setProducts(resp.data)
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    return(
        <div>
            <h1>Purchased Products Details</h1>
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
                            <th>Quantity</th>
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
                                    <td>{product.quantity}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PurchasedHistoryDetails;