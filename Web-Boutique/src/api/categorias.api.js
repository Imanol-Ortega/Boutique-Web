import axios from "axios";

export const obtenerCategorias = async()=>{
    return await axios.get('http://localhost:3000/categorias/obtener');
}