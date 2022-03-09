<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use App\Models\ProductCategories;
use App\Models\ProductList;
use App\Models\ProductTemp;
use App\Models\ProductPurchase;
use App\Models\ProductPurchaseDetails;
use App\Models\Outlets;
use App\Models\StockTransferred;

class ProductsController extends Controller
{

    ////////////////////////////////#tempproducts-start#//////////////////////////////////////

    public function purchaseID()
    {
        $productPurchase = ProductPurchase::all();
        if($productPurchase->isEmpty())
        {
           $purchaseId = 1;
        }

        else
        {
            $latestReport = ProductPurchase::OrderBy('id','DESC')->first();
            $purchaseId = $latestReport->purchase_id + 1;
        }

        return $purchaseId;
        
    }

    public function tempProducts()
    {
        $tempProducts = ProductTemp::all();
        return $tempProducts;
    }

    public function tempProductDelete(Request $request)
    {
        ProductTemp::where('id',$request->id)->delete();
        $tempProducts = ProductTemp::all();
        return $tempProducts;
    }


    public function tempAddAction(Request $request)
    {
        /*$this->validate(
            $request,
            [

                'name'=>'required|min:2|max:30|regex:/^[A-Za-z)\s\0-9]+$/',
                'image'=>'required|mimes:png,jpg|max:2048',
                'category'=>'exists:product_categories',
                //or we can use 'category'=>'required|not_in:choose an option',
                'brand'=>'required|max:30|regex:/^[A-Za-z)\s\0-9]+$/',
                'model'=>'required|max:30|regex:/^[A-Za-z)\s\0-9]+$/',
                'weight'=>'required',
                'price'=>'required|regex:/^[(0-9).]+$/',
                'quantity'=>'required|regex:/^[(0-9)]+$/',
            ],
            [
                //'category.exists'=>'Please Choose an option'
            ]
        );*/

        if($request->hasFile('image'))
        {
            $name = time()."_".$request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('uploads',$name,'public');
            
        }

        
    
        $var1 = new ProductTemp;
        $var1->name = $request->name;
        $var1->image = 'storage/uploads/'.$name;
        $var1->category = $request->category;
        $var1->brand = $request->brand;
        $var1->model = $request->model;
        $var1->weight = $request->weight;
        $var1->price = $request->price;
        $var1->quantity = $request->quantity;
        $var1->amount = $request->amount;
        $var1->save();

        $tempProducts = ProductTemp::all();
       

        return $tempProducts;
    }

    public function tempChangeQuantity(Request $request)
    {
        $product = ProductTemp::all();
        foreach($product as $p)
        {
            $id = $p->id;
            if($request->$id!=null)
            {
                $productTemp = ProductTemp::where('id',$id)->first();
                $productTemp->quantity = $productTemp->quantity + $request->$id;
                $productTemp->amount = ($productTemp->price * $productTemp->quantity);
                $productTemp->save();

            }
        }

        $tempProducts = ProductTemp::all();
        
        return $tempProducts;

    }


    public function purchase(Request $request)
    {
        // $this->validate(
        //     $request,
        //     [
        //         'supplierName'=>'required|max:30|regex:/^[A-Za-z\s]+$/',
        //         'supplierPhone'=>'required|max:15|regex:/^[+\-\s\0-9]+$/',
        //         'paymentAmount'=>'required',
        //     ]
        // );
        $productTemp = ProductTemp::all();

        $latestProduct = ProductList::OrderBy('id','DESC')->first();
        $Id = $latestProduct->p_id + 1;
        foreach($productTemp as $pt)
        {
            $productList = new ProductList;
            $productList->p_id = $Id;
            $productList->name = $pt->name;
            $productList->image = $pt->image;
            $productList->category = $pt->category;
            $productList->brand = $pt->brand;
            $productList->model = $pt->model;
            $productList->weight = $pt->weight;
            $productList->price = $pt->price;
            $productList->stock = $pt->quantity;
            $productList->save();

            $productPurchaseDetails = new ProductPurchaseDetails;
            $productPurchaseDetails->purchase_id = $request->purchaseId;
            $productPurchaseDetails->p_id = $Id;
            $productPurchaseDetails->name = $pt->name;
            $productPurchaseDetails->image = $pt->image;
            $productPurchaseDetails->category = $pt->category;
            $productPurchaseDetails->brand = $pt->brand;
            $productPurchaseDetails->model = $pt->model;
            $productPurchaseDetails->weight = $pt->weight;
            $productPurchaseDetails->price = $pt->price;
            $productPurchaseDetails->quantity = $pt->quantity;
            $productPurchaseDetails->save();

            $Id= $Id+1;
        }
                    
        $productPurchase = new ProductPurchase;
        $productPurchase->purchase_id = $request->purchaseId;
        $productPurchase->supplierName = $request->supplierName;
        $productPurchase->supplierPhone = $request->supplierPhone;
        $productPurchase->total_amount=$request->totalAmount;
        $productPurchase->payment_amount=$request->paymentAmount;
        $productPurchase->due_amount=$request->dueAmount;
        $productPurchase->save();

        ProductTemp::truncate();

        $tempProducts = ProductTemp::all();

        return $tempProducts;
    }

