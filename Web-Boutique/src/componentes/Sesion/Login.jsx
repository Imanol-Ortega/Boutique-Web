/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { login } from "../../api/user.api";
import { useAuth } from "../../contexto/AuthProvider";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const { setuser } = useAuth();
    const navigate = useNavigate();

    const submit = handleSubmit(async (values) => {
        try {
            const rp = await login(values);
            localStorage.setItem("usuario", rp.data.usuario);
            localStorage.setItem("rol", rp.data.rol);
            console.log(rp.data);
            setuser({ usuario: rp.data.usuario, rol: rp.data.rol });
            toastSucess();
            navigate("/productos/vista");
        } catch (error) {
            toastError(error.response.data.message);
        }
    });

    const toastSucess = () => {
        toast.success("Iniciado Correctamente", {
            position: "top-right",
            autoClose: 5000,
            style: {
                background: "#212121",
                color: "white",
            },
        });
    };

    const toastError = (error) => {
        toast.error(`${error}`, {
            position: "top-right",
            autoClose: 5000,
            style: {
                background: "#212121",
                color: "white",
            },
        });
    };

    return (
        <div className="h-screen font-sans ">
            <div className="container m-auto h-full flex flex-1 justify-center items-center ">
                <div className="w-full max-w-lg">
                    <div className="leading-loose">
                        <form
                            onSubmit={submit}
                            className="max-w-full p-10 bg-black rounded shadow-xl flex justify-center flex-col"
                        >
                            <p className="text-white text-center text-lg font-bold">
                                Iniciar Sesión
                            </p>

                            <label className="block text-sm text-white mt-7">
                                Usuario
                            </label>
                            <input
                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Usuario"
                                {...register("name", { required: true })}
                            />
                            {errors.usuario && (
                                <div className="text-red-500">
                                    El campo esta vacio
                                </div>
                            )}

                            <label className="block text-sm text-white mt-7">
                                Contraseña
                            </label>
                            <input
                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                type="password"
                                placeholder="Contraseña"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            {errors.password && (
                                <div className="text-red-500">
                                    El campo esta vacio
                                </div>
                            )}
                            <div className="flex w-full items-center justify-center">
                                <button
                                    className=" px-4 py-1 mt-4 text-white font-light tracking-wider bg-amber-500 hover:bg-amber-600 rounded"
                                    type="submit"
                                >
                                    Iniciar Sesion
                                </button>
                            </div>
                            <div className="justify-center pt-5 flex-row gap-2">
                                <p className="text-lg text-gray-300 font-normal">
                                    No tienes una cuenta?
                                </p>
                                <Link
                                    to="/register"
                                    className=" text-lg font-semibold text-amber-500"
                                >
                                    Registrarse
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
