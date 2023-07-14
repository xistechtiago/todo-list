<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TodoListModel extends Model
{
    public $table = 'ListaTarefas';

    public $fillable = [
        'nome',
        'status'
    ];

    protected $casts = [
        'id'  => 'integer',
        'nome' => 'string',
        'status' => 'string'
    ];

    public static array $rules = [

    ];


}
