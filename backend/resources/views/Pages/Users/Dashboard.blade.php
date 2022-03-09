@extends('Layouts.App')
@section('content')
    <h4>Hello, {{session('user')->name}}</h4>
    <h5>Reports of last 7 days:</h5>
    <p>Total Purchase: {{$totalpurchase}}</p>
    <p>Total Due: {{$totaldue}}</p>
    <p>Total Transferred Stock: {{$totalstock}}</p>
@endsection