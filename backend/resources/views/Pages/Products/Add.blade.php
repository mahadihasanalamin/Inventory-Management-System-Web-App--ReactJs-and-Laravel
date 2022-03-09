@extends('Layouts.App')
@section('content')
    <form enctype= "multipart/form-data" action="{{route('products/add')}}" name= 'product' method='POST'>
        {{csrf_field()}}
        <h1>Add Product</h1>
       <div class='col-md-2 form-group'>
            <span>ID</span>
            <input type='text' name='p_id' value="{{$id}}" class='form-control' readonly>
            @error('p_id')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>
        
        <div class='col-md-2 form-group'>
            <span>Name</span>
            <input type='text' name='name' value="{{old('name')}}" class='form-control'>
            @error('name')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class='col-md-2 form-group'>
            <span>Image</span>
            <input type="file" accept="image, image/jpeg, image/png" name="image" value="{{old('image')}}" class="form-control">
            @error('image')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class='col-md-2 form-group'>
            <span>Category</span>
            <select name='category' class='form-control'>
                @if(!empty(old('category')))
                <option value="{{old('category')}}" hidden>{{old('category')}}</option>
                @endif
                <option value='choose an option' hidden>choose an option</option>
                @foreach($productCategories as $productCategory)
                    <option value = '{{$productCategory->category}}'>{{$productCategory->category}}</option>
                @endforeach
            </select>
            @error('category')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class='col-md-2 form-group'>
            <span>Brand</span>
            <input type='text' name='brand' value="{{old('brand')}}" class='form-control'>
            @error('brand')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class='col-md-2 form-group'>
            <span>Model</span>
            <input type='text' name='model' value="{{old('model')}}" class='form-control'>
            @error('model')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class='col-md-2 form-group'>
            <span>Weight</span>
            <input type='text' name='weight' value="{{old('weight')}}" class='form-control'>
            @error('weight')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class='col-md-2 form-group'>
            <span>Price</span>
            <input type='text' name='price' value="{{old('price')}}" class='form-control'>
            @error('price')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>
        <div class='col-md-2 form-group'>
            <span>Quantity</span>
            <input type='text' name='quantity' value="{{old('quantity')}}" onkeyup='calculateAmount(product)' class='form-control'>
            @error('quantity')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class='col-md-2 form-group'>
            <span>Amount</span>
            <input type='text' name='amount' class='form-control' readonly>
            @error('amount')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <input type='submit' name='submit' value='Add' class='btn btn-success'>
    </form>
    <form action="{{route('products/temp/changequantity')}}" method='get'>
        <div>
    <table class='table table-hover text-right table-bordered'>
        <th>Name</th>
        <th>Image</th>
        <th>Category</th>
        <th>Brand</th>
        <th>Model</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Amount</th>
        <th>Delete</th>
        @foreach($productTemp as $product)
            <tr>
                <td>{{$product->name}}</td>
                <td><img width="30px" height="60px" src="{{asset($product->image)}}"></td>
                <td>{{$product->category}}</td>
                <td>{{$product->brand}}</td>
                <td>{{$product->model}}</td>
                <td>{{$product->price}}</td>
                <td><input type='number' name='{{$product->p_id}}' value='{{$product->quantity}}'></td>
                <td>{{$product->amount}}</td>
                <td><a class ="btn btn-danger" href="/products/temp/delete/{{$product->p_id}}">Delete</a></td>
            </tr>
        @endforeach
    </table>
    <input class ="btn btn-success" type='submit' value='Update'>
</div>
    </form>
    <br><br>
    @php
        $totalAmount=0;
        foreach($productTemp as $product)
        {
            $totalAmount=$totalAmount+$product->amount;
        }
    @endphp
    
    <form action="{{route('products/purchase')}}" name= 'productPurchase' method='POST'> 
    {{csrf_field()}}
        <br>
        <div>
        <div class='col-md-2 form-group'>
            <span>Purchase ID</span>
            <input type='text' name='purchaseId' value="{{$purchase_id}}" class='form-control' readonly>
        </div>

        <div class='col-md-2 form-group'>
            <span>Suppllier Name</span>
            <input type='text' name='supplierName' value="{{old('supplierName')}}" class='form-control'>
            @error('supplierName')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class='col-md-2 form-group'>
            <span>Suppllier Phone</span>
            <input type='text' name='supplierPhone' value="{{old('supplierPhone')}}" class='form-control'>
            @error('supplierPhone')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

       <div class='col-md-2 form-group'>
            <span>Total Amount</span>
            <input type='text' name='totalAmount' value="{{$totalAmount}}" class='form-control' readonly>
        </div>

        <div class='col-md-2 form-group'>
            <span>Payment Amount</span>
            <input type='text' name='paymentAmount' onkeyup='calculateDueAmount(productPurchase)' class='form-control'>
            @error('paymentAmount')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class='col-md-2 form-group'>
            <span>Due Amount</span>
            <input type='text' name='dueAmount' class='form-control' readonly>
        </div>
        <br>
        <input type='submit' name='save' value='Save' class='btn btn-success'>
        </div>
    </form>
@endsection