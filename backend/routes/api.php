<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/user/login',[LoginController::class, 'login']);
Route::post('/user/logout',[LoginController::class, 'logout']);

Route::middleware('ValidUser')->group(function(){
Route::get('/dashboard', [DashboardController::class, 'dashboard']);
    
Route::get('/purchaseid', [ProductsController::class, 'purchaseID']);
Route::get('/tempproducts', [ProductsController::class, 'tempProducts']);
Route::post('/tempproducts/changequantity',[ProductsController::class,'tempChangeQuantity']);
Route::delete('/tempproducts/delete/{id}', [ProductsController::class, 'tempProductDelete']);
Route::post('/tempproducts/add', [ProductsController::class, 'tempAddAction']);

Route::post('/tempproducts/purchase', [ProductsController::class, 'purchase']);
Route::get('/products',[ProductsController::class, 'productList']);
Route::post('/products',[ProductsController::class, 'searchProductList']);
Route::get('/products/edit/{id}', [ProductsController::class, 'productEdit']);
Route::post('/products/edit', [ProductsController::class, 'productEditAction']);
Route::delete('/products/delete/{id}',[ProductsController::class,'productDelete']);
Route::post('/products/addstock', [ProductsController::class, 'addStock']);
Route::post('/products/stockpurchase',[ProductsController::class, 'stockPurchase']);

Route::get('/products/purchasedhistory',[ProductsController::class, 'purchasedHistory']);
Route::delete('/products/purchasedhistory/delete/{id}',[ProductsController::class, 'purchasedHistoryDelete']);
Route::get('/products/purchasedhistory/details/{id}',[productsController::class, 'purchasedHistoryDetails']);
Route::post('/products/purchasedhistory/results',[ProductsController::class, 'purchasedHistoryByDate']);
Route::post('/products/purchasedhistory',[ProductsController::class, 'searchPurchasedHistory']);

Route::get('/products/purchaseddue',[ProductsController::class, 'purchasedDue']);
Route::post('/products/purchaseddue/results',[ProductsController::class, 'purchaseddueByDate']);
Route::post('/products/purchaseddue/payment',[ProductsController::class, 'clearDue']);
Route::post('/products/purchaseddue',[ProductsController::class, 'searchPurchasedDue']);

Route::post('/outlets/add',[ProductsController::class, 'outletsAdd']);
Route::get('/outlets',[ProductsController::class, 'outlets']);
Route::delete('/outlets/delete/{id}',[ProductsController::class, 'outletsDelete']);

Route::post('/outlets/stocktransfer',[ProductsController::class, 'stockTransfer']);
Route::get('/outlets/stocktransfer/history',[ProductsController::class, 'stockTrfHistory']);
Route::delete('/outlets/stocktransfer/history/delete/{id}',[ProductsController::class, 'stockTrfHistoryDelete']);
Route::post('/outlets/stocktransfer/history/results',[ProductsController::class, 'stockTrfHistoryByDate']);
Route::post('/outlets/stocktransfer/history',[ProductsController::class, 'searchStockTrfHistory']);

Route::post('/products/categories/add',[ProductsController::class, 'categoriesAdd']);
Route::get('/products/categories',[ProductsController::class, 'categories']);
Route::delete('/products/categories/delete/{id}',[ProductsController::class, 'categoriesDelete']);
});