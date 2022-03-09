<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductPurchase;
use App\Models\StockTransferred;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $purchaselist = ProductPurchase::all();

        $date=Carbon::now();
        $date1=Carbon::now()->subDay(7);

        $totalpurchase = 0;
        $totaldue = 0;
        $startdate = $date->toDateTimeString();
        $lastdate = $date1->toDateTimeString();
        $purchaselist = ProductPurchase::where("created_at",'<=',$startdate)
        ->where("created_at",'>=',$lastdate)->get();

        foreach($purchaselist as $purchase)
        {
            $totalpurchase = $totalpurchase + $purchase->total_amount;
            $totaldue = $totaldue + $purchase->due_amount;
        }

        $stocktransferredlist = StockTransferred::where('created_at','<=',"$startdate")
        ->where('created_at','>=',"$lastdate")->get();
        $totalstock = 0;

        foreach($stocktransferredlist as $stocktransferred)
        {
            $totalstock = $totalstock + $stocktransferred->quantity;
        }

        $values= array('totalPurchase'=>$totalpurchase, 'totalDue'=>$totaldue, 'totalStock'=>$totalstock);

        return (object)$values;

    }
}
