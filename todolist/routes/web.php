<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\App;

$environment = App::environment();


Route::get('/', function () {
    return view('home');
});

Route::post('/inserirTarefa', 'App\Http\Controllers\TarefasController@setTodoList')->name('InserirTarefa');
Route::post('/atualizarTarefa/{id}','App\Http\Controllers\TarefasController@updateItemTodoList')->name('AtualizarTarefa');
Route::get('/obterListaTarefas','App\Http\Controllers\TarefasController@getTodoList')->name('ObterListaTarefas');
Route::get('/removerItemTarefa/{id}','App\Http\Controllers\TarefasController@removeItemTodoList')->name('RemoverItemTarefa');
Route::post('/removerTarefas','App\Http\Controllers\TarefasController@removeTodoList')->name('RemoverTarefas');

