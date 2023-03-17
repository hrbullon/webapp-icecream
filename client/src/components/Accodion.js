import React, { Fragment, useEffect, useState } from 'react'
import { Material } from './Material'

export const Accodion = ({ title, tipo, index, items, saveDetail }) => {
 
  const [itemsFiltered, setItemsFiltered] = useState([]);

  useEffect(() => {
     const filtered = items.filter( item => item.tipo_producto === tipo); 
     filterItems(filtered);
  }, [items, tipo])

  const filterItems = (items) => {
    setItemsFiltered(items);
  }

  return (
    <Fragment>
      { title !== "Envases" &&
        <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
                { title } #{ (index) }
            </button>
            </h2>
            <div id={`flush-collapse${index}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                  <Material items={itemsFiltered} saveDetail={ saveDetail }/>
              </div>
            </div>
        </div>
      }
    </Fragment>
  )
}
