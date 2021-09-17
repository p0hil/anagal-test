<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class CartDBStorage
{
    /**
     * @var User|null
     */
    private $user;

    /**
     * @param $user
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * @param int $productId
     * @param int $qty
     */
    public function changeQty(int $productId, int $qty): bool
    {
        $affected = DB::table('user_cart_product')->upsert(
            ['user_id' => $this->user->id, 'product_id' => $productId, 'qty' => $qty],
            ['user_id', 'product_id'],
            ['qty']
        );

        return $affected == 1;
    }

    /**
     * @param int $productId
     * @return int
     */
    public function remove(int $productId)
    {
        return DB::table('user_cart_product')
            ->where('user_id', '=', $this->user->id)
            ->where('product_id', '=', $productId)
            ->delete();
    }

    /**
     * @return array
     */
    public function getProducts()
    {
        $inCart = DB::table('user_cart_product')
            ->join('products', 'products.id', '=', 'user_cart_product.product_id')
            ->where('user_cart_product.user_id', '=', $this->user->id)
            ->select('products.*', 'user_cart_product.qty')
            ->get();

        $result = [];
        foreach ($inCart as $item) {
            $result[$item->id] = $item->qty;
        }
        return $result;
    }


}
