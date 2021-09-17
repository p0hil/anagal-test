<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * @return string
     */
    public function getNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    /**
     * @param $password
     */
    public function setPasswordAttribute($password)
    {
        if (!$password) return;

        $this->attributes['password'] = Hash::make($password);
    }

    /**
     * @return bool
     */
    public function isDemoUser()
    {
        return $this->email === 'johndoe@example.com';
    }

    /**
     */
    public function cartProducts()
    {
        return $this->hasManyThrough(Product::class, UserCartProduct::class);
    }
}
