import axios from "axios";
import React,{useState, useEffect} from "react";
import moment from "moment";

const StockTransferredHistory =()=>{
    document.title='Stock Transferred history';
    const [searchBy, setSearchBy] =useState({'searchBy': 'created_at'});
    const [trfHistory, setTrfHistory] =useState([]);
    const [date, setDate] =useState([]);
    const [trfDate, setTrfDate] =useState([]);
    const [uniqueDate, setUniqueDate] =useState([]);



    useEffect(()=>{
        axios.get('api/outlets/stocktransfer/history')
        .then(resp=>{
            setTrfHistory(resp.data)
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const DeleteHistory=(id)=>{
        var answer = window.confirm('Are you sure you want to delete the history?');
        if (answer)
        {
            axios.delete(`api/outlets/stocktransfer/history/delete/${id}`)
            .then(resp=>{
                setTrfHistory(resp.data)
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    const searchHistory=(e)=>{
        const value= e.target.value;
        const search={'content':value}

        const obj={...search, ...searchBy};
        axios.post("api/outlets/stocktransfer/history",obj)
        .then(resp=>{
            setTrfHistory(resp.data);
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleSearch =(e)=>{
        setSearchBy({[e.target.name]:e.target.value});
    }

    const handleDate =(e)=>{
        const name= e.target.name;
        const value= e.target.value;

        setDate({...date, [name]:value});
    }


    useEffect(()=>{
       
        trfHistory.map(ph=>(
            setTrfDate(trfDate=>[...trfDate, moment(ph.created_at).format('YYYY-MM-DD')])
        ))
       
    },[trfHistory])

    useEffect(()=>{
        let values= new Set(trfDate)
        setUniqueDate(Array.from(values))
    },[trfDate])

    const showHistory =()=>{
        axios.post('api/outlets/stocktransfer/history/results',date)
        .then(resp=>{
            setTrfHistory(resp.data)
        }).catch(err=>{
            console.log(err);
        })
    }

    return(
        <div>
            <h1>Product Stock Transferred History</h1>
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
                        <option value='p_id'>Product ID</option>
                        <option value='outlet'>Outlet</option>
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
                            <th>Outlet</th>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Model</th>
                            <th>quantity</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody style={{textAlign: "center"}}>
                        {
                            trfHistory.map(history=>(
                                <tr key={history.id}>
                                    <td>{moment(history.created_at).format('YYYY-MM-DD')}</td>
                                    <td>{history.outlet}</td>
                                    <td>{history.p_id}</td>
                                    <td>{history.p_id}</td>

                                    <td><img width='30px' height='60px' 
                                    src={'http://localhost:8000/'+history.image} alt=""/></td>

                                    <td>{history.model}</td>
                                    <td>{history.quantity}</td>

                                    <td><button className='btn btn-danger' 
                                    onClick={()=>DeleteHistory(history.id)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default StockTransferredHistory;