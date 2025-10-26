<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * orders_page
     */
    public function orders_page(){
        try {
            $orders = Order::all();
            return Inertia::render('admin/orders/index', ['orders'=> $orders]);
        } catch (\Throwable $th) {
           return Inertia::render('admin/404');
        }
    }





    public function order_read($id){
        try {
            $ad = Order::findOrFail($id);
            $ad->isRead = 1;
            $ad->save();
            return redirect()->back();
        } catch (\Throwable $th) {
           return Inertia::render('admin/404');
        }
    }







}
