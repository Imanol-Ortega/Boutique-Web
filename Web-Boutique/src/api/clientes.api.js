import axios from "axios"

export const crearCliente = async(values)=>{
    return await axios.post('http://localhost:3000/clientes/guardar',values);
}