<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Managers;

class Users extends Model
{
    use HasFactory;
    protected $table = 'users';
    public $timestamps = false;

    public function manager()
    {
        return $this->hasOne(Managers::class,'phone','phone');
    }
}
