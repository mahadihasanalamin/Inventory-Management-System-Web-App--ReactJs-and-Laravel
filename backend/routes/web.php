<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserProfileController;

Route::middleware('ValidUser')->group(function(){
    Route::get('/', [DashboardController::class, 'dashboard'])->name('dashboard');

    Route::get('/products/add', [ProductsController::class, 'add'])->name('products/add');
    Route::get('/products', [ProductsController::class, 'list'])->name('products');
    Route::get('/products/categories', [ProductsController::class, 'category'])->name('products/categories');
    Route::get('/products/edit/{id}',[ProductsController::class,'edit'])->name('products/edit');
    Route::get('/products/delete/{id}',[ProductsController::class,'delete'])->name('products/delete');
    Route::get('/products/temp/delete/{p_id}',[ProductsController::class,'tempdelete']);
    Route::get('/products/purchasereport', [ProductsController::class, 'purchaseReport'])->name('products/purchasereport');
    Route::get('/products/purchaseReport/details/{id}', [ProductsController::class, 'purchaseReportDetails']);
    Route::get('/products/purchaseReport/delete/{id}', [ProductsController::class, 'purchaseReportDelete']);
    Route::get('/products/temp/changequantity',[ProductsController::class,'changequantity'])->name('products/temp/changequantity');
    Route::get('/products/categories/delete/{id}', [ProductsController::class, 'categoryDelete']);
    Route::get('/products/addstock/process',[ProductsController::class,'addStock'])->name('products/addstock/process');
    Route::get('/products/addStock/finalize',[ProductsController::class,'addStockAction'])->name('products/addStock/finalize');
    Route::get('/products/addstock/process',[ProductsController::class,'addStock'])->name('products/addstock/process');
    Route::get('/products/addStock/finalize',[ProductsController::class,'addStockAction'])->name('products/addStock/finalize');
    Route::get('/products/purchasedue',[ProductsController::class, 'purchaseDue'])->name('products/purchasedue');
    Route::get('/products/purchasedue/payment',[ProductsController::class, 'purchaseDuePay'])->name('products/purchasedue/payment');
    Route::get('/products/stocktransfer',[ProductsController::class, 'stockTransfer'])->name('products/stocktransfer');
    Route::get('/products/stocktransfer/finalize',[ProductsController::class, 'stockTransferAction'])->name('products/stocktransfer/finalize');
    Route::get('/products/stocktransferred',[ProductsController::class, 'stockTransferred'])->name('products/stocktransferred');
    Route::get('/products/stocktransferred/delete/{id}',[ProductsController::class,'stockTransferredDelete'])->name('products/stocktransferred/delete');
    Route::get('/outlets',[ProductsController::class, 'outlets'])->name('outlets');
    Route::get('/outlets/delete/{id}',[ProductsController::class, 'outletsDelete'])->name('outlets/delete');
    
    Route::get('/products/search',[ProductsController::class, 'list'])->name('products/search');
    Route::get('/products/stocktransfer/search',[ProductsController::class, 'stockTransfer'])->name('products/stocktransfer/search');
    Route::get('/products/stocktransferred/search',[ProductsController::class, 'stockTransferred'])->name('products/stocktransferred/search');
    Route::get('/products/purchasereport/search', [ProductsController::class, 'purchaseReport'])->name('products/purchasereport/search');
    Route::get('/products/updatelist',[ProductsController::class, 'updateProductList'])->name('products/updatelist');

    
    Route::post('/products/add', [ProductsController::class, 'addAction'])->name('products/add');
    Route::post('/products/edit',[ProductsController::class,'editAction'])->name('products/edit');
    Route::post('/products/purchase', [ProductsController::class, 'purchase'])->name('products/purchase');
    Route::post('/products/categories', [ProductsController::class, 'categoryAction'])->name('products/categories');
    Route::post('/outlets',[ProductsController::class, 'outletsAdd'])->name('outlets');
    Route::get('/user/profile',[UserProfileController::class, 'userProfile'])->name('user/profile');
});


Route::get('/user/login',[LoginController::class, 'login'])->name('user/login');
Route::post('/user/login',[LoginController::class, 'loginAction'])->name('user/login');
Route::get('/user/logout',[LoginController::class, 'logout'])->name('user/logout');
