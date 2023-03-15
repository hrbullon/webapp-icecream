import React, { Fragment, useState, useEffect } from 'react'

const URL_API = "http://localhost:8569";

export const IceCreamDetails = ({ items, setIceCreamDetails }) => {

  const [subtotal, setSubtotal] = useState(0)
  
  useEffect(() => {
    
    let sum = 0;
    items.map( item =>  sum+=Number(item.pvp) );

    const formattedAmount = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(sum);
    
    setSubtotal(formattedAmount);

  }, [items]);

  const removeItem = (item) => {
    
    const id = item.id;
    
    fetch(`${URL_API}/insumos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        const itemsFiltered = items.filter( item => item.id !== id);
        setIceCreamDetails(itemsFiltered);
      })
      .catch(error => {
        console.error('Ha ocurrido un error', error);
      });
  } 

  return (
    <Fragment>
        <div className="card">
            <div className="card-body">
                <p className=''><b>Subtotal:</b> { subtotal }</p>
                <hr/>
                <h5 className='has-text-centered'>Detalle de helado</h5>
                <table className='table'>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Descripción</th>
                        <th>Costo</th>
                        <th className='text-center'>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map( (item, index) => {
                                return <tr key={index}>
                                            <td>{ (index+1) }</td>
                                            <td>{ item.descripcion }</td>
                                            <td>{ item.pvp }</td>
                                            <td className='text-center'>
                                                <button onClick={ (e) => removeItem(item) } className="btn btn-sm btn-danger">x</button>
                                            </td>
                                        </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>                
    </Fragment>
  )
}
