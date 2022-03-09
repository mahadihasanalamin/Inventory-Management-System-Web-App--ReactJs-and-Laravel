import React, {useState,useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddProduct =()=>{
    document.title='Add New Products';

    const [product, setProduct] = useState({})
    const [purId, setPurId] = useState([]);
    const [categories, setCategories] = useState([]);
    const [amount, setAmount] = useState([]);
    const [image, setImage] = useState();
    const [errors, setErrors] = useState({});
    const [formSubmit, setFormSubmit] =useState(false);
    const [tempProducts, setTempProducts] = useState([]);
    const [quantity, setQuantity] = useState({});
    const [totalAmount, setTotalAmount] = useState();
    const [dueAmount, setDueAmount] = useState();
    const [purDetails, setPurDetails] = useState({});
    const [purErrors, setPurErrors] = useState({});
    const [purSubmit, setPurSubmit] = useState(false);
    const history = useHistory();

    useEffect(()=>{

        axios.get("api/purchaseid")
        .then(resp=>{
            setPurId(resp.data);
        }).catch(err=>{
            console.log(err);
        })

        axios.get("api/products/categories")
        .then(resp=>{
            setCategories(resp.data);
        }).catch(err=>{
            console.log(err);
        })

        axios.get("api/tempproducts")
        .then(resp=>{
            setTempProducts(resp.data)
        }).catch(err=>{
            console.log(err)
        })

    },[])

    useEffect(()=>{
        if(!product.price){
            product.quantity=''
        }
        if(!totalAmount){
            purDetails.paymentAmount=''
        }
    },[product, totalAmount, purDetails])

    useEffect(()=>{
        let amount=0;
        tempProducts.map(p=>{
            amount= amount+ Number(p.amount)
            setTotalAmount(amount);
        })
    },[tempProducts])
    

    const DeleteProduct =(e,Id)=>{
        e.preventDefault();
        axios.delete(`api/tempproducts/delete/${Id}`)
        .then(resp=>{
            setTempProducts(resp.data)
        }).catch(err=>{
            console.log(err);
        })
      }


    const calculateAmount=()=>{
        if(!product.quantity){
            setAmount('')
        }
        else{
            setAmount(Number(product.price)*Number(product.quantity));
        }
    }

    const handleProduct =(e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setProduct({...product, [name]:value});
    }

    const handleFile=(e)=>{
        setImage(e.target.files[0])
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

    const Add =(e)=>{
        e.preventDefault();

        product.amount = amount.toString();
    
        setErrors(Validate(product));
        setFormSubmit(true);
    }

    useEffect(()=>{
        if(Object.keys(errors).length===0 && formSubmit){
            const formData = new FormData();

            formData.append('name',product.name);
            formData.append('image',image);
            formData.append('category',product.category);
            formData.append('brand',product.brand);
            formData.append('model',product.model);
            formData.append('weight',product.weight);
            formData.append('price',product.price);
            formData.append('quantity',product.quantity);
            formData.append('amount',product.amount);
        
            axios.post("api/tempproducts/add",formData)
            .then(resp=>{
                setTempProducts(resp.data);
            }).catch(err=>{
                console.log(err);
            })

            product.name=''
            product.image=''
            product.brand=''
            product.model=''
            product.weight=''
            product.price=''
            product.quantity=''
            setImage('');
            setAmount('');

            setFormSubmit(false);
        }
    },[errors, formSubmit])

    const Validate=(product)=>{
        const error={}
        if(!product.name)
        {
            error.name='Name field required';
        }
        if(!image)
        {
            error.image='Select an Image'
        }
        if(!product.category)
        {
            error.category='Select a Category';
        }
        if(!product.brand)
        {
            error.brand='Brand field required';
        }
        if(!product.model)
        {
            error.model='Model field required';
        }
        if(!product.weight)
        {
            error.weight='Weight field required';
        }
        if(!product.price)
        {
            error.price='Price field required';
        }
        if(!product.quantity)
        {
            error.quantity='Quantity field required';
        }
        if(!product.amount)
        {
            error.amount='Amount field required';
        }

        return error;
    }

    const ChangeQuantity =(e)=>{
        const id=e.target.id;
        const value=e.target.value
        
        setQuantity({...quantity, [id]:value});
    }

    const Update =(e)=>{
        e.preventDefault();
        axios.post('api/tempproducts/changequantity',quantity)
        .then(resp=>{
            setTempProducts(resp.data);
        }).catch(err=>{
            console.log(err);
        })
    }

    const Purchase =(e)=>{
        e.preventDefault();
        purDetails.purchaseId =purId;
        purDetails.totalAmount =totalAmount;
        purDetails.dueAmount =dueAmount;
    
        setPurErrors(PurValidate(purDetails))
        setPurSubmit(true);
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


    useEffect(()=>{
        if(Object.keys(purErrors).length ===0 && purSubmit){
            axios.post('api/tempproducts/purchase',purDetails)
            .then(resp=>{
                setTempProducts(resp.data);
            }).catch(err=>{
                console.log(err);
            })

            setPurId(purId+1);
            purDetails.supplierName ='';
            purDetails.supplierPhone ='';
            purDetails.paymentAmount ='';
            purDetails.dueAmount ='';
            setPurSubmit(false);
            // history.push('/products')
        }
    },[purErrors, purDetails, purSubmit, purId])

    return(
        <div>
        <h1>Add New Products</h1>
        <div className="container-1">

            <div className="box-1" >
                
                <form onSubmit={Add}>
                    <div className="scroll">

                        <div className='col-md-12 form-group'>
                            <label>Name</label>
                            <input type='text' name='name' value={product.name} onChange={handleProduct} className='form-control'/>
                            <span className="text-danger">{errors.name}</span>
                        </div>

                        <div className='col-md-12 form-group'>
                            <label>Image</label>
                            <input type="file" accept="image, image/jpeg, image/png" name='image' value={product.image} onChange={handleFile} className='form-control'/>
                            <span className="text-danger">{errors.image}</span>
                        </div>

                        <div className='col-md-12 form-group'>
                            <label>Category</label>
                            <select name='category' onChange={handleProduct} className='form-control'>
                                <option value='choose a category' hidden>choose a category</option>
                                {
                                    categories.map(category=>(
                                        <option key={category.category} value={category.category}>{category.category}</option>
                                    ))
                                }
                            </select>
                            <span className="text-danger">{errors.category}</span>
                        </div>

                        <div className='col-md-12 form-group'>
                            <label>Brand</label>
                            <input type='text' name='brand' value={product.brand} onChange={handleProduct} className='form-control'/>
                            <span className="text-danger">{errors.brand}</span>
                        </div>

                        <div className='col-md-12 form-group'>
                            <label>Model</label>
                            <input type='text' name='model' value={product.model} onChange={handleProduct} className='form-control'/>
                            <span className="text-danger">{errors.model}</span>
                        </div>

                        <div className='col-md-12 form-group'>
                            <label>Weight</label>
                            <input type='text' name='weight' value={product.weight} onChange={handleProduct} className='form-control'/>
                            <span className="text-danger">{errors.weight}</span>
                        </div>

                        <div className='col-md-12 form-group'>
                            <label>Price</label>
                            <input type='text' name='price' value={product.price} onChange={handleProduct} className='form-control'/>
                            <span className="text-danger">{errors.price}</span>
                        </div>

                        <div className='col-md-12 form-group'>
                            <label>Quantity</label>
                            <input type='text' name='quantity' value={product.quantity} onKeyUp={calculateAmount} onChange={handleProduct} className='form-control'/>
                            <span className="text-danger">{errors.quantity}</span>
                        </div>

                        <div className='col-md-12 form-group'>
                            <label>Amount</label>
                            <input type='text' name='amount' value={amount} className='form-control' readOnly/>
                            <span className="text-danger">{errors.amount}</span>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-success'>Add</button>
                </form>
            </div>

            <br/>
            
            <div className="box-2">
                <form onSubmit={Update}>
                    <div className="scrollTable">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Add Quantity</th>
                                    <th>Amount</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tempProducts.map(product=>(
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td><img width='30px' height='60px' 
                                            src={'http://localhost:8000/'+product.image} alt=""/></td>
                                            <td>{product.brand}</td>
                                            <td>{product.model}</td>
                                            <td>{product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>
                                                <div className="col-md-10">
                                                    <input type='number' id={product.id} onChange={ChangeQuantity} className="form-control" />
                                                </div>
                                            
                                            </td>
                                            <td>{product.amount}</td>
                                            <td><button className='btn btn-danger'
                                            onClick={e=>DeleteProduct(e,product.id)}>Delete</button></td>
                                        </tr>
                                    ))
                                
                                }
                            </tbody>
                        </table>
                        
                    </div>
                    <input type='submit' value='Update' className='btn btn-success'/>
                </form>
            </div>
            
            <div className="box-3">
                <form onSubmit={Purchase}>
                    <div style={{height: 590}}>
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
                </form>
            </div>

        </div>
        </div>
    )
}
export default AddProduct;