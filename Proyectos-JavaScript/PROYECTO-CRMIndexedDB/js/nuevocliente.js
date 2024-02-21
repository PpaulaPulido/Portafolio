(function(){

    //variables
    const formulario = document.querySelector('#formulario');
    let DB;

    document.addEventListener('DOMContentLoaded',()=>{

        //conectar la base de datos
        conectarDB();

        formulario.addEventListener('submit', validarCliente);

    });

    function validarCliente(e){
        e.preventDefault();
        //console.log('validando');
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === ''){
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        //crear un obejto con la informacion 
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }

        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente){

        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.add(cliente);

        transaction.onerror = function(){
            imprimirAlerta('hubo un error en crear cliente','error');
        }

        transaction.oncomplete = function(){
            imprimirAlerta('El cliente se agrego correctamente');

            setTimeout(()=>{
                window.location.href = 'index.html';
            },2000)
        }
    }

})();