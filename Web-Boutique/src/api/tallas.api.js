import axios from "axios";

export const obtenerTallas = async()=>{
    return await axios.get('http://localhost:3000/tallas/obtener');
}