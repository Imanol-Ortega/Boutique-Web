import axios from "axios";

export const guardarProducto = async(values)=>{
    return await axios.post('http://localhost:3000/productos/guardar',values);
};

export const obtenerProductos = async()=>{
    return await axios.get('http://localhost:3000/productos/obtener');
};

export const obtenerUnoProducto = async(id)=>{
    return await axios.get(`http://localhost:3000/productos/obtener/${id}`);
};

export const actualizarProducto = async(id,values)=>{
    return await axios.put(`http://localhost:3000/productos/actualizar/${id}`,values);
};

export const eliminarProducto = async(id)=>{
    return await axios.put(`http://localhost:3000/productos/eliminar/${id}`);
};