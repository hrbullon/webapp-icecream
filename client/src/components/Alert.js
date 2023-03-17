import React from 'react'

export const Alert = ({ title, text }) => {
  return (
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{ title }</strong> { text }
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}
