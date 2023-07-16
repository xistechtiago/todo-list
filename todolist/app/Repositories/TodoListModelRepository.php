<?php

namespace App\Repositories;

use App\Models\TodoListModel;
use App\Repositories\BaseRepository;

class TodoListModelRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'id',
        'nome',
        'status',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    public function model(): string
    {
        return TodoListModel::class;
    }
}