    ////////////////////////////////#tempproducts-end#//////////////////////////////////////

    //#ProductList
    public function productList(Request $request)
    {
        $products = ProductList::all();
        return $products;
    }

    public function searchProductList(Request $request)
    {
        if(!$request->content){
            $products = ProductList::all();
            return $products;
        }
        else{
            $products = ProductList::where($request->searchBy,'LIKE',"%$request->content%")->get();
            return $products;
        }
    }

    public function productEdit(Request $request)
    {
        $product = ProductList::where('p_id',$request->id)->first();
        return $product;
    }

    public function ProductEditAction(Request $request)
    {
        // $this->validate(
        //     $request,
        //     [
        //         'name'=>'required|max:30|regex:/^[A-Za-z)\s\0-9]+$/',
        //         'model'=>'required|max:30|regex:/^[A-Za-z)\s\0-9]+$/',
        //         'price'=>'required|regex:/^[(0-9).]+$/'
        //     ],
        // );
        
        $product = ProductList::where('p_id',$request->p_id)->first();
        $product->name = $request->name;
        // if($request->hasFile('image'))
        // {
        //     $name = time()."_".$request->file('image')->getClientOriginalName();
        //     $request->file('image')->storeAs('uploads',$name,'public');
        //     $product->image = 'storage/uploads/'.$name;
        // }
        $product->model = $request->model;
        $product->weight = $request->weight;
        $product->price = $request->price;
        $product->save();

        return 'successfully updated';
    }


    //#ProductDelete
    public function productDelete(Request $request)
    {
        
        ProductList::where('p_id',$request->id)->delete();
        $products = ProductList::all();
        return $products;

    }

    public function addStock(Request $request)
    {
        $products = ProductList::all();
        $totalAmount = 0;

            foreach($products as $p)
            {    
                $id = $p->p_id;
                if($request->$id >0)
                {
                    $productList = ProductList::where('p_id',$id)->first();
                    $totalAmount = $totalAmount+($productList->price * $request->$id);
                }
                
            }

            return $totalAmount;
    }

    public function stockPurchase(Request $request)
    {
        // $this->validate(
        //     $request,
        //     [
        //         'paymentAmount'=>'required',
        //         'supplierName'=>'required|max:30|regex:/^[A-Za-z\s]+$/',
        //         'supplierPhone'=>'required|max:15|regex:/^[+\-\s\0-9]+$/',
        //     ]
        // );
        
        $products = ProductList::all();

        foreach($products as $p)
        {
            $id = $p->p_id;
            if($request->$id >0)
            {
                $productList = ProductList::where('p_id',$id)->first();
                $productList->stock = $productList->stock + $request->$id;
                $productList->save();

                $productPurchaseDetails = new ProductPurchaseDetails;
                $productPurchaseDetails->purchase_id = $request->purchaseId;
                $productPurchaseDetails->p_id = $productList->p_id;
                $productPurchaseDetails->name = $productList->name;
                $productPurchaseDetails->image = $productList->image;
                $productPurchaseDetails->category = $productList->category;
                $productPurchaseDetails->brand = $productList->brand;
                $productPurchaseDetails->model = $productList->model;
                $productPurchaseDetails->weight = $productList->weight;
                $productPurchaseDetails->price = $productList->price;
                $productPurchaseDetails->quantity = $request->$id;
                $productPurchaseDetails->save();

            }
        }

        $productPurchase = new ProductPurchase;
        $productPurchase->purchase_id = $request->purchaseId;
        $productPurchase->supplierName = $request->supplierName;
        $productPurchase->supplierPhone = $request->supplierPhone;
        $productPurchase->total_amount=$request->totalAmount;
        $productPurchase->payment_amount=$request->paymentAmount;
        $productPurchase->due_amount=$request->dueAmount;
        $productPurchase->save();

        $products = ProductList::all();

        return $products;
    }


