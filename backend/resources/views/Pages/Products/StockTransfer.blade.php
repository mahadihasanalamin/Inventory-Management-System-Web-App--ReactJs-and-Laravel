@extends('Layouts.App')
@section('content')
    <form method="get" action="{{route('products/stocktransfer/search')}}">
        <br>
        <div class = 'col-md-4 form-group'>
            <input type='search' name='search'  placeholder='search by name or brand or category' class='form-control'>
        </div>
        <input class ="btn btn-success" type='submit' value='Search'>
    </form>
    <form action="{{route('products/stocktransfer/finalize')}}" method='GET' name='productlist'>
    <h1>Products Stock Transfer</h1>
    {{csrf_field()}}
        <table class='table table-bordered'>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Transfer Quantity</th>
            @foreach($productDetails as $product)
                <tr>
                    <td>{{$product->p_id}}</td>
                    <td>{{$product->name}}</td>
                    <td><img width="30px" height="60px" src="{{asset($product->image)}}"></td>
                    <td>{{$product->category}}</td>
                    <td>{{$product->brand}}</td>
                    <td>{{$product->model}}</td>
                    <td>{{$product->price}}</td>
                    <td>{{$product->stock}}</td>
                    <td><input type='number' name='{{$product->p_id}}'></td>
                </tr>
            @endforeach
        </table>
        <div class='col-md-2 form-group'>
            <span>Outlet</span>
            <select name='outlet' class='form-control'>
                <option value='choose an outlet' hidden>choose an outlet</option>
                @foreach($outlets as $outlet)
                    <option value = '{{$outlet->name}}'>{{$outlet->name}}</option>
                @endforeach
            </select>
            @error('outlet')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>
        <br>
        <input class ="btn btn-success" type='submit' value='Transfer'>
    </form>
@endsection