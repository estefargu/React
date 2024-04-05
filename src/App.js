import React , {useState, useEffect}from 'react';
import Axios from 'axios';
import './App.css';

export default function App() {
  const [contador, setContador] = useState(0); 
  const [departamentos, setDepartamentos] = useState([]);
  const [deptoSeleccionado, setDeptoSeleccionado] = useState('');
  const [ciudades, setCiudades] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');

  useEffect(()=>{

    const obtenerDeptos = async () => {
      const response = await Axios({
        url: 'http://localhost:1337/api/listdepartments'
      });
      const listDepartamentos = Object.keys(response.data).map(i => response.data[i]);
      setDepartamentos(listDepartamentos.flat()); 
    }

    const obtenerCiudades = async (departmentId) => {
      const response = await Axios ({
        url:`http://localhost:1337/api/listcities/${departmentId}`
      });
      const listCiudades = Object.keys(response.data).map(i=> response.data[i]);
      setCiudades(listCiudades.flat());
    }

    obtenerDeptos();

    if(deptoSeleccionado !== "")
      obtenerCiudades(deptoSeleccionado);
  },[deptoSeleccionado]);

  function handleClick(){
    setContador(contador+1);
  }
  function handleDisminuirClick (){
    setContador(contador - 1);
  }

  function handleDepartamentosSelect(event){
    setDeptoSeleccionado(event.target.value);
  }

  function handleCiudadesSelect(event){
    setCiudadSeleccionada(event.target.value);
  }

  return (
    <div> 
      <label>Contador {contador} </label>
      <div>
        <button onClick={handleClick} > Aumentar contador </button>
      </div>
      <div>
        <button onClick={handleDisminuirClick} > Disminuir contador </button>
      </div>
      <div>
        <select id = "opcionesDepartamentos" value= {deptoSeleccionado} onChange={handleDepartamentosSelect}>
          <option value="">Seleccione un departamento</option>
          {departamentos.map(opcion =>(
          <opcion key={opcion.value} value={opcion.value}>{opcion.label}</opcion>
          ))}
        </select>
      </div>
      <div>
        <select id = "opcionesCiudades" value= {ciudadSeleccionada} onChange={handleCiudadesSelect}>
          <option value="">Seleccione una ciudad</option>
          {ciudades.map(opcion =>(
          <opcion key={opcion.value} value={opcion.value}>{opcion.label}</opcion>
          ))}
        </select>
      </div>

    </div>
  );
}
