<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class Cart
{

    const PARAM_NAME = 'cart';

    private $storage = [];
    private $dbStorage;

    /**
     * @var User|null
     */
    private ?User $user;

    /**
     * @param $user
     */
    public function __construct($user)
    {
        $this->user = $user;
        $this->storage = Request::session()->get(self::PARAM_NAME, []);
        $this->dbStorage = $this->user ? new CartDBStorage($user) : null;
        $this->restore();
    }


    private function update()
    {
        Request::session()->put(self::PARAM_NAME, $this->storage);
    }

    public function restore()
    {
        // Restore from DB
        if (!$this->user) {
            return;
        }
        $this->storage = $this->dbStorage->getProducts();
    }

    public function put(int $productId)
    {
        $this->storage[$productId] = ($this->storage[$productId] ?? 0) + 1;
        $this->update();

        $this->dbStorage && $this->dbStorage->changeQty($productId, $this->storage[$productId]);
    }

    public function remove(int $productId)
    {
        unset($this->storage[$productId]);
        $this->update();

        $this->dbStorage && $this->dbStorage->remove($productId);
    }

    public function changeQty(int $productId, int $qty)
    {
        $this->storage[$productId] = $qty;
        $this->update();

        $this->dbStorage && $this->dbStorage->changeQty($productId, $qty);
    }

    public function getProducts()
    {
        return $this->storage;
    }


}
