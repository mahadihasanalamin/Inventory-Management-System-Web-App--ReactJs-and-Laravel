import axios from "axios";
import React,{useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";

const EditProduct =()=>{
    document.title='Edit Product';

    const [product, setProduct]= useState([]);
    const [errors, setErrors] =useState({});
    const [formSubmit, setFormSubmit] =useState(false);
    const history = useHistory();
    const {id} = useParams();
    
    useEffect(()=>{
        axios.get(`api/products/edit/${id}`)
        .then(resp=>{
            setProduct(resp.data)
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const handleProduct =(e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setProduct({...product, [name]:value});
        console.log(value)
    }

    const Update =(e)=>{
        e.preventDefault();
        setErrors(Validate(product));
        setFormSubmit(true);
    }

    useEffect(()=>{
        if(Object.keys(errors).length===0 && formSubmit){
            const formData = new FormData();

            formData.append('p_id',product.p_id);
            formData.append('name',product.name);
            formData.append('model',product.model);
            formData.append('weight',product.weight);
            formData.append('price',product.price);
        
            axios.post("api/products/edit",formData)
            .then(resp=>{
                console.log(resp.data);
            }).catch(err=>{
                console.log(err);
            })

            setFormSubmit(false);
            history.push('/products');
        }
    },[errors, formSubmit, product])

    const Validate=(product)=>{
        const error={}

        if(!product.name)
        {
            error.name='Name field required';
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

        return error;
    }

    return (
        <div>
            <h1>Edit Product</h1>
        <div style={{marginLeft: 190}}>
                
            <form onSubmit={Update}>
                <div className="scroll">
                    <div className='col-md-2 form-group'>
                        <label>ID</label>
                        <input type='text' name='p_id' value={id} className='form-control' readOnly/>
                        <span className="text-danger">{errors.name}</span>
                    </div>
 
                    <div className='col-md-2 form-group'>
                        <label>Name</label>
                        <input type='text' name='name' value={product.name} className='form-control'/>
                        <span className="text-danger">{errors.name}</span>
                    </div>

                   <div className='col-md-2 form-group'>
                        <label>Image</label>
                        <img height="150px" accept="image, image/jpeg, image/png" name="image" src={'http://localhost:8000/'+product.image} alt="" class="form-control"/>
                    </div>

                    <div className='col-md-2 form-group'>
                        <label>Category</label>
                        <input type='text' name='category' value={product.category} class='form-control' readOnly/>
                    </div>

                    <div className='col-md-2 form-group'>
                        <label>Brand</label>
                        <input type='text' name='brand' value={product.brand} className='form-control' readOnly/>
                    </div>

                    <div className='col-md-2 form-group'>
                        <label>Model</label>
                        <input type='text' name='model' value={product.model} onChange={handleProduct} className='form-control'/>
                        <span className="text-danger">{errors.model}</span>
                    </div>

                    <div className='col-md-2 form-group'>
                        <label>Weight</label>
                        <input type='text' name='weight' value={product.weight} onChange={handleProduct} className='form-control'/>
                        <span className="text-danger">{errors.weight}</span>
                    </div>

                    <div className='col-md-2 form-group'>
                        <label>Price</label>
                        <input type='text' name='price' value={product.price} onChange={handleProduct} className='form-control'/>
                        <span className="text-danger">{errors.price}</span>
                    </div>

                    <div className='col-md-2 form-group'>
                        <label>Stock</label>
                        <input type='text' name='quantity' value={product.stock} className='form-control'readOnly/>
                        <span className="text-danger">{errors.quantity}</span>
                    </div>

                </div> 
                <br/>
                <button type='submit' className='btn btn-success'>Update</button>
                <br/><br/>
            </form>
        </div>
        </div>
    )
}

export default EditProduct;