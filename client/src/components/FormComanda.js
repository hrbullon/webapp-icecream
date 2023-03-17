import React from 'react'

export const FormComanda = ({ cedula, setCedula, callAction }) => {

    const formatDocument = (event) => {

        const string = event.target.value.slice(0,1);
    
        if(string !== ""){
          const value = event.target.value.replace(/\D/g,'').slice(0, 9);
          event.target.value = `${string.toUpperCase()}-${value}`;
          return event.target.value;
        }
    }

    return (
    <div className="card">
        <div className="card-body">
            <input type="text" 
                name='cedula' 
                className='form-control'
                onKeyUp={ (e) => formatDocument(e) }  
                onChange={ (e)=> setCedula(e.target.value) } 
                value={ cedula }  placeholder='Ingrese #nro cedula'/>

            <div class="d-grid gap-2 mt-2">
                <button type='button' 
                    onClick={ callAction } 
                    className='btn btn-sm btn-primary'>
                <i className='fa fa-plus'></i>Nueva comanda
                </button>
            </div>
        </div>
    </div>
  )
}
