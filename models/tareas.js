const Tarea= require('./tarea');

class Tareas {

    _listado ={};
    
    get listadoArr(){
        const lista = [];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key]; 
            lista.push(tarea);
        })
        return lista;
    }

    constructor(){
        this._listado ={};
    }

    borrarTarea(id = ''){
        if( this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas= []){
        tareas.forEach( tarea =>{
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea ( desc='' ){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }


    listadoCompleto( tareas =[]){

        tareas.forEach((tarea, i)  =>{
            let index = i +1 ;

            const { desc, completadoEn } = this._listado[tarea.id] = tarea;
            if(completadoEn === null){
                console.log(`${index.toString().green}. ${ desc }::${'Pendiente'.red}`);
            }
            else{
                console.log(`${index.toString().green}. ${ desc }::${'Completada'.green}`);
            }
        })
    }
    ListaDeCompletoPendiente(completo = true){
        let index = 0 ;
        this.listadoArr.forEach( (tarea) =>{
            const { completadoEn, desc } = tarea;
            const estado= ( completo )
                    ? 'Completada'.green
                    : 'Pendiente'.red
            if (completo){
                if ( completadoEn ){
                    index +=1;
                    console.log(`${index.toString().green}. ${ desc }:: ${completadoEn.green}`);
                }
            }else{
                if ( !completadoEn ){
                    index +=1;
                    console.log(`${index.toString().green}. ${ desc }::${estado}`);
                }
            }
        })
    }
    toggleCompletadas ( ids =[] ){

        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn){
                tarea.completadoEn= new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }

}   

module.exports = Tareas;