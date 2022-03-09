<html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    </head>
    <body>
        <div class = 'container'>
            <form action = "{{route('user/login')}}" method = 'POST'>
                {{csrf_field()}}
                <h1>Login</h1>
                @if(Session::has('fail'))
                    <div class = 'col-md-2 alert alert-danger'>{{Session('fail')}}</div>
                @endif
                <div class = 'col-md-2 form-group'>
                    <span>Phone</span>
                    <input type = 'text' name = 'phone' value = "{{old('phone')}}" class = 'form-control'>
                    @error('phone')
                        <span class = 'text-danger'>{{$message}}</span>
                    @enderror
                </div>
                <div class = 'col-md-2 form-group'>
                    <span>Password</span>
                    <input type = 'password' name = 'password' value = "{{old('password')}}" class = 'form-control'>
                    @error('password')
                        <span class = 'text-danger'>{{$message}}</span>
                    @enderror
                </div>
                <input type = 'submit' value = 'Login' class = 'btn btn-success'>
            </form>
        </div>
    </body>
</html>