//con el domcontentloaded nos aseguramos que todod el html este cargado
document.addEventListener('DOMContentLoaded' , function(){

    const email ={
        email: '',
        asunto:'',
        mensaje:''
    };

    //seleccionar los elementos del html
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type= "submit"]');
    const btnReset = document.querySelector('#formulario button[type= "reset"]');
    const spinner = document.querySelector('#spinner');

    //añadir eventos
    /*inputEmail.addEventListener('blur', function(e){
        //console.log('salir del input');
        console.log(e.target.value); //de esta forma se lee lo que el usuario ha escrito
    });

    inputAsunto.addEventListener('blur', function(e){
        console.log(e.target.value);
        esta es otra forma de añadir eventos
    });*/

    //segunda forma de añadir eventos
    inputEmail.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    
    
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();

        //reiniciar el objeto
        resetFormulario();

        
    });

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(()  =>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            //reiniciar el objeto
            resetFormulario();

            //crear una nueva alerta
            const aletarExito = document.createElement('P');
            aletarExito.classList.add('bg-green-500', 'text-white','p-2','text-center','rounded-lg',
            'mt-10','font-bold','text-sm','uppercase');
            aletarExito.textContent = 'Mensaje enviado exitosamente';
            formulario.appendChild(aletarExito);

            setTimeout(() => {
                aletarExito.remove();
            }, 3000);
        },3000);
    };


    function validar(e){
        //console.log(e.target.id);

        if(e.target.value.trim() === ''){ //trim() elimina los espacios en blanco
            mostrarAlerta(`Este campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return; //detiene la ejecucion del codigo
        }
        
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido',e.target.parentElement );
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);

        //asginar los valores al objeto email
        email[e.target.name] = e.target.value.trim().toLowerCase();
        //console.log(email);
        comprobarEmail();
    };

    function mostrarAlerta(mensaje, referencia){

        //comprueba si ya existe una alerta
        limpiarAlerta(referencia);

        //generar una alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        //inyectar el error al formulario
        referencia.appendChild(error);
    };

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove(); //remuevo la alerta anterior
        }
    };

    function validarEmail(email){

        //expresion regular para un email
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email); //evalua si el campo cumple con la expresion regular
        return resultado;

    };

    function comprobarEmail(){
        //console.log(Object.values(email).includes(''));
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');   
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity-50');   
        btnSubmit.disabled = false;
    };

    function resetFormulario(){
        //reiniciar el objeto
        email.email = '';
        email.asunto =  '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }

    
});