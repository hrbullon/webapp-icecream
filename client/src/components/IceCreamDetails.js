import React, { Fragment, useState, useEffect } from 'react'

import { TableDetails } from './TableDetails';
import { removeComandaDetailCall } from '../requests/comandaRequest';

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

  const removeComandaDetail = (id) => {

    removeComandaDetailCall(id).then(data => {
      const itemsFiltered = items.filter( item => item.id !== id);
      setIceCreamDetails(itemsFiltered);
    });
  }

  return (
    <Fragment>
        <div className="card">
            <div className="card-body">
                <p className=''><b>Subtotal:</b> { subtotal }</p>
                <hr/>
                <h5 className='has-text-centered'>Detalle de helado</h5>
                <TableDetails items={ items } action={ removeComandaDetail }/>
            </div>
        </div>                
    </Fragment>
  )
}
