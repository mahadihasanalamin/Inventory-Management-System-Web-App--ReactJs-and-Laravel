@extends('Layouts.App')
@section('content')
    <form action="{{route('products/purchasedue/payment')}}" method='GET'>
    <h1>Purchase Due</h1>
    {{csrf_field()}}
        <table class='table table-bordered'>
        <th>Supplier Name</th>
        <th>Supplier Phone</th>
        <th>Date</th>
        <th>Total Amount</th>
        <th>Paid</th>
        <th>Due Amount</th>
        <th>Payment Amount</th>
        <th>Last Paid</th>
        <th>Details</th>
        @foreach($productsDue as $product)
            <tr>
                <td>{{$product->supplierName}}</td>
                <td>{{$product->supplierPhone}}</td>
                <td>{{$product->created_at}}</td>
                <td>{{$product->total_amount}}</td>
                <td>{{$product->payment_amount}}</td>
                <td>{{$product->due_amount}}</td>
                <td><input type='number' name='{{$product->id}}'></td>
                <td>{{$product->updated_at}}</td>
                <td><a class ="btn btn-success" href="/products/purchaseReport/details/{{$product->id}}">Details</a></td>
            </tr>
        @endforeach
        </table>
        <input class ="btn btn-success" type='submit' value='Update'>
    </form>
@endsection