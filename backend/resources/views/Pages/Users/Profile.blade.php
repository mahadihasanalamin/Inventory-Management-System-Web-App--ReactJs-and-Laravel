@extends('Layouts.App')
@section('content')
    <table class='table table-bordered'>
        <tr>
            <th>Name</th>
            <th>{{session('user')->name}}</th>
        </tr>
        <tr>
            <th>Date of Birth</th>
            <th>{{session('user')->dob}}</th>
        </tr>
        <tr>
            <th>Phone</th>
            <th>{{session('user')->phone}}</th>
        </tr>
        <tr>
            <th>Email</th>
            <th>{{session('user')->email}}</th>
        </tr>
        <tr>
            <th>Address</th>
            <th>{{session('user')->address}}</th>
        </tr>       
    </table>
@endsection