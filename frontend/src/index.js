import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import ProductList from './Components/Inventory/Products/ProductList';
import axios from 'axios';
import Sidenav from './Components/Sidenav';
import Dashboard from './Components/Users/Dashboard';
import AddProduct from './Components/Inventory/Products/AddProduct';
import EditProduct from './Components/Inventory/Products/EditProduct';
import AddStock from './Components/Inventory/Products/AddStock';
import PurchasedHistory from './Components/Inventory/Products/PurchasedHistory';
import PurchasedHistoryDetails from './Components/Inventory/Products/PurchasedHistoryDetails';
import PurchasedDue from './Components/Inventory/Products/PurchasedDue';
import Outlets from './Components/Inventory/Outlets/Outlets';
import StockTransfer from './Components/Inventory/Outlets/StockTransfer';
import StockTransferredHistory from './Components/Inventory/Outlets/StockTransferredHistory';
import Categories from './Components/Inventory/Products/Categories';
import Login from './Components/Users/Login';

axios.defaults.baseURL="http://localhost:8000";


if(localStorage.getItem('user'))
{
  const obj= JSON.parse(localStorage.getItem('user'));
  var token =obj.access_token;
  axios.defaults.headers.common["Authorization"] =token;
}
axios.defaults.headers.common["Authorization"] =token;

ReactDOM.render(
  <React.StrictMode>

    <Router>
      <Switch>
      <Route exact path='/user/login'>
          <Login/>
      </Route>
      </Switch>
    </Router>
   

    <Router>
      <Switch>
        <Route exact path='/'>
          <Sidenav/>
          <Dashboard/>
        </Route>
        <Route exact path='/products/add'>
          <Sidenav/>
          <AddProduct/>
        </Route>
        <Route exact path='/products/edit/:id'>
          <Sidenav/>
          <EditProduct/>
        </Route>
        <Route exact path='/products'>
          <Sidenav/>
          <ProductList/>
          
        </Route>
        <Route exact path='/products/categories'>
          <Sidenav/>
          <Categories/>
        </Route>
        <Route exact path='/products/addstock'>
          <Sidenav/>
          <AddStock/>
        </Route>
        <Route exact path='/products/purchasedhistory'>
          <Sidenav/>
          <PurchasedHistory/>
        </Route>
        <Route exact path='/products/purchasedhistory/details/:id'>
          <Sidenav/>
          <PurchasedHistoryDetails/>
        </Route>
        <Route exact path='/products/purchaseddue'>
          <Sidenav/>
          <PurchasedDue/>
        </Route>
        <Route exact path='/outlets'>
          <Sidenav/>
          <Outlets/>
        </Route>
        <Route exact path='/outlets/stocktransfer'>
          <Sidenav/>
          <StockTransfer/>
        </Route>
        <Route exact path='/outlets/stocktransfer/history'>
          <Sidenav/>
          <StockTransferredHistory/>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
