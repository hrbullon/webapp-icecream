import { config } from "../config/config";

const URL_API = config.API_URL;

export const getComandaCall = (id) => {
  
  return fetch(`${URL_API}/comanda/${id}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => { return data })
  .catch(error => {
      console.error('Ha ocurrido un error', error);
  });
}

export const removeComandaDetailCall = (id) => {
    
    return fetch(`${URL_API}/comanda/detail/${id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => { return data })
            .catch(error => {
                console.error('Ha ocurrido un error', error);
            });
} 

export const saveComandaCall = (data) => {

    return fetch(`${URL_API}/comanda`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => { return data })
      .catch(error => {
        console.error('Ha ocurrido un error', error);
      });
}

export const saveComandaDetailCall = (data) => {

    return fetch(`${URL_API}/comanda/detail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => { return data })
      .catch(error => {
        console.error('Ha ocurrido un error', error);
      });
}

export const finnishComandaCall = (data) => {

    return fetch(`${URL_API}/comanda/${data.comanda}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => { return data })
      .catch(error => {
        console.error('Ha ocurrido un error', error);
      });
}