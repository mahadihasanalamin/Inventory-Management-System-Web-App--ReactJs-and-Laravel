<html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    </head>
    <body>
        @include('Inc.topnav')
        <div>
            @yield('content')
            <script src="{{ asset('js/productsAdd.js')}}"></script>
            <script src="{{ asset('js/UpdateList.js')}}"></script>
        </div>
    </body>
</html>