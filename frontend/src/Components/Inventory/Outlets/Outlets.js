import axios from "axios";
import React,{useState, useEffect} from "react";

const Outlets =()=>{
    document.title='Outlets';
    const [outlet, setOutlet] =useState({});
    const [formSubmit, setFormSubmit] =useState(false);
    const [errors, setErrors] =useState([]);
    const [outlets, setOutlets] =useState([]);


    useEffect(()=>{
        axios.get("api/outlets")
            .then(resp=>{
                setOutlets(resp.data);
            }).catch(err=>{
                console.log(err);
            })
    },[])
    const handleOutlet =(e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setOutlet({...outlet, [name]:value});
    }

    const Validate=(outlet)=>{
        const error={};
        if(!outlet.name)
        {
            error.name='Name field required';
        }
        if(!outlet.address)
        {
            error.address='Address field required'
        }

        return error;
    }

    const Add =(e)=>{
        e.preventDefault();
    
        setErrors(Validate(outlet));
        setFormSubmit(true);
    }

    useEffect(()=>{
        if(Object.keys(errors).length===0 && formSubmit){
            axios.post("api/outlets/add",outlet)
            .then(resp=>{
                setOutlets(resp.data);
            }).catch(err=>{
                console.log(err);
            })

            outlet.name=''
            outlet.address=''

            setFormSubmit(false);
        }
    },[errors, formSubmit])

    const DeleteOutlet =(e,Id)=>{
        e.preventDefault();
        axios.delete(`api/outlets/delete/${Id}`)
        .then(resp=>{
            setOutlets(resp.data)
        }).catch(err=>{
            console.log(err);
        })
        
      }

    return(
        <div>
            <h1>Outlets</h1>

            <div className="container-1">
            <form onSubmit={Add}>
                <div className='col-md-12 form-group'>
                    <label>Outlet Name</label>
                    <input type='text' name='name' value={outlet.name} onChange={handleOutlet} className='form-control'/>
                    <span className="text-danger">{errors.name}</span>
                </div>

                <div className='col-md-12 form-group'>
                    <label>Outlet Address</label>
                    <input type='text' name='address' value={outlet.address} onChange={handleOutlet} className='form-control'/>
                    <span className="text-danger">{errors.address}</span>
                </div>
                <button type='submit' className='btn btn-success'>Add</button>
            </form>
            <div className="scrollTable" style={{marginLeft: 180, width: 700}}>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody style={{textAlign: "center"}}>
                        {
                            outlets.map(outlet=>(
                                <tr key={outlet.id}>
                                    <td>{outlet.name}</td>
                                    <td>{outlet.address}</td>
                                    <td><button className='btn btn-danger' 
                                    onClick={e=>DeleteOutlet(e, outlet.id)}>Delete</button></td>
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
export default Outlets;