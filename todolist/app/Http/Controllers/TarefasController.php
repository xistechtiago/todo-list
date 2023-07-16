<?php

namespace App\Http\Controllers;

use App\Models\TodoListModel;
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

        return response()->json(['success'=>'Tarefa cadastrada com sucesso.']);
    }


    public function getTodoList(Request $request)
    {
        $Tarefas = TodoListModel::all();

        return response()->json($Tarefas);
    }

    public function updateTodoList(Request $request, $id)
    {
        $Tarefa = $request->all();
        $this->todoListModelDataRepository->update($Tarefa, $id);

        return response()->json(['success'=>'Tarefa atualizada com sucesso.']);
    }

    public function removeItemTodoList(Request $request, $id)
    {
        $IdTarefa = $id;
       
        $Tarefa = TodoListModel::where('id', $IdTarefa)->get();
        
        if(count($Tarefa) > 0){
            foreach ($Tarefa as $item) {
                $this->todoListModelDataRepository->delete($item->id);
            }
        }
            return true;
    }

    public function removeTodoList(Request $request)
    {
        $Tarefas = TodoListModel::all();
        
        if(count($Tarefas) > 0){
            foreach ($Tarefas as $itens) {
                $this->todoListModelDataRepository->delete($itens->id);
            }
        }
            return true;
    }
    
}
