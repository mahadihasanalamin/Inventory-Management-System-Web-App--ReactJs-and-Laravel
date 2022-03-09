@extends('Layouts.app')
@section('content')
    <form action="{{route('products/addStock/finalize')}}" name='productStock' method='get'>
    <h1>Make Payment</h1>
        {{csrf_field()}}

        <div class='col-md-2 form-group'>
            <input type='text' name='purchaseId' value="{{$purchase_id}}" class='form-control' hidden>
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
            <input type='text' name='totalAmount' value='{{$totalAmount}}' class='form-control' readonly>
        </div>

        <div class='col-md-2 form-group'>
            <span>Payment Amount</span>
            <input type='text' name='paymentAmount' onkeyup='calculateDueAmount(productStock)' class='form-control'>
            @error('paymentAmount')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class='col-md-2 form-group'>
            <span>Due Amount</span>
            <input type='text' name='dueAmount' class='form-control' readonly>
        </div>

        <input type='submit' name='submit' value='Confirm' class='btn btn-success'>
    </form>
    
@endsection