/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerPedidoUno } from "../../api/pedidos.api";

function PedidosCard() {
    const [pedido, setPedido] = useState([]);

    const params = useParams();

    const obtenerPedido = async () => {
        try {
            const rp = await obtenerPedidoUno(params.id);
            setPedido(rp.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        obtenerPedido();
    }, []);

    return <div>Hola</div>;
}

export default PedidosCard;
