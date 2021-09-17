<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCollection extends ResourceCollection
{
    /**
     * @var array
     */
    private $inCart;

    public function __construct($products, $inCart = [])
    {
        parent::__construct($products);
        $this->inCart = $inCart;
    }


    public function toArray($request)
    {
        return $this->collection->map(function($item) use ($request) {
            return $item->toArray($request) + ['qty' => (int)($this->inCart[$item->id] ?? 0)];
        })->toArray();
    }


}
