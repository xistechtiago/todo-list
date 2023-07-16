import FormData from 'form-data';

$(function() {

    const texto = document.getElementById('nome');
    const btnInsert = document.getElementById('btnInserir');
    const btnDeleteAll = document.getElementById('btnDeleteAll');
    const ul = document.querySelector('ul');
    var itensDB = [];
    let itensTarefa = [];
    const txtContador = document.getElementById('txtContador');
    var contadorTotal = 0;
    var contadorConcluidas = 0;
   
    function setHeaderAjax(){

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        
    }
    function updateDB() {
        loadItens();
    }

    function setItemDB() {

       $('#ajax-form').submit(function(e) {
           e.preventDefault();
           
           var url = $(this).attr("action");
           let formData = new FormData(this);

           setHeaderAjax();
            $.ajax({
                    type:'POST',
                    url: '/inserirTarefa',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: (response) => {
                        console.log('Tarefa cadastrada com sucesso');
                    },
                    error: function(response){
                        console.log('Problema ao inserir tarefa', response);
                    }
               });
          
        });
    }


    function atualizarItens(response) {
        itensTarefa = response;
        for(var i = 0; i < itensTarefa.length; i++) {
            var obj = itensTarefa[i];
            insertItemTela(obj.id, obj.nome, obj.status);
            contadorTotal = ++contadorTotal;
            if (obj.status == 'checked')
            {
                contadorConcluidas = ++contadorConcluidas;
            }
            txtContador.textContent = contadorConcluidas  +'/'+ contadorTotal + ' Tarefas concluídas';
        }
        
    }

    function loadItens() {
        contadorTotal = 0;
        contadorConcluidas = 0;
        ul.innerHTML = "";

        $.ajax({
            type:'GET',
            url: '/obterListaTarefas',
            contentType: 'application/json',
            processData: false,
            success: (response) => {
                atualizarItens(response);  
            },
            error: function(response){
                console.log('Problema ao obter tarefas', response);  
            }
       });
    }

    function insertItemTela(id, text, status) {
        const li = document.createElement('li');
    
        li.innerHTML = `
            <div class="divLi">
            <input id=${id} class="done" type="checkbox" ${status} data-i=${id}" />
            <span data-si=${id}>${text}</span>
            <button id=${id} class="remove" data-i=${id}><i class='bx bx-trash'></i></button>
            </div>
            `
            ul.appendChild(li);

        if (status) {
            document.querySelector(`[data-si="${id}"]`).classList.add('line-through');
        
        } else {
            document.querySelector(`[data-si="${id}"]`).classList.remove('line-through');   
        }

        texto.value = '';
    
    }

    $(document).on('change', '.done', function(){
        if (this.checked) {
            itensDB[$(this).attr("id")].status = 'checked';
            var id = $(this).attr("id");
            
            setHeaderAjax();
            $.ajax({
                    type:'POST',
                    url: '/atualizarTarefa/' + id,
                    data: { id : id, status : 'checked' },
                    contentType: false,
                    processData: false,
                    success: (response) => {
                        alert('Tarefa atualizada com sucesso');
                    },
                    error: function(response){
                        console.log('Problema ao atualizar tarefa', response);
                    }
               });
    
            contadorConcluidas = ++contadorConcluidas;
           
        } 
        else {
            itensDB[$(this).attr("id")].status = '' ;

            setHeaderAjax();
            $.ajax({
                    type:'POST',
                    url: '/atualizarTarefa',
                    data: { id : id, status : '' },
                    contentType: false,
                    processData: false,
                    success: (response) => {
                        alert('Tarefa atualizada com sucesso');
                        location.reload();
                    },
                    error: function(response){
                        console.log('Problema ao atualizar tarefa', response);
                    }
               });
    

            contadorConcluidas = --contadorConcluidas;
           
        }
        updateDB();
    });

    btnDeleteAll.onclick = () => {

        setHeaderAjax();
        $.ajax({
                type:'POST',
                url: '/removerTarefas',
                contentType: false,
                processData: false,
                success: (response) => {
                    alert('Tarefas removida com sucesso');
                },
                error: function(response){
                    console.log('Problema ao remover tarefas', response);
                }
           });

        contadorTotal = 0;
        contadorConcluidas = 0;
        txtContador.textContent = contadorConcluidas  +'/'+ contadorTotal + ' Tarefas concluídas';
    }

    texto.addEventListener('keypress', e => {
        if (e.key == 'Enter' && texto.value != '') {
            setItemDB();
        }
    })

    btnInsert.onclick = () => {
        if (texto.value != '') {
            setItemDB();
        }
        else
        {
            alert('Informe o nome da tarefa');
            return;
        }
    }

    $(document).on('click', '.remove', function(){
        var id =  $(this).attr("id");

        setHeaderAjax();
        $.ajax({
                type:'GET',
                url: '/removerItemTarefa/'+ id,
                contentType: 'json',
                processData: false,
                success: (response) => {
                    console.log('Tarefa removida com sucesso');
                },
                error: function(response){
                    console.log('Problema ao remover tarefa', response);
                }
           });

        updateDB();
    });

    updateDB();
});