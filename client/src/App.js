
import { useState, useEffect, Fragment } from 'react';

/***Third */
import 'animate.css';
import swal from 'sweetalert';

import './App.css';

/**Requests */
import { 
  finnishComandaCall, 
  getComandaCall, 
  saveComandaCall, 
  saveComandaDetailCall } from './requests/comandaRequest';
import { getInsumosCall } from './requests/insumoRequest';

/**Componests Views */
import { Accodion } from './components/Accodion';
import { IceCreamDetails } from './components/IceCreamDetails';
import { Material } from './components/Material';
import { Alert } from './components/Alert';
import { Header } from './components/Header';
import { FormComanda } from './components/FormComanda';

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

  const getComanda = async (id) => {

    getComandaCall(id).then( data => {

      setComandaId(data.comanda.id);
      setCedula(data.comanda.cedula);
      setIceCreamDetails(data.details);

    })
  }

  const getInsumos = async () => {
    
    getInsumosCall().then( data => {
      
      const envasesFiltered = data.filter(item => item.tipo_producto === 1);
      setItems(data);
      setEnvases(envasesFiltered);
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
      <Header callAction={ finnishComanda }/>
      <div className='main m-2'>
        <div className='row'>
          <div className='col-12 '>
            { success &&
              <Alert title="Comanda creada!" text="A continuación, agregue los detalles de la comanda." />
            }
          </div>
          <div className='col-3'>
            <div className='row'>
              <div className='col-12'>
                <h6>Materiales</h6>
              </div>
              <Material items={ envases } saveComandaDetail={ saveComandaDetail } width={6}/>
            </div>
          </div>
          <div className='col-6'>
            <div className='col-12'>
              <h6>Contenido</h6>
            </div> 
            <div className="accordion accordion-flush" id="accordionFlushExample">
              {
                 tipos.map( (tipo, index) => {
                   return <Accodion key={index} title={tipo} tipo={((index+1))} index={ (index+1) } items={items} saveComandaDetail={ saveComandaDetail }/>
                })
              }
            </div>
          </div>
          <div className='col-3'>

            <FormComanda 
              cedula={ cedula } 
              setCedula={ setCedula } 
              callAction={ saveComanda }/>

            <IceCreamDetails 
              items={ iceCreamDetails } 
              setIceCreamDetails={setIceCreamDetails}/>

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
