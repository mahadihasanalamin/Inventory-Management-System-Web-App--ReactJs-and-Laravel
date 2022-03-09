@extends('Layouts.App')
@section('content')
<form method="get" action="{{route('products/stocktransferred/search')}}">
        <br>
        <div class = 'col-md-4 form-group'>
            <input type='search' name='search'  placeholder='search by product name or outlet or date' class='form-control'>
        </div>
        <input class ="btn btn-success" type='submit' value='Search'>
    </form>
    <h1>Transferrd Product List</h1>
        <table class='table table-bordered'>
            <th>Date</th>
            <th>Outlet</th>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Model</th>
            <th>quantity</th>
            <th>Delete</th>
            @foreach($transferredList as $product)
                <tr>
                    <td>{{$product->created_at}}</td>
                    <td>{{$product->outlet}}</td>
                    <td>{{$product->p_id}}</td>
                    <td>{{$product->name}}</td>
                    <td><img width="30px" height="60px" src="{{asset($product->image)}}"></td>
                    <td>{{$product->model}}</td>
                    <td>{{$product->quantity}}</td>
                    <td><a class ="btn btn-danger" href="/products/stocktransferred/delete/{{$product->p_id}}">Delete</a></td>
                </tr>
            @endforeach
        </table>
@endsection