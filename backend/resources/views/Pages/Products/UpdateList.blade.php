<table class='table table-bordered'>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Add Stock</th>
            <th>Edit</th>
            <th>Delete</th>
            @foreach($productDetails as $product)
                <tr>
                    <td>{{$product->p_id}}</td>
                    <td>{{$product->name}}</td>
                    <td><img width="30px" height="60px" src="{{asset($product->image)}}"></td>
                    <td>{{$product->category}}</td>
                    <td>{{$product->brand}}</td>
                    <td>{{$product->model}}</td>
                    <td>{{$product->price}}</td>
                    <td>{{$product->stock}}</td>
                    <td><input type='number' name='{{$product->p_id}}'></td>
                    <td><a class ="btn btn-success" href="/products/edit/{{$product->p_id}}">Edit</a></td>
                    <td><a class ="btn btn-danger" href="/products/delete/{{$product->p_id}}">Delete</a></td>
                </tr>
            @endforeach
        </table>