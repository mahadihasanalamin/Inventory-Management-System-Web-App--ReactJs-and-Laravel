<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductPurchaseDetails;

class ProductPurchase extends Model
{
    use HasFactory;
    protected $table = 'product_purchase';

    public function details()
    {
        return $this->hasMany(ProductPurchaseDetails::class,'purchase_id','purchase_id');
    }
}
