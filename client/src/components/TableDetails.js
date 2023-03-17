import React from 'react'

export const TableDetails = ({ items, action }) => {
  return (
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
                                    <button onClick={ (e) => action(item.id) } className="btn btn-sm btn-danger">x</button>
                                </td>
                            </tr>
                })
            }
        </tbody>
    </table>
  )
}
