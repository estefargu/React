import React , {useState, useEffect}from 'react';
import Axios from 'axios';
import './App.css';

export default function App() {
  const [restaurantData, setRestaurantData] = useState({ // variable con la informacion del restaurante
    restaurantName: '',
    restaurantNit: '',
    restaurantAddress: '',
    restaurantPhone: '',
    cityId: 0
  });
  const [contador, setContador] = useState(0); 
  const [departamentos, setDepartamentos] = useState([]);
  const [deptoSeleccionado, setDeptoSeleccionado] = useState('');
  const [ciudades, setCiudades] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');

  useEffect(()=>{ //obtener informacion del backend

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

  function handleChange(event){
    console.log(event.target); // solo para ver como funciona
    const {name, value} = event.target; //me trae toda la informacion de lo que estoy manipulando el target
    console.log( name + " ; " + value); // solo para ver como funciona
    setRestaurantData({
      ...restaurantData,
      [name]: value
    });

  }

//obtener el valor que yo ingrese en la parte del formulario que opara eso se usa el onchage

  const handleSubmit = async(event) =>{ // funcione que se declara como una variable
    try{
      const response = await Axios.post('http://localhost:1337/api/createrestaurant', restaurantData);
    }
    catch(error){
      console.log(error);
    }
  }

  return ( //html
    <div>
      <h2>Formulario Restaurante</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del restaurante</label>
          <input type='text' id="restaurantName" name="restaurantName" value={restaurantData.restaurantName} onChange={handleChange}></input>
        </div>
        <div>
          <label>NIT del restaurante</label>
          <input type='text' id="restaurantNit" name="restaurantNit" value={restaurantData.restaurantNit} onChange={handleChange}></input>        
        </div>
        
      </form>  
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
          <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
          ))}
        </select>
      </div>
      <div>
        <select id = "opcionesCiudades" value= {ciudadSeleccionada} onChange={handleCiudadesSelect}>
          <option value="">Seleccione una ciudad</option>
          {ciudades.map(opcion =>(
          <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
          ))}
        </select>
      </div>

    </div>
  );
}
