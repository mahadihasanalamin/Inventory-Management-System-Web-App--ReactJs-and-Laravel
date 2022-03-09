function calculateAmount(product){
    var price = product.price.value;
    var quantity = product.quantity.value;

    product.amount.value = price * quantity;
}

function calculateNewAmount(product){
    var price = Number(product.price.value);
    var quantity = Number(product.changequantity.value);
    var qty = Number(product.quantity.value);
    var amount = Number(product.amount.value);
    var action = product.action.value;

    if(quantity<=0){
        product.changequantity.value =null;
        product.newamount.value = null;
        product.newquantity.value = null;
    }
    else{
        if(action=='Add')
        {
            product.newamount.value = amount+(price * quantity);
            product.newquantity.value = qty+quantity;
        }
        else{
            if(quantity<qty)
            {
                product.newamount.value = amount-(price * quantity);
                product.newquantity.value = qty-quantity;
                
            }
            else{
                product.changequantity.value =null;
            }  
        }
    }

}

function calculateDueAmount(productPurchase){
    var totalAmount = Number(productPurchase.totalAmount.value);
    var paymentAmount = Number(productPurchase.paymentAmount.value);
    var dueAmount = Number(productPurchase.dueAmount.value);

    if(paymentAmount<=0 || paymentAmount>totalAmount)
    {
        productPurchase.paymentAmount.value = null;
        productPurchase.dueAmount.value = null;
    }
    else
    {
        productPurchase.dueAmount.value = totalAmount-paymentAmount;
    }
}