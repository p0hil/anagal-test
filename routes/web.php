<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth
Route::get('login')->name('login')->uses('Auth\LoginController@showLoginForm')->middleware('guest');
Route::post('login')->name('login.attempt')->uses('Auth\LoginController@login')->middleware('guest');
Route::post('logout')->name('logout')->uses('Auth\LoginController@logout');

// Products
Route::get('/')->name('products')->uses('ProductsController@index');

// Cart
Route::get('cart')->name('cart')->uses('CartController@index');
Route::put('cart/put')->name('cart.put')->uses('CartController@put');
Route::put('cart/remove')->name('cart.remove')->uses('CartController@remove');
Route::put('cart/change')->name('cart.change')->uses('CartController@change');
