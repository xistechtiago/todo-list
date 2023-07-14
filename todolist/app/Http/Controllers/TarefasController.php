<?php

namespace App\Http\Controllers;


use Exception;
use Illuminate\Http\Request;
use \App\Repositories\TodoListModelRepository;
use Illuminate\Support\Str;
use Laracasts\Flash\Flash;
use Illuminate\Support\Facades\Validator;


class TarefasController extends AppBaseController
{
    private $todoListModelDataRepository;

    public function __construct(
        TodoListModelRepository $todoListModelDataRepository,
    ){
        $this->todoListModelDataRepository = $todoListModelDataRepository;
    }

    public function setTodoList(Request $request)
    {
        $Tarefa = $request->all();
        $this->todoListModelDataRepository->create($Tarefa);

        return response()->json(['success'=>'Tarefa inserida com sucesso.']);
    }


    public function getTodoList(Request $request)
    {
        $Tarefas = $this->todoListModelDataRepository->all();
        
        return $Tarefas;
    }
    
}
