<html lang="pt-br">

<head>
    <title>Projeto Todo-List</title>
    <meta charset="utf-8">
    <meta name="description" content="Todo-List">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
    @vite(['resources/js/app.js'])
    @vite(['resources/css/stylelist.css'])
</head>

<body>
      <div class="container-fluid py-4">
          <header class="pb-3 border-bottom">
              <span class="fs-4">Projeto To-do List</span>
          </header>

          <form id="ajax-form" method="POST" action="{{ route('InserirTarefa') }}">
            @csrf

          <div class="p-5 mb-4 bg-body-tertiary">
            <div class="container-fluid">
              
              <div class="header">
                <h1 class="display-5 fw-bold">Compras da manhã</h1>
                <div class="row">
                    <div class="fs-4 col-sm-4" id="txtContador">0/0 Tarefas concluídas</div>
                    <button id="btnDeleteAll" class="fs-4 col-sm-5"><i class='bx bxs-trash-alt'></i> Remover todas tarefas</button>
                </div>
              </div>
              <hr/>
              <br />
              <div class="divInsert">
               
                <input class="textInsert form-control" name="nome" id="nome" type="text" placeholder="Inserir nova tarefa"/>
                <button id="btnInserir"><i class='bx bx-plus'></i></button>
               
              </div>
              <ul></ul>    
            </div> 
          </div>

          </form>

          <footer class="pt-3 mt-4 text-body-secondary border-top">
              &copy; To-do list 2023
          </footer>
      </div>    
</body>
  @vite(['resources/js/functions.js'])
</html>