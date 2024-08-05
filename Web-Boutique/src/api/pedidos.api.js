import axios from "axios";

export const obtenerPedidos = async()=>{
    return await axios.get('http://localhost:3000/pedidos/obtener');
}

export const cambiarEstadoPedidos = async(id,estado)=>{
    return await axios.put(`http://localhost:3000/pedidos/actualizar/estado/${id}`,estado);
}
export const obtenerPedidoUno = async(id)=>{
    return await axios.get(`http://localhost:3000/pedidos/obtener/${id}`);
}