import FormData from 'form-data';

$(function() {

    const texto = document.querySelector('input');
    const btnInsert = document.querySelector('.divInsert button');
    const btnDeleteAll = document.querySelector('.header button');
    const ul = document.querySelector('ul');
    var itensDB = [];
    const txtContador = document.getElementById('txtContador');
    var contadorTotal = 0;
    var contadorConcluidas = 0;
    const form = document.querySelector('#Tarefas');


    btnDeleteAll.onclick = () => {
        itensDB = [];
        updateDB();
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
    }

    $('#ajax-form').submit(function(e) {
        e.preventDefault();
       
        var url = $(this).attr("action");
        let formData = new FormData(this);
  
        $.ajax({
                type:'POST',
                url: url,
                data: formData,
                contentType: false,
                processData: false,
                success: (response) => {
                    alert('Form submitted successfully');
                    location.reload();
                },
                error: function(response){
                    $('#ajax-form').find(".print-error-msg").find("ul").html('');
                    $('#ajax-form').find(".print-error-msg").css('display','block');
                    $.each( response.responseJSON.errors, function( key, value ) {
                        $('#ajax-form').find(".print-error-msg").find("ul").append('<li>'+value+'</li>');
                    });
                }
           });
      
    });

    function setItemDB() {
        // if (itensDB.length >= 20) {
        //     alert('Limite máximo de 20 itens atingido!');
        //     return;
        // }

        // itensDB.push({ 'item': texto.value, 'status': '' });
        // updateDB();

        //var url = '{{ route('InserirTarefa') }}';

        // var url = '/InserirTarefa';
    
        // $.ajax({
        //     url: url,
        //     type: 'POST',
        //     data: {
        //         nome: "test",
        //         status: "123",
        //     },
        //     dataType: 'JSON',
        //     processData: false,
        //     contentType: false,
        //     cache: false,
        //     enctype: 'multipart/form-data',

        //     before: function() {
                // $('#btnCheckout').prop('disabled', true);
               
        //     },
        //     success: function(response) {

        //      alert(JSON.stringify(response));
              
        //     },
        //     error: function(response) {
        //         alert(JSON.stringify(response));
        //     }
        // });

    }

    function updateDB() {
        localStorage.setItem('todolist', JSON.stringify(itensDB));
        loadItens();
    }

    function loadItens() {
        contadorTotal = 0;
        contadorConcluidas = 0;
        ul.innerHTML = "";
        itensDB = JSON.parse(localStorage.getItem('todolist')) ?? [];
        itensDB.forEach((item, i) => {
            insertItemTela(item.item, item.status, i)
            contadorTotal = ++contadorTotal;
            if (item.status == 'checked')
            {
                contadorConcluidas = ++contadorConcluidas;
            }
            txtContador.textContent = contadorConcluidas  +'/'+ contadorTotal + ' Tarefas concluídas';
        })
    
    }

    function insertItemTela(text, status, i) {
        const li = document.createElement('li')
    
        li.innerHTML = `
            <div class="divLi">
            <input id=${i} class="done" type="checkbox" ${status} data-i=${i}" />
            <span data-si=${i}>${text}</span>
            <button id=${i} class="remove" data-i=${i}><i class='bx bx-trash'></i></button>
            </div>
            `
            ul.appendChild(li);

        if (status) {
            document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
        
        } else {
            document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')   
        }

        texto.value = '';
    
    }

    $(document).on('change', '.done', function(){
        if (this.checked) {
            itensDB[$(this).attr("id")].status = 'checked';
            contadorConcluidas = ++contadorConcluidas;
           
        } 
        else {
            itensDB[$(this).attr("id")].status = '' ;
            contadorConcluidas = --contadorConcluidas;
           
        }
        updateDB();
    });

    $(document).on('click', '.remove', function(){
        itensDB.splice($(this).attr("id"), 1);
        updateDB();
    });

    loadItens();    
});