import React from 'react'

export const Material = ({ items, saveDetail }) => {
  return (
    <div className='row'>
    {
        items.map( item => {
        return <div key={item.id} onClick={ (e)=> saveDetail(item) } className='col-3 mt-2'>
                    <img src={ item.img_producto } alt={ item.nombre }/>
                </div>
        })
    }
    </div>
  )
}
