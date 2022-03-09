@extends('Layouts.App')
@section('content')
    <form method="get" action="{{route('products/search')}}">
        <br>
        <div class = 'col-md-4 form-group'>
            <input type='search' name='search'  placeholder='search by name or brand or category' onkeyup = 'refreshProductList(this.value)'  class='form-control'>
        </div>
        <input class ="btn btn-success" type='submit' value='Search'>
    </form>
    <form action="{{route('products/addstock/process')}}" method='GET' name='productlist'>
    <h1>Product List</h1>
    {{csrf_field()}}
        <table class='table table-bordered' id='ProductList'>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Add Stock</th>
            <th>Edit</th>
            <th>Delete</th>
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
                    <td><a class ="btn btn-success" href="/products/edit/{{$product->p_id}}">Edit</a></td>
                    <td><a class ="btn btn-danger" href="/products/delete/{{$product->p_id}}">Delete</a></td>
                </tr>
            @endforeach
        </table>
        <input class ="btn btn-success" type='submit' value='Process'>
    </form>
@endsection