    ///////////////////////////////#purchase-start#///////////////////////////
    public function purchasedHistory(Request $request)
    {
        $purchaseHistory = ProductPurchase::all();
        return $purchaseHistory;
    }

    public function searchPurchasedHistory(Request $request)
    {
        if(!$request->content){
            $products = ProductPurchase::all();
            return $products;
        }
        else{
            $products = ProductPurchase::where($request->searchBy,'LIKE',"%$request->content%")->get();
            return $products;
        }
    }

    public function purchasedHistoryDelete(Request $request)
    {
        ProductPurchase::where('purchase_id',$request->id)->delete();
        ProductPurchaseDetails::where('purchase_id',$request->id)->delete();
        $purchaseHistory = ProductPurchase::all();
        return $purchaseHistory;
    }

    public function purchasedHistoryDetails(Request $request)
    {
        $id = $request->id;
        $history=ProductPurchase::where('purchase_id',$id)->first();
        return $history->details;
    }

    public function purchasedHistoryByDate(Request $request)
    {
        $history = ProductPurchase::whereBetween('created_at',[$request->startDate, $request->endDate])->get();
        return $history;
    }
    ///////////////////////////////#purchase-end#///////////////////////////

    ///////////////////////////////#due-start#///////////////////////////
    public function purchasedDue(Request $request)
    {
        $duelist = ProductPurchase::where('due_amount','>',0)->get();
        return $duelist;
    }

    public function searchPurchasedDue(Request $request)
    {
        if(!$request->content){
            $duelist = ProductPurchase::where('due_amount','>',0)->get();
            return $duelist;
        }
        else{
            $duelist = ProductPurchase::where('due_amount','>',0)
            ->where($request->searchBy,'LIKE',"%$request->content%")->get();
            return $duelist;
        }
    }

    public function purchasedDueByDate(Request $request)
    {
        $history = ProductPurchase::where('due_amount','>',0)
        ->whereBetween('created_at',[$request->startDate, $request->endDate])->get();
        return $history;
    }

    public function clearDue(Request $request)
    {
        $duelist = ProductPurchase::where('due_amount','>',0)->get();

        foreach($duelist as $d)
        {
            $id = $d->purchase_id;
            if($request->$id >0 && $request->$id <= $d->total_amount)
            {
                $purchase = ProductPurchase::where('purchase_id',$id)->first();
                $purchase->payment_amount = $purchase->payment_amount + $request->$id;
                $purchase->due_amount = $purchase->total_amount - ($purchase->payment_amount);
                $purchase->save();

            }
        }
        $duelist = ProductPurchase::where('due_amount','>',0)->get();
        
        return $duelist;
    }

    ///////////////////////////////#due-end#///////////////////////////

    //////////////////////////////#outlets-start#///////////////////////////

    public function outletsAdd(Request $request)
    {
        // $this->validate(
        //     $request,
        //     [
        //         'name'=>'required|unique:outlets|regex:/^[a-zA-Z\s]+$/',
        //         'address'=>'required|unique:outlets|max:50'
        //     ],
        //     [

        //         'name.unique' => 'This outlet name is already exist',
        //         'address.unique' => 'This outlet address is already exist'
        //     ]
        // );
        $outlets = new Outlets;
        $outlets->name = $request->name;
        $outlets->address = $request->address;
        $outlets->save();

        $outlets = Outlets::all();
        return $outlets;
    }

    public function outlets()
    {
        $outlets = Outlets::all();
        return $outlets;
    }

    public function outletsDelete(Request $request)
    {
        Outlets::where('id',$request->id)->delete();
        $outlets = Outlets::all();
        return $outlets;
    }

    //////////////////////////////#outlets-end#///////////////////////////

