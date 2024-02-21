(function (){

    let DB;
    let idCliente; 

    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa')
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', ()=>{

        conectarDB();
        //actualizar el regristo
        formulario.addEventListener('submit', actualizarCliente);
        //verificar el id de la url
        const parametrosUrl = new URLSearchParams(window.location.search);
        idCliente = parametrosUrl.get('id');
        //console.log(idCliente);

        if(idCliente){
            setTimeout(()=>{
                obtenerCliente(idCliente);
            },100);
            
        }
    })

    function obtenerCliente(id){

        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');
        const cliente = objectStore.openCursor();

        cliente.onsuccess = function(e){
            const cursor = e.target.result;

            if(cursor){

                if(cursor.value.id === Number(id)){
                    //console.log(cursor.value);
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    }

    function llenarFormulario(datosCliente){

        const {nombre,email,telefono,empresa} = datosCliente;
        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    }

    function actualizarCliente(e){
        e.preventDefault();

        if(nombreInput.value === '' || emailInput.value === '' || telefonoInput.value === '' || empresaInput.value === ''){
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        //actualizar cliente
        const clienteActualizado = {

            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: Number(idCliente)
        }

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.put(clienteActualizado);

        transaction.oncomplete = function(){
            imprimirAlerta('El cliente se modifico correctamente');
            setTimeout(()=>{
                window.location.href = 'index.html';
            },2000)
        }
        transaction.onerror = function(){
            imprimirAlerta('hubo un error en editar cliente','error');
        }
    }


    function conectarDB(){

        const abrirConexion = window.indexedDB.open('crm',1);

        abrirConexion.onerror = function(){
            console.log('hubo un error en la conexion');
        }

        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;
        }
    }

})();