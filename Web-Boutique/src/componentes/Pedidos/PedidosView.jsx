/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { cambiarEstadoPedidos, obtenerPedidos } from "../../api/pedidos.api";

function PedidosView() {
    const [pedidos, setPedidos] = useState([]);
    const [filterPedido, setFilterPedido] = useState([]);

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [detalle, setDetalle] = useState([]);
    const itemsPerPage = 10;

    const cargarPedidos = async () => {
        try {
            const rp = await obtenerPedidos();
            setPedidos(rp.data);
            setFilterPedido(rp.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filtrado = (filter) => {
        if (filter) {
            setFilterPedido(
                filterPedido.filter((producto) =>
                    producto.clientenombre
                        .toLowerCase()
                        .includes(filter.toLowerCase())
                )
            );
        } else {
            setFilterPedido(pedidos);
        }
    };
    const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % filterPedido.length;
        setItemOffset(newOffset);
    };

    const convertirFecha = (fecha) => {
        const date = new Date(fecha);
        const formatteDate = date.toLocaleDateString();
        return formatteDate;
    };

    const finalizarPedido = async (id) => {
        try {
            const rp = await cambiarEstadoPedidos(id, { pedidoestado: "C" });
            cargarPedidos();
        } catch (error) {
            console.log(error);
        }
    };

    const entregarPedido = async (id) => {
        try {
            const rp = await cambiarEstadoPedidos(id, { pedidoestado: "E" });
            cargarPedidos();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        cargarPedidos();
    }, []);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filterPedido.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filterPedido.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, filterPedido]);

    return (
        <div className="h-full font-sans bg-cover ">
            <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                <div className="w-full max-w-6xl -mt-48">
                    <div className="py-8">
                        <div className="flex w-full justify-center font-sans font-semibold text-xl mb-5">
                            <p className="text-black">Pedidos</p>
                        </div>

                        <div className="my-2 flex justify-end mr-4 ml-4 p-1 bg-amber-500 rounded sm:flex-row flex-col">
                            <div className="block relative">
                                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4 fill-current text-gray-500"
                                    >
                                        <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                                    </svg>
                                </span>

                                <input
                                    placeholder="Filtrar"
                                    onChange={(e) =>
                                        filtrado(e.currentTarget.value)
                                    }
                                    className="appearance-none rounded-r rounded sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-gray-300 text-sm placeholder-gray-400 text-gray-900 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                                />
                            </div>

                            {/*<div className="block relative ml-20 mt-1">
                                <Link
                                    to="/pedidos/nuevo"
                                    className="px-3 py-1 text-white font-light tracking-wider bg-green-700 hover:bg-green-600 rounded text-lg -ml-10 mr-2"
                                >
                                    Agregar
                                </Link>
                            </div>*/}
                        </div>

                        <div>
                            <section className="antialiased text-black font-semibold px-4 mt-5 bg-cover rounded">
                                <div className="flex flex-col justify-center ">
                                    <div className="w-full  mx-auto  shadow-lg rounded-sm border border-gray-200">
                                        <div className="p-3">
                                            <div className="overflow-x-auto">
                                                <table className="table-auto w-full">
                                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-700">
                                                        <tr>
                                                            <th className="p-2 whitespace-nowrap ">
                                                                <div className="font-semibold text-left">
                                                                    ID
                                                                </div>
                                                            </th>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">
                                                                    CLIENTE
                                                                </div>
                                                            </th>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">
                                                                    FECHA
                                                                </div>
                                                            </th>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">
                                                                    TOTAL
                                                                </div>
                                                            </th>

                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">
                                                                    ESTADO
                                                                </div>
                                                            </th>
                                                            <th className="p-2 whitespace-nowrap">
                                                                <div className="font-semibold text-left">
                                                                    Acciones
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className="text-sm divide-y-2 divide-gray-100">
                                                        {currentItems.map(
                                                            (tipo, _index) => (
                                                                <tr
                                                                    key={
                                                                        tipo.pedidoid
                                                                    }
                                                                >
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        <div className="text-left">
                                                                            {
                                                                                tipo.pedidoid
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        <div className="text-left">
                                                                            {
                                                                                tipo.clientenombre
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        <div className="text-left">
                                                                            {convertirFecha(
                                                                                tipo.pedidofchpedido
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2 whitespace-nowrap">
                                                                        <div className="text-left">
                                                                            {
                                                                                tipo.pedidototal
                                                                            }
                                                                        </div>
                                                                    </td>

                                                                    <td className="p-2 whitespace-nowrap">
                                                                        <div className="text-left">
                                                                            {tipo.pedidoestado ==
                                                                            "P"
                                                                                ? "Pedido"
                                                                                : tipo.pedidoestado ==
                                                                                  "C"
                                                                                ? "Cancelado"
                                                                                : "Entregado"}
                                                                        </div>
                                                                    </td>

                                                                    <td className="p-2 whitespace-nowrap">
                                                                        <div className="text-right -ml-10">
                                                                            {tipo.pedidoestado ==
                                                                            "P" ? (
                                                                                <button
                                                                                    className="px-3 py-1 text-white font-light tracking-wider bg-amber-500 hover:bg-amber-600 rounded text-xs ml-1"
                                                                                    onClick={() =>
                                                                                        entregarPedido(
                                                                                            tipo.pedidoid
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    Entregar
                                                                                </button>
                                                                            ) : null}
                                                                            {tipo.pedidoestado !==
                                                                                "C" && (
                                                                                <button
                                                                                    className="px-3 py-1 text-white font-light tracking-wider bg-amber-800 hover:bg-amber-900 rounded text-xs ml-1"
                                                                                    onClick={() =>
                                                                                        finalizarPedido(
                                                                                            tipo.pedidoid
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    Cancelar
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                                <div className="w-full flex items-center justify-center mt-6">
                                                    <ReactPaginate
                                                        breakLabel="..."
                                                        nextLabel="siguiente >"
                                                        onPageChange={
                                                            handlePageClick
                                                        }
                                                        pageRangeDisplayed={3}
                                                        pageCount={pageCount}
                                                        previousLabel="< anterior"
                                                        renderOnZeroPageCount={
                                                            null
                                                        }
                                                        containerClassName="list-none flex justify-center align-middle mb-5 text-sm gap-1"
                                                        pageLinkClassName="px-6 py-15 cursor-pointer rounded font-normal hover:bg-gray-600 hover:text-white"
                                                        previousClassName="px-6 py-15 cursor-pointer rounded font-normal hover:bg-gray-600 hover:text-white"
                                                        nextLinkClassName="px-6 py-15 cursor-pointer rounded font-normal hover:bg-gray-600 hover:text-white"
                                                        activeClassName="active: bg-gray-700 text-white"
                                                    />
                                                </div>
                                                <div className="w-full flex items-center justify-center">
                                                    {filterPedido.length ==
                                                    0 ? (
                                                        <div className="font-mono text-amber-800 text-base mt-5 text-justify">
                                                            {" "}
                                                            No hay nada por
                                                            aquí...{" "}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PedidosView;
