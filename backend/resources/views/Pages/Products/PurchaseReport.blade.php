@extends('Layouts.App')
@section('content')
<h1>Purchased History</h1>
<form method="get" action="{{route('products/purchasereport/search')}}">
        <br>
        <div class = 'col-md-4 form-group'>
            <input type='search' name='search'  placeholder='search by date or supplier phone or name' class='form-control'>
        </div>
        <input class ="btn btn-success" type='submit' value='Search'>
    </form>
    <table class='table table-bordered'>
        <th>Supplier Name</th>
        <th>Supplier Phone</th>
        <th>Date</th>
        <th>Total Amount</th>
        <th>Paymount Amount</th>
        <th>Due Amount</th>
        <th>Details</th>
        <th>Delete</th>
        @foreach($productPurchase as $product)
            <tr>
                <td>{{$product->supplierName}}</td>
                <td>{{$product->supplierPhone}}</td>
                <td>{{$product->created_at}}</td>
                <td>{{$product->total_amount}}</td>
                <td>{{$product->payment_amount}}</td>
                <td>{{$product->due_amount}}</td>
                <td><a class ="btn btn-success" href="/products/purchaseReport/details/{{$product->id}}">Details</a></td>
                <td><a class ="btn btn-danger" href="/products/purchaseReport/delete/{{$product->id}}">Delete</a></td>
            </tr>
        @endforeach
    </table>
@endsection