<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Models\Product;
use App\Services\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{

    public function index()
    {
        $cart = app()->make(Cart::class);
        $cartProducts = $cart->getProducts();

        $products = Product::paginate(6)->appends(Request::all());
        $data = new ProductCollection($products, $cartProducts);

        return Inertia::render('Products', [
            'products' => $data
        ]);
    }
}
