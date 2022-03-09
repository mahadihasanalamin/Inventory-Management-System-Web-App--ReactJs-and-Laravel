function refreshProductList(str)
{
    var xhttp = new XMLHttpRequest;
    xhttp.onload = function(){
        if (this.status == 200)
        {
            document.getElementById('ProductList').innerHTML = this.responseText;
        }
    }
    xhttp.open('GET','products/updatelist?text='+str,true);
    xhttp.send();
}