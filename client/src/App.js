
import { useState, useEffect, Fragment } from 'react';

import 'animate.css';
import swal from 'sweetalert';

import './App.css';
import { Accodion } from './components/Accodion';
import { IceCreamDetails } from './components/IceCreamDetails';
import { finnishComandaCall, saveComandaCall, saveComandaDetailCall } from './requests/comandaRequest';

const URL_API = "http://localhost:8569";

function App() {
  
  const tipos = ["Envases","Sabores","Siropes","Chispas"];

  const [success, setSuccess] = useState(false);
  const [cedula, setCedula] = useState("");
  const [comandaId, setComandaId] = useState(0);
  
  const [items, setItems] = useState([]);
  const [envases, setEnvases] = useState([]);

  const [iceCreamDetails, setIceCreamDetails] = useState([]);

  useEffect(() => {

    getInsumos();

    const comanda = localStorage.getItem("comanda");

    if(comanda > 0){
      getComanda(comanda);
    }

  }, [])

  const formatDocument = (event) => {

    const string = event.target.value.slice(0,1);

    if(string !== ""){
      const value = event.target.value.replace(/\D/g,'').slice(0, 9);
      event.target.value = `${string.toUpperCase()}-${value}`;
      return event.target.value;
    }
  }

  const getComanda = async (id) => {
    const comanda = await fetch(`${URL_API}/comanda/${id}`);
    
    comanda.json().then( (data) => {
      setComandaId(data.comanda.id);
      setCedula(data.comanda.cedula);
      setIceCreamDetails(data.details);
    });
  }

  const getInsumos = async () => {
    
    const insumos = await fetch(`${URL_API}/insumos`);
    
    insumos.json().then( (results) => {

      const envasesFiltered = results.filter(item => item.tipo_producto === 1);

      setItems(results);
      setEnvases(envasesFiltered);

    }).catch( e => {
      alert("Hubo un error, por favor cargar de nuevo el sitio")
    })
  }

  const saveComanda = () => {
    
    if(cedula !== ""){

      const body = {
        cedula,
        descripcion: "Comanda - Borrador",
        precio_final: 0,
        estatus: 0
      }

      saveComandaCall(body).then(data => {
        //Save in localStorage
        localStorage.setItem("comanda", data.detail.id);
        localStorage.setItem("cedula", cedula);
        
        //Set success
        setSuccess(true);
        setComandaId(data.detail.id);

        //Clean details
        setIceCreamDetails([]);
      });

    } else {
      swal("Error!", "Ingrese una cédula para generar la comanda", "error");
    }
  }

  const finnishComanda = () => {

    if(cedula !== "" && comandaId > 0){

      const body = {
        cedula,
        comanda: comandaId
      };

      finnishComandaCall(body).then(data => {
        //*********Clean form*******/
        setCedula("");
        setComandaId(0);
        setIceCreamDetails([]);
        //Clean localStorage
        localStorage.removeItem("cedula");
        localStorage.removeItem("comanda");
  
        swal("Bien!", "Comanda finalizada!", "success");
      })
      
    } else {
      swal("Error!", "Error al finalizar la comanda", "error");
    }
  }

  const saveComandaDetail = (envase) => {

    if(comandaId > 0){
      
      const body = {
        h_comanda_id: comandaId,
        h_insumo_id: envase.id,
        descripcion: envase.nombre,
        costo: envase.costo,
        pvp: envase.precio_pvp,
        porcion: envase.porcion,
        unidad_medida: envase.unidad_medida
      }

      saveComandaDetailCall(body).then( data => {
        setIceCreamDetails(prevState => prevState.concat(data.detail));
      })

    }else{
      swal("Alerta!", "Debe generar primero una comanda", "warning");
    }
  }

  return (
    <Fragment>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="/img/logo.jpg" alt="Helados Cali Logo - Brand" width={80} />
          </a>
          <form class="d-flex" role="search">
          <button class="btn btn-warning" onClick={ finnishComanda } type="button">Finalizar</button>
        </form>
        </div>
      </nav>
      <div className='main m-2'>
        <div className='row'>
          <div className='col-12 '>
            { success &&
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Comanda creada!</strong> A continuación, agregue los detalles de la comanda.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            }
          </div>
          <div className='col-3'>
            <div className='row'>
              <div className='col-12'>
                <h6>Materiales</h6>
              </div>
              {
                envases.map( envase => {
                  return  <div className='col-6'>
                            <div className="card" onClick={ (e)=> saveComandaDetail( envase) }>
                              <img src={ envase.img_producto }/>
                              <div className="card-body">
                                <small>{ envase.nombre }</small>
                              </div>
                            </div>
                          </div>
                })
              }
            </div>
          </div>
          <div className='col-6'>
            <div className='col-12'>
              <h6>Contenido</h6>
            </div> 
            <div className="accordion accordion-flush" id="accordionFlushExample">
              {
                 tipos.map( (tipo, index) => {
                   return <Accodion key={index} title={tipo} tipo={((index+1))} index={ (index+1) } items={items} saveDetail={ saveComandaDetail }/>
                })
              }
            </div>
          </div>
          <div className='col-3'>
            <div className="card">
                <div className="card-body">
                    <input type="text" name='cedula' onKeyUp={ (e) => formatDocument(e) }  onChange={ (e)=> setCedula(e.target.value) } value={ cedula } className='form-control' placeholder='Ingrese #nro cedula'/>
                    <div class="d-grid gap-2 mt-2">
                      <button type='button' onClick={ saveComanda } className='btn btn-sm btn-primary'>
                        <i className='fa fa-plus'></i>Nueva comanda
                      </button>
                    </div>
                </div>
            </div>
            <IceCreamDetails items={ iceCreamDetails } setIceCreamDetails={setIceCreamDetails}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
