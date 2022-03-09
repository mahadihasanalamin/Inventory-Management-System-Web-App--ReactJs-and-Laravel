import axios from "axios";
import React, {useState, useEffect} from "react";

const Dashboard =()=>{
    document.title='Dashboard';
    const [dash, setDash] =useState([])
    useEffect(()=>{
        axios.get("api/dashboard")
        .then(resp=>{
            // console.log(resp.data)
            setDash(resp.data);
        }).catch(err=>{
            console.log(err);
        })
    })
    return(
        <div style={{marginLeft:180}}>
            <h1>Last 7 Days Report</h1>
            <h2>Total Purchase:{dash.totalPurchase}</h2>
            <h2>Total Due:{dash.totalDue}</h2>
            <h2>Total Transferred Stocks:{dash.totalStock}</h2>
        </div>

    )
}
export default Dashboard;