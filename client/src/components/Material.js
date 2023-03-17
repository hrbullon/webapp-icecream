import React from 'react'

export const Material = ({ items, saveComandaDetail, width }) => {
  return (
    <div className='row'>
    {
        items.map( item => {
        return  <div className={ `col-${width}`}>
                  <div key={item.id} className="card mt-2" onClick={ (e)=> saveComandaDetail( item) }>
                    <img src={ item.img_producto } alt={ item.nombre }/>
                  </div>
                </div>
        })
    }
    </div>
  )
}
