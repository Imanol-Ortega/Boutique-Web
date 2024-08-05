/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { eliminarProducto, obtenerProductos } from "../../api/productos.api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexto/AuthProvider";

function ProductosView() {
    const { user } = useAuth();

    const [productos, setproductos] = useState([]);
    const [productosView, setProductosView] = useState([]);
    const navigate = useNavigate();

    const cargarProductos = async () => {
        try {
            const rp = await obtenerProductos();
            setproductos(rp.data);
            setProductosView(rp.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleButtonDelete = async (id) => {
        try {
            const rp = eliminarProducto(id);
            setProductosView(productosView.filter((p) => p.productoid !== id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    return (
        <div className="h-screen font-sans">
            <div className="container m-auto flex flex-1 justify-center items-center mt-20 mb-10">
                <section className="py-10  h-full">
                    <div className="flex w-full justify-center font-sans font-semibold text-xl">
                        <p className="text-black">Productos</p>
                    </div>
                    {user.rol == 1 && (
                        <div className="flex h-8 w-16 space-x-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 px-4 py-1.5 text-white duration-100 ml-6 ">
                            <Link to="/productos/nuevo" className="text-sm">
                                Nuevo
                            </Link>
                        </div>
                    )}
                    <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {productosView.length !== 0 ? (
                            productosView.map((pr) => (
                                <article
                                    className="rounded-xl bg-white p-3 flex flex-col justify-between shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 border-2 border-gray-200"
                                    key={pr.productoid}
                                >
                                    <div className="relative flex items-center justify-center overflow-hidden rounded-xl w-xl">
                                        <img
                                            src={pr.productoimagen}
                                            alt="img"
                                            className="rounded-xl"
                                        />
                                    </div>

                                    <div className="mt-1 p-2">
                                        <h2 className="text-slate-700 font-semibold">
                                            {pr.productonombre}
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-400">
                                            {pr.productodescripcion}
                                        </p>

                                        <div className="mt-3 flex items-end justify-between">
                                            <p className="text-lg font-bold text-amber-500">
                                                {pr.productoprecio}
                                            </p>
                                        </div>
                                        {user.rol == 1 && (
                                            <div className="mt-3 flex items-end justify-start">
                                                <div className="flex items-center space-x-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 px-4 py-1.5 text-white duration-100 mr-1">
                                                    <Link
                                                        to={`/productos/editar/${pr.productoid}`}
                                                        className="text-sm"
                                                    >
                                                        Editar
                                                    </Link>
                                                </div>
                                                <div className="flex items-center space-x-1.5 rounded-lg bg-amber-800 hover:bg-amber-900 px-4 py-1.5 text-white duration-100 mr-1">
                                                    <button
                                                        className="text-sm"
                                                        onClick={() =>
                                                            handleButtonDelete(
                                                                pr.productoid
                                                            )
                                                        }
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="h-full min-w-full flex justify-center items-center">
                                <p className=" text-black">
                                    No hay nada por Aquí!!
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ProductosView;