     ///////////////////////////////#stocktransfer-start#///////////////////////////
     public function stockTransfer(Request $request)
     {
     //     $this->validate(
     //         $request,
     //         [
     //             'outlet'=>'exists:outlets,name',
     //         ],
     //         [
     //             'outlet.exists'=>'Please Choose an outlet'
     //         ]
     //     );
 
         $products = ProductList::all();
 
         foreach($products as $p)
         {
             $id = $p->p_id;
             if($request->$id >0 && $request->$id <= $p->stock)
             {
                 $product = ProductList::where('p_id',$id)->first();
                 $product->stock = $product->stock - $request->$id;
                 $product->save();
 
                 $stockTransferred = new StockTransferred;
                 $stockTransferred->p_id = $product->p_id;
                 $stockTransferred->name = $product->name;
                 $stockTransferred->image = $product->image;
                 $stockTransferred->category = $product->category;
                 $stockTransferred->brand = $product->brand;
                 $stockTransferred->model = $product->model;
                 $stockTransferred->weight = $product->weight;
                 $stockTransferred->price = $product->price;
                 $stockTransferred->quantity = $request->$id;
                 $stockTransferred->outlet = $request->name;
                 $stockTransferred->save();
 
             }
         }
         $products = ProductList::all();
         return $products;
     }
     
     public function stockTrfHistory(Request $request)
     {
         $stockTrfHistory = StockTransferred::all();
         return $stockTrfHistory;
     }
 
     public function searchStockTrfHistory(Request $request)
     {
         if(!$request->content){
             $stockTrfHistory = StockTransferred::all();
             return $stockTrfHistory;
         }
         else{
             $stockTrfHistory = StockTransferred::where($request->searchBy,'LIKE',"%$request->content%")->get();
             return $stockTrfHistory;
         }
     }
 
     public function stockTrfHistoryDelete(Request $request)
     {
         StockTransferred::where('id',$request->id)->delete();
         $purchaseHistory = StockTransferred::all();
         return $purchaseHistory;
     }
 
     public function stockTrfHistoryByDate(Request $request)
     {
         $history = StockTransferred::whereBetween('created_at',[$request->startDate, $request->endDate])->get();
         return $history;
     }
     ///////////////////////////////#stocktransfer-end#///////////////////////////

     ///////////////////////////////#categories-start#///////////////////////////

     public function categories(Request $request)
    {
        $productCategories = ProductCategories::all();
        return $productCategories;
    }

    public function categoriesAdd(Request $request)
    {
        // $this->validate(
        //     $request,
        //     [
        //         'category'=>'required|unique:product_categories|regex:/^[a-zA-Z\s]+$/'
        //     ],
        //     [

        //         'category.unique' => 'This Category is already exist'
        //     ]
        // );
        $productCategories = new ProductCategories;
        $productCategories->category = $request->category;
        $productCategories->save();

        $productCategories = ProductCategories::all();
        return $productCategories;
    }

    public function categoriesDelete(Request $request)
    {
        ProductCategories::where('id',$request->id)->delete();

        $productCategories = ProductCategories::all();
        return $productCategories;
    }

     ///////////////////////////////#categories-end#///////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    public function stockTransferred(Request $request)
    {
        $search=$request->search;
        if(empty($search))
        {
            $stockTransferred = StockTransferred::all();
            return view('Pages.Products.StockTransferredList')->with('transferredList',$stockTransferred);
        }
        else
        {
            $stockTransferred = StockTransferred::where('name','LIKE',"%$search%")
            ->orwhere('outlet','LIKE',"%$search%")
            ->orwhere('created_at','LIKE',"%$search%")->get();
            return view('Pages.Products.StockTransferredList')->with('transferredList',$stockTransferred);
        }
    }

    public function stockTransferredDelete(Request $request)
    {
        StockTransferred::where('p_id',$request->id)->delete();
        return back();
    }

    public function updateProductList(Request $request)
    {
        $search = $request->text;

        if(empty($search))
        {
            $productDetails = ProductList::all();
            return view('Pages.Products.UpdateList')->with('productDetails',$productDetails);
        }
        else
        {
            $productDetails = ProductList::where('name','LIKE',"%$search%")
            ->orwhere('brand','LIKE',"%$search%")
            ->orwhere('category','LIKE',"%$search%")->get();
            return view('Pages.Products.UpdateList')->with('productDetails',$productDetails);
        }
    }
}