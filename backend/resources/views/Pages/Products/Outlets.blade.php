@extends('Layouts.App')
@section('content')
    <form action="{{route('outlets')}}" method="POST">
    <h1>Outlets</h1>
    <br>
    {{csrf_field()}}
        <div class = 'col-md-2 form-group'>
            <span>Outlet Name</span>
            <input type='text' name='name'  value ="{{old('name')}}" class='form-control'>
            @error('name')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>

        <div class = 'col-md-2 form-group'>
            <span>Outlet Address</span>
            <input type='text' name='address'  value ="{{old('address')}}" class='form-control'>
            @error('address')
                <span class='text-danger'>{{$message}}</span>
            @enderror
        </div>
        <input type='submit' name ='submit' value='Add' class='btn btn-success'>
    </form>
    <br>
    <h3>Outlet List<h3>
    <table class='table table-bordered col-md-2'>
        <th>Outlet Name</th>
        <th>Outlet Address</th>
        <th>Delete</th>
        @foreach($outlets as $outlet)
            <tr>
                <td>{{$outlet->name}}</td>
                <td>{{$outlet->address}}</td>
                <td><a class='btn btn-danger' href='/outlets/delete/{{$outlet->id}}'>Delete</a></td>
            </tr>
        @endforeach
    </table>
@endsection