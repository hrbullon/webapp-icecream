import React from 'react'
import { config } from '../config/config'

export const Header = ({ callAction }) => {
  return (
    <nav className="navbar bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href={ window.location }>
            <img src={ config.URL_LOGO } alt="Helados Cali Logo - Brand" width={80} />
            </a>
            <form class="d-flex" role="search">
            <button class="btn btn-warning" onClick={ callAction } type="button">Finalizar</button>
            </form>
        </div>
    </nav>
  )
}
