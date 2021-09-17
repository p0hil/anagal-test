<?php

namespace App\Providers;

use App\Services\Cart;
use Illuminate\Support\Facades\Auth;
use League\Glide\Server;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        JsonResource::withoutWrapping();
    }

    public function register()
    {
        $this->registerGlide();
        $this->app->singleton(Cart::class, function ($app) {
            return new Cart(Auth::check() ? Auth::user() : null);
        });
    }

    protected function registerGlide()
    {
        $this->app->bind(Server::class, function ($app) {
            return Server::create([
                'source' => Storage::getDriver(),
                'cache' => Storage::getDriver(),
                'cache_folder' => '.glide-cache',
                'base_url' => 'img',
            ]);
        });
    }

}
