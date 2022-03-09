import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";

const StockTransfer = () =>{
    document.title='Stock transfer to the Outlets';
    const [searchBy, setSearchBy] =useState({'searchBy': 'name'});

    const [products, setProducts]=useState([]);
    const [outlets, setOutlets] =useState([]);
    const [stock, setStock] =useState({});
    const [outlet, setOutlet] =useState({});
    const [errors, setErrors] =useState();
    
    const history = useHistory();

    useEffect(()=>{

        axios.get("api/products")
        .then(resp=>{
            setProducts(resp.data)
        }).catch(err=>{
            console.log(err);
        })

        axios.get("api/outlets")
            .then(resp=>{
                setOutlets(resp.data);
            }).catch(err=>{
                console.log(err);
            })

    },[]);
    

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

    const handleStock =(e)=>{
        const id=e.target.id;
        const value=e.target.value
        
        setStock({...stock, [id]:value})
    }

    const handleOutlet =(e)=>{
        const name= e.target.name;
        const value= e.target.value;
        setOutlet({...outlet, [name]:value});
    }


    const Transfer =(e)=>{
        e.preventDefault();
        if(!outlet.name){
            setErrors('select an outlet');
            console.log('hello')
        }
        else{
            const values={...stock,...outlet};
            axios.post('api/outlets/stocktransfer',values)
            .then(resp=>{
                setProducts(resp.data);
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    return(
        <div>
            <h1>Stock Transfer to the Outlets</h1>
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
            <form onSubmit={Transfer}>
                <div className="container-1">
                    <div className="scrollTable">
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
                                    <th>Transfer Quantity</th>
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
                                            <td>
                                                <div className="col-md-8">
                                                    <input type='number' id={product.p_id} onChange={handleStock} className="form-control" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="box-3">
                            <div style={{height: 550}}>

                                <div class='col-md-12 form-group'>
                                    <label>Outlet</label>
                                    <select name='name' onChange={handleOutlet} className='form-control'>
                                        <option value='choose an outlet' hidden>choose an outlet</option>
                                        {
                                            outlets.map(outlet=>(
                                                <option key={outlet.id} value={outlet.name}>{outlet.name}</option>
                                            ))
                                        }
                                    </select>
                                    <span className="text-danger">{errors}</span>
                                </div>

                                <br/>
                            </div>
                                <input type='submit' name='Transfer' value='Transfer' class='btn btn-success'/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default StockTransfer;