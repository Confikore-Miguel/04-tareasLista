require('colors');
const { guardasdb, leerDB} = require('./db/guardarArchivo');
const { inquirerMenu,pausa, leerInput, listaBorrar,confirmar,mostrarCheckList } = require('./helpers/inquires');
const Tareas = require('./models/tareas');


const main= async()=>{

    // console.clear();
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if( tareasDB ){
        //Establecer tareas
        console.log(tareasDB);
        tareas.cargarTareasFromArray(tareasDB);
    }    
    do{

        opt = await inquirerMenu();
      
        switch (opt) {
            case '1':
                const  desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc)
                console.log(desc);
                break;
            case '2':
                tareas.listadoCompleto(tareas.listadoArr);
                break;
            case '3':
                tareas.ListaDeCompletoPendiente(true);
                break;
            case '4':
                tareas.ListaDeCompletoPendiente(false);
                break;
            case '5':
                const ids= await mostrarCheckList(tareas.listadoArr);
                // console.log(ids);
                tareas.toggleCompletadas(ids);
                break;
        
            case '6':
                const id = await listaBorrar(tareas.listadoArr);
                
                // console.log({confirm});
                // console.log({id});
                if( id !== '0'){
                    const confirm = await confirmar('¿Está seguro?');
                        if ( confirm ){
                            tareas.borrarTarea(id);
                            console.log('Tarea borrada...');
                        }
                    }
                break;
        
            default:
                break;
        }

        guardasdb(tareas.listadoArr);

        await pausa();

    }while( opt !== '0');

    
}

main();