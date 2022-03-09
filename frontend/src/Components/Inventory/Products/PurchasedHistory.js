import axios from "axios";
import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const PurchasedHistory =()=>{
    document.title='Purchased History';
    const [purHistory, setPurHistory] =useState([]);
    const [searchBy, setSearchBy] =useState({'searchBy': 'created_at'});
    const [date, setDate] =useState([]);
    const [purDate, setPurDate] =useState([]);
    const [uniqueDate, setUniqueDate] =useState([]);


    useEffect(()=>{
        axios.get('api/products/purchasedhistory')
        .then(resp=>{
            setPurHistory(resp.data)
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const DeleteHistory=(id)=>{
        var answer = window.confirm('Are you sure you want to delete the history?');
        if (answer)
        {
            axios.delete(`api/products/purchasedhistory/delete/${id}`)
            .then(resp=>{
                setPurHistory(resp.data)
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    const handleSearch =(e)=>{
        setSearchBy({[e.target.name]:e.target.value});
    }

    const handleDate =(e)=>{
        const name= e.target.name;
        const value= e.target.value;

        setDate({...date, [name]:value});
    }

    const searchHistory=(e)=>{
        const value= e.target.value;
        const search={'content':value}

        const obj={...search, ...searchBy};
        axios.post("api/products/purchasedhistory",obj)
        .then(resp=>{
            setPurHistory(resp.data);
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
       
        purHistory.map(ph=>(
            setPurDate(purDate=>[...purDate, moment(ph.created_at).format('YYYY-MM-DD')])
        ))
       
    },[purHistory])

    useEffect(()=>{
        let values= new Set(purDate)
        setUniqueDate(Array.from(values))
    },[purDate])

    const showHistory =()=>{
        axios.post('api/products/purchasedhistory/results',date)
        .then(resp=>{
            setPurHistory(resp.data)
        }).catch(err=>{
            console.log(err);
        })
    }

    return(
        <div>
            <h1>Product Purchased History</h1>
             <div className="container-2">
            <div className='col-md-2 form-group'>
                <input type='text' name='search' onChange={searchHistory} placeholder="search" className='form-control'/>
            </div>
            <br/><br/>

            <div class="col-md-4 row" style={{marginLeft: 5}}>
                <label class="col-md-4 col-form-label">Search By</label>
                <div class="col-md-5" style={{marginLeft:-75}}>
                    <select name='searchBy' onChange={handleSearch} className='form-control'>
                        <option value='created_at'>Date</option>
                        <option value='supplierName'>Supplier Name</option>
                        <option value='supplierPhone'>Supplier Phone</option>
                    </select>
                </div>
            </div>
          
            <div class="col-md-4 row">
                <label class="col-md-4 col-form-label">From</label>
                <div class="col-md-5" style={{marginLeft: -110}}>
                    <select name='startDate' onChange={handleDate} className='form-control'>
                        <option hidden>select start date</option>
                        {
                            uniqueDate.map(uDate=>(
                                <option value={uDate}>{uDate}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div class="col-md-4 row" style={{marginLeft: -200}}>
                <label class="col-md-4 col-form-label">TO</label>
                <div class="col-md-5" style={{marginLeft:-125}}>
                    <select name='endDate' onChange={handleDate} className='form-control'>
                    <option hidden>select end date</option>
                        {
                            uniqueDate.map(uDate=>(
                                <option value={uDate}>{uDate}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <input type='submit' value='Search' onClick={showHistory} className='btn btn-success' style={{marginLeft: -200}}/>
            </div>

            <div className="scrollTable" style={{marginLeft: 180}}>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Supplier Name</th>
                            <th>Supplier Phone</th>
                            <th>Total Amount</th>
                            <th>Paymount Amount</th>
                            <th>Due Amount</th>
                            <th>Details</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            purHistory.map(history=>(
                                <tr key={history.id}>
                                    <td>{moment(history.created_at).format('YYYY-MM-DD')}</td>
                                    <td>{history.supplierName}</td>
                                    <td>{history.supplierPhone}</td>
                                    <td>{history.total_amount}</td>
                                    <td>{history.payment_amount}</td>
                                    <td>{history.due_amount}</td>

                                    <td><Link className='btn btn-success' 
                                    to={'/products/purchasedhistory/details/'+history.purchase_id}>Details</Link></td>

                                    <td><button className='btn btn-danger' 
                                    onClick={()=>DeleteHistory(history.purchase_id)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default PurchasedHistory;