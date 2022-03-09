import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";

const AddStock = () =>{
    document.title='Add Stock';
    const [products, setProducts]=useState([]);
    const [searchBy, setSearchBy] =useState({'searchBy': 'name'});

    const [purId, setPurId] = useState([]);
    const [totalAmount, setTotalAmount] = useState();
    const [dueAmount, setDueAmount] = useState();
    const [purDetails, setPurDetails] = useState({});
    const [purErrors, setPurErrors] = useState({});
    const [purSubmit, setPurSubmit] = useState(false);
    const [stock, setStock] =useState({});
    const history = useHistory();

    useEffect(()=>{
        axios.get("api/products")
        .then(resp=>{
            setProducts(resp.data)
        }).catch(err=>{
            console.log(err);
        })

        axios.get("api/purchaseid")
        .then(resp=>{
            setPurId(resp.data);
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

    const handlePurDetails =(e)=>{
        const name= e.target.name;
        const value= e.target.value;
        setPurDetails({...purDetails, [name]:value});
    }

    const calculateDueAmount =()=>{
        if(!purDetails.paymentAmount){
            setDueAmount('')
        }
        else{
            setDueAmount(Number(totalAmount) - Number(purDetails.paymentAmount));
        }
    }

    const PurValidate =(purDetails)=>{
        const errors={};
        if(!purDetails.supplierName){
            errors.supplierName='Supplier Name field required';
        }

        if(!purDetails.supplierPhone){
            errors.supplierPhone='Supplier Phone field required';
        }

        if(!purDetails.paymentAmount){
            errors.paymentAmount='Payment Amount field required';
        }

        if(!totalAmount){
            errors.totalAmount='Total Amount field required';
        }

        return errors;
    }


    const Purchase =(e)=>{
        e.preventDefault();
        purDetails.purchaseId =purId;
        purDetails.totalAmount =totalAmount;
        purDetails.dueAmount =dueAmount;
    
        setPurErrors(PurValidate(purDetails))
        setPurSubmit(true);
    }

    useEffect(()=>{
        if(Object.keys(purErrors).length ===0 && purSubmit){
            const values ={...stock, ...purDetails}
            axios.post('api/products/stockpurchase',values)
            .then(resp=>{
                setProducts(resp.data);
            }).catch(err=>{
                console.log(err);
            })

            setPurId(purId+1);
            purDetails.supplierName ='';
            purDetails.supplierPhone ='';
            purDetails.paymentAmount ='';
            purDetails.dueAmount ='';
            setDueAmount('')
            
            // history.push('/products')
            setPurSubmit(false);
        }
    },[purSubmit])

    const handleStock =(e)=>{
        const id=e.target.id;
        const value=e.target.value
        
        setStock({...stock, [id]:value})
    }

    useEffect(()=>{
        axios.post('api/products/addstock',stock)
        .then(resp=>{
            setTotalAmount(resp.data);
        }).catch(err=>{
            console.log(err)
        })
    },[stock])


    return(
        <div>
            <h1>Add Stock</h1>
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
            <form onSubmit={Purchase}>
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
                                    <th>Add Stock</th>
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
                                    <label>Purchase ID</label>
                                    <input type='text' name='purchaseId' value={purId} class='form-control' readOnly/>
                                </div>

                                <div class='col-md-12 form-group'>
                                    <label>Suppllier Name</label>
                                    <input type='text' name='supplierName' value={purDetails.supplierName} onChange={handlePurDetails} class='form-control'/>
                                    <span class='text-danger'>{purErrors.supplierName}</span>
                                </div>

                                <div class='col-md-12 form-group'>
                                    <label>Suppllier Phone</label>
                                    <input type='text' name='supplierPhone' value={purDetails.supplierPhone} onChange={handlePurDetails} class='form-control'/>
                                    <span class='text-danger'>{purErrors.supplierPhone}</span>
                                </div>

                            <div class='col-md-12 form-group'>
                                    <label>Total Amount</label>
                                    <input type='text' name='totalAmount' value={totalAmount} class='form-control' readOnly/>
                                    <span class='text-danger'>{purErrors.totalAmount}</span>
                                </div>

                                <div class='col-md-12 form-group'>
                                    <label>Payment Amount</label>
                                    <input type='text' name='paymentAmount' value={purDetails.paymentAmount} onKeyUp={calculateDueAmount} onChange={handlePurDetails} class='form-control'/>
                                    <span class='text-danger'>{purErrors.paymentAmount}</span>
                                </div>

                                <div class='col-md-12 form-group'>
                                    <label>Due Amount</label>
                                    <input type='text' name='dueAmount' value={dueAmount} class='form-control' readOnly/>
                                </div>
                                <br/>
                            </div>
                                <input type='submit' name='Purchase' value='Purchase' class='btn btn-success'/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddStock;