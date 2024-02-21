(function () {
    // Variables
    let DB;
    const listadoCliente = document.querySelector('#listado-clientes');
  
    document.addEventListener('DOMContentLoaded', () => {
      crearDB();
  
      listadoCliente.addEventListener('click', eliminarRegistro);
    });
  
    function eliminarRegistro(e) {
      if (e.target.classList.contains('eliminar')) {
        const idEliminar = Number(e.target.dataset.cliente);
        const confirmar = confirm('¿Deseas Eliminar este cliente?');
  
        if (confirmar) {
          const transaction = DB.transaction(['crm'], 'readwrite');
          const objectStore = transaction.objectStore('crm');
          objectStore.delete(idEliminar);
  
          transaction.oncomplete = function () {
            imprimirAlerta('Eliminado correctamente');
            e.target.parentElement.parentElement.remove(); // Elimina la fila de la tabla en la interfaz.
          };
  
          transaction.onerror = function () {
            imprimirAlerta('Hubo un error al eliminar', 'error');
          };
        }
      }
    }
  
    // Crear la base de datos de IndexedDB
    function crearDB() {
      const crearDB = window.indexedDB.open('crm', 1);
  
      crearDB.onerror = function () {
        console.log('Hubo un error al abrir la base de datos');
      };
  
      crearDB.onsuccess = function () {
        DB = crearDB.result;
        obtenerClientes();
      };
  
      crearDB.onupgradeneeded = function (e) {
        const db = e.target.result;
        const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });
  
        // Creación de índices
        objectStore.createIndex('nombre', 'nombre', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
        objectStore.createIndex('telefono', 'telefono', { unique: false });
        objectStore.createIndex('empresa', 'empresa', { unique: false });
        objectStore.createIndex('id', 'id', { unique: true });
  
        console.log('Base de datos lista y creada');
      };
    }
  
    function obtenerClientes() {
      const abrirConexion = window.indexedDB.open('crm', 1);
  
      abrirConexion.onerror = function () {
        console.log('Error en la conexión a la base de datos');
      };
  
      abrirConexion.onsuccess = function () {
        DB = abrirConexion.result;
        listadoCliente.innerHTML = ''; // Limpia la tabla antes de cargar los datos.
  
        const objectStore = DB.transaction('crm').objectStore('crm');
  
        objectStore.openCursor().onsuccess = function (e) {
          const cursor = e.target.result;
  
          if (cursor) {
            const { nombre, empresa, email, telefono, id } = cursor.value;
            listadoCliente.innerHTML +=
              ` <tr>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg font-bold">${nombre}</p>
                    <p class="text-sm leading-10 text-gray-700">${email}</p>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-gray-700">${telefono}</p>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
                    <p class="text-gray-600">${empresa}</p>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                  </td>
                </tr>`;
            cursor.continue();
          } else {
            console.log('No hay más registros...');
          }
        };
      };
    }
})();
  