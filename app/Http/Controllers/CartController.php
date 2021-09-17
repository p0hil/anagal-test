<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Models\Product;
use App\Services\Cart;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Request;

class CartController extends Controller
{

    /**
     * @var Cart
     */
    private Cart $cart;

    public function getCart()
    {
        return $this->cart ?? $this->cart = app()->make(Cart::class);
    }

    public function index(Request $request)
    {
        $inCart = $this->getCart()->getProducts();
        $productIds = array_keys($inCart);

        $products = Product::whereIn('id', $productIds)->get();

        return Inertia::render('Cart', [
            'products' => new ProductCollection($products, $inCart)
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function put(Request $request): JsonResponse
    {
        $productId = (int) $request->get('productId');
        $this->getCart()->put($productId);

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function remove(Request $request): JsonResponse
    {
        $productId = (int) $request->get('productId');
        $this->getCart()->remove($productId);

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function change(Request $request): JsonResponse
    {
        $productId = (int) $request->get('productId');
        $qty = $request->get('qty');

        $this->getCart()->changeQty($productId, $qty);

        return response()->json([
            'success' => true
        ]);
    }

}
