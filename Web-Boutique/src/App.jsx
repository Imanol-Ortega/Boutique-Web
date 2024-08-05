import { Route, Routes } from "react-router-dom";
import Navbar from "./componentes/Navbar/Navbar";
import NotFound from "./componentes/NotFound/NotFound";
import { Toaster } from "react-hot-toast";

import Login from "./componentes/Sesion/Login";
import Register from "./componentes/Sesion/Register";
import ProductosForm from "./componentes/Productos/ProductosForm";
import ProductosView from "./componentes/Productos/ProductosView";
import { useAuth } from "./contexto/AuthProvider";
import { useEffect } from "react";
import PedidosView from "./componentes/Pedidos/PedidosView";
import PedidosCard from "./componentes/Pedidos/PedidosCard";

function App() {
    const { user, setuser } = useAuth();

    useEffect(() => {
        const usuario = localStorage.getItem("usuario");
        const rol = localStorage.getItem("rol");
        setuser({ usuario, rol });
    }, [setuser]);

    return (
        <div className="h-screen text-blue-50">
            <div className="m-auto h-full">
                {user.usuario && <Navbar />}
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {user.usuario && (
                        <>
                            <Route
                                path="/productos/vista"
                                element={<ProductosView />}
                            />
                            <Route path="/" element={<ProductosView />} />

                            {user.rol == 1 && (
                                <Route
                                    path="/productos/nuevo"
                                    element={<ProductosForm />}
                                />
                            )}
                            {user.rol == 1 && (
                                <Route
                                    path="/pedidos/detalle/:id"
                                    element={<PedidosCard />}
                                />
                            )}
                            {user.rol == 1 && (
                                <Route
                                    path="/productos/editar/:id"
                                    element={<ProductosForm />}
                                />
                            )}
                            {user.rol == 1 && (
                                <Route
                                    path="/pedidos/vista"
                                    element={<PedidosView />}
                                />
                            )}
                        </>
                    )}
                </Routes>
                <Toaster />
            </div>
        </div>
    );
}

export default App;
