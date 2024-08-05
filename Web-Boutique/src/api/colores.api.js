import axios from "axios";

export const obtenerColores = async()=>{
    return await axios.get('http://localhost:3000/colores/obtener');
}