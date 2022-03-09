import axios from "axios";
import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


const Sidenav =()=>{
    const [items, setItems] = useState([]);
    const [items1, setItems1] = useState([]);
    const history = useHistory();


    const storeItems =()=>{
        const items={};
        items.add= <Link to='/products/add'>Add New</Link>
        items.list= <Link to='/products'>List</Link>
        items.categories= <Link to='/products/categories'>Categories</Link>
        items.addStock= <Link to='/products/addstock'>Add Stock</Link>
        items.purHistory= <Link to='/products/purchasedhistory'>Purchased History</Link>
        items.purDue= <Link to='/products/purchaseddue'>Due List</Link>
        
        return items;
    }

    const storeItems1 =()=>{
        const items1={};
        items1.outletList= <Link to='/outlets'>List</Link>
        items1.stockTransfer= <Link to='/outlets/stocktransfer'>Stock Transfer</Link>
        items1.stockTransferredHistory= <Link to='/outlets/stocktransfer/history'>Transferred History</Link>
        
        return items1;
    }
    useEffect(()=>{
        Expand();
        Expand1();
    },[])
    const Expand =()=>{
        if(!items){
            setItems(storeItems)
        }
        else{
            setItems('')
        }
    }

    const Expand1 =()=>{
        if(!items1){
            setItems1(storeItems1)
        }
        else{
            setItems1('')
        }
    }

    const logout =()=>{
        
        axios.post('api/user/logout',JSON.parse(localStorage.getItem('user')))
        .then(resp=>{
            console.log(resp.data)
            localStorage.clear();
            history.push('/user/login');
            window.location.reload();
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="container-1">
            {/* <button onClick={logout} to='/'>logout</button> */}
        <div className="sidenav">
            <Link to='/'>Dashboard</Link><br/>
            <Link onClick={Expand} to={'#'}>Products <i className="dropdown-toggle"></i></Link>
            <div style={{marginLeft: 5}}>
                {items.add}
                {items.list}
                {items.categories}
                {items.addStock}
                {items.purHistory}
                {items.purDue}
            </div>
            <Link onClick={Expand1} to={'#'}>Outlets <i className="dropdown-toggle"></i></Link>
            <div style={{marginLeft: 5}}>
                {items1.outletList}
                {items1.stockTransfer}
                {items1.stockTransferredHistory}
            </div>
            <div className="logout">
             <button onClick={logout}>Logout</button>
            </div>
        </div>
        </div>
    )
}
export default Sidenav;