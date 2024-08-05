import { Link } from "react-router-dom";
import { useAuth } from "../../contexto/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, setuser } = useAuth();
    const navigate = useNavigate();

    const closeSession = () => {
        setuser([]);
        localStorage.clear("usuario");
        localStorage.clear("rol");
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
            <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logotipo de la boutique */}
                    <Link
                        to="/productos/vista"
                        className="text-gray-800 text-xl hover:text-amber-500 font-sans"
                    >
                        Tu Boutique
                    </Link>

                    {/* Menú de navegación */}
                    <div className="hidden sm:block">
                        <ul className="flex space-x-4">
                            <Link
                                to="/productos/vista"
                                className="text-gray-800 hover:text-amber-500 hover:underline hover:decoration-amber-800 hover:decoration-solid underline-offset-8 tracking-wider"
                            >
                                Productos
                            </Link>
                            {user.rol == 1 && (
                                <Link
                                    to="/pedidos/vista"
                                    className="text-gray-800 hover:text-amber-500 hover:underline hover:decoration-amber-800 hover:decoration-solid underline-offset-8"
                                >
                                    Pedidos
                                </Link>
                            )}
                        </ul>
                    </div>

                    {/* Botones de acción (opcional) */}
                    <div className="hidden sm:block">
                        {!user.usuario && (
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                <Link to="/login">Iniciar Sesion</Link>
                            </button>
                        )}

                        {user.usuario && (
                            <div className=" flex flex-1 flex-row">
                                <p className="text-black px-4 py-2 text-xl bg-amber-500 rounded-md">
                                    {user.usuario}
                                </p>
                                <button
                                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
                                    onClick={() => closeSession()}
                                >
                                    Cerrar Sesion
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
