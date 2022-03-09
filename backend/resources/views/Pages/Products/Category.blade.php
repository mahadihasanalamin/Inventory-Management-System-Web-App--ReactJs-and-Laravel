@extends('Layouts.App')
@section('content')
    <form action="{{route('products/categories')}}" method="POST">
    <h1>Products Categories</h1>
    {{csrf_field()}}
        <div class = 'col-md-2 form-group'>
            <span>Category Name</span>
            <input type='text' name='category' class='form-control'>
            @error('category')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>
        <input type='submit' name ='submit' value='Add' class='btn btn-success'>
    </form>

    <table class='table table-bordered col-md-2'>
        <th>Category</th>
        <th>Delete</th>
        @foreach($productCategories as $productCategory)
            <tr>
                <td>{{$productCategory->category}}</td>
                <td><a class='btn btn-danger' href='/products/categories/delete/{{$productCategory->id}}'>Delete</a></td>
            </tr>
        @endforeach
    </table>
@endsection