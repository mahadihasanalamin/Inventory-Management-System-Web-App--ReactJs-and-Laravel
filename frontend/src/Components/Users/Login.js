import React,{useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const Login =()=>{
    const [input, setInput] =useState({});
    const [errors, setErrors] =useState({});
    const [loginSubmit, setLoginSubmit] =useState(false);
    const [loginFail, setLoginFail] =useState([])
    const history = useHistory();


    const handleInput =(e)=>{
        const name= e.target.name;
        const value= e.target.value;

        setInput({...input, [name]:value});
    }

    const login =(e)=>{
        e.preventDefault();
        setErrors(Validation);
        setLoginSubmit(true);
    }

    const Validation =()=>{
        const error={};

        if(!input.phone)
        {
            error.phone='Phone field required';
        }
        if(!input.password)
        {
            error.password='Password field required';
        }
        return error;
    }

    useEffect(()=>{
        if(Object.keys(errors).length ===0 && loginSubmit)
        {
            axios.post("api/user/login",input)
            .then(resp=>{
                if(resp.data.fail)
                {
                    console.log(resp.data)
                    setLoginFail(resp.data)
                }
                else{
                    setLoginFail('')
                    const token= resp.data;
                    const user= {id:token.id, uid:token.u_id, access_token:token.token};
                    localStorage.setItem('user',JSON.stringify(user));
                    history.push('/');
                    window.location.reload();
                }
            }).catch(err=>{
                console.log(err);
            })
            setLoginSubmit(false);
        }
    },[loginSubmit])

    return(
        <div className="container">
            <form onSubmit={login}>
                <div className='col-md-2 form-group'>
                    <label>Phone</label>
                    <input type='text' name='phone' onChange={handleInput} className='form-control'/>
                </div>
                <span className="text-danger">{errors.phone}</span>

                <div className='col-md-2 form-group'>
                    <label>Password</label>
                    <input type='password' name='password' onChange={handleInput} className='form-control'/>
                </div>
                <span className="text-danger">{errors.password}</span>
                <span className="text-danger">{loginFail.fail}</span>

                <br/><br/>
                <button type='submit' className='btn btn-success'>Login</button>
            </form>
        </div>
    )
}
export default Login;