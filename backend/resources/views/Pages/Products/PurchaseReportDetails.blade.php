@extends('Layouts.App')
@section('content')
<h1>Purchased Products Details</h1>
    <table class='table table-bordered'>
        <th>Name</th>
        <th>Image</th>
        <th>Category</th>
        <th>Brand</th>
        <th>Model</th>
        <th>Price</th>
        <th>Stock</th>
        @foreach($productlist as $product)
            <tr>
                <td>{{$product->name}}</td>
                <td><img width="30px" height="60px" src="{{asset($product->image)}}"></td>
                <td>{{$product->category}}</td>
                <td>{{$product->brand}}</td>
                <td>{{$product->model}}</td>
                <td>{{$product->price}}</td>
                <td>{{$product->quantity}}</td>
            </tr>
        @endforeach
    </table>
@endsection