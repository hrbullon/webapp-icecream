import { config } from "../config/config";

const URL_API = config.API_URL;

export const getInsumosCall = () => {

    return fetch(`${URL_API}/insumos`, {
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