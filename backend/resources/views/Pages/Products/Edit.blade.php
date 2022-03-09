@extends('Layouts.App')
@section('content')
<form enctype= "multipart/form-data" action="{{route('products/edit')}}" method='POST'>
        {{csrf_field()}}
        <input type='hidden' name='id' value="{{$product->id}}">

        <div class='col-md-2 form-group'>
            <span>ID</span>
            <input type='text' name='p_id' value="{{$product->p_id}}" class='form-control' readonly>
        </div>

        <div class='col-md-2 form-group'>
            <span>Name</span>
            <input type='text' name='name' value="{{$product->name}}" class='form-control'>
            @error('name')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class='col-md-2 form-group'>
            <span>Image</span>
            <input type="file" accept="image, image/jpeg, image/png" name="image" src="{{asset($product->image)}}" class="form-control">
            <img type="file" width="30px" height="300px" accept="image, image/jpeg, image/png" name="image" src="{{asset($product->image)}}" class="form-control">
            @error('image')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class='col-md-2 form-group'>
            <span>Category</span>
            <input type='text' name='category' value="{{$product->category}}" class='form-control' readonly>
        </div>

        <div class='col-md-2 form-group'>
            <span>Brand</span>
            <input type='text' name='brand' value="{{$product->brand}}" class='form-control' readonly>
        </div>

        <div class='col-md-2 form-group'>
            <span>Model</span>
            <input type='text' name='model' value="{{$product->model}}" class='form-control'>
            @error('model')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class='col-md-2 form-group'>
            <span>Weight</span>
            <input type='text' name='weight' value="{{$product->weight}}" class='form-control' readonly>
        </div>

        <div class='col-md-2 form-group'>
            <span>Price</span>
            <input type='text' name='price' value="{{$product->price}}" class='form-control'>
            @error('price')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <input type='submit' name='submit' value='Update' class='btn btn-success'>
    </form>
@endsection