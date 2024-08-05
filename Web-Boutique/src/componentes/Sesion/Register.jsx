/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { registrar } from "../../api/user.api";
import { useAuth } from "../../contexto/AuthProvider";
import { crearCliente } from "../../api/clientes.api";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const navigate = useNavigate();
    const { user } = useAuth();

    const submit = handleSubmit(async (values) => {
        try {
            const rp = await registrar({
                name: values.name,
                password: values.password,
                rol: 2,
            });
            const rp2 = await crearCliente({
                clientenombre: values.clientenombre,
                clientetelefono: values.clientetelefono,
                clientedireccion: values.clientedireccion,
                clientedocumento: values.clientedocumento,
                tipodocumentoid: values.tipodocumentoid,
                usuarioid: rp.data.usuarioid,
            });
            toastSucess();
            navigate("/login");
        } catch (error) {
            toastError(error.response.data.error);
        }
    });

    const toastSucess = () => {
        toast.success("Se guardo Correctamente", {
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
        <div>
            <div className="h-screen font-sans sm:mt-48 2xl:mt-6">
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <form
                                onSubmit={submit}
                                className="max-w-full p-10 bg-black rounded shadow-xl flex justify-center flex-col"
                            >
                                <p className="text-white text-center text-lg font-bold">
                                    Registrarse
                                </p>

                                <label className="block text-sm text-white mt-3">
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

                                <label className="block text-sm text-white mt-3">
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

                                <label className="block text-sm text-white mt-3">
                                    Nombre
                                </label>
                                <input
                                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    type="text"
                                    placeholder="Nombre"
                                    {...register("clientenombre", {
                                        required: true,
                                    })}
                                />
                                {errors.clientenombre && (
                                    <div className="text-red-500">
                                        El campo esta vacio
                                    </div>
                                )}

                                <label className="block text-sm text-white mt-3">
                                    Telefono
                                </label>
                                <input
                                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    type="text"
                                    placeholder="Telefono"
                                    {...register("clientetelefono", {
                                        required: true,
                                    })}
                                />
                                {errors.clientetelefono && (
                                    <div className="text-red-500">
                                        El campo esta vacio
                                    </div>
                                )}

                                <label className="block text-sm text-white mt-3">
                                    Dirección
                                </label>
                                <input
                                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    type="text"
                                    placeholder="Dirección"
                                    {...register("clientedireccion", {
                                        required: true,
                                    })}
                                />
                                {errors.clientedireccion && (
                                    <div className="text-red-500">
                                        El campo esta vacio
                                    </div>
                                )}

                                <label className="block text-sm text-white mt-3">
                                    Nro. Documento
                                </label>
                                <input
                                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    type="text"
                                    placeholder="Nro de Documento"
                                    {...register("clientedocumento", {
                                        required: true,
                                    })}
                                />
                                {errors.password && (
                                    <div className="text-red-500">
                                        El campo esta vacio
                                    </div>
                                )}

                                <label className="block text-sm text-white mt-3">
                                    Tipo de Documento
                                </label>
                                <select
                                    className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    {...register("tipodocumentoid", {
                                        required: true,
                                    })}
                                >
                                    <option value="">
                                        Seleccione una Opción
                                    </option>
                                    <option value="1">CI</option>
                                    <option value="2">DNI</option>
                                </select>

                                <div className="flex w-full items-center justify-center">
                                    <button
                                        className=" px-4 py-1 mt-4 text-white font-light tracking-wider bg-amber-500 hover:bg-amber-600 rounded"
                                        type="submit"
                                    >
                                        Registrarse
                                    </button>
                                </div>
                                <div className="justify-center pt-5 flex-row gap-2">
                                    <p className="text-lg text-gray-300 font-normal">
                                        Ya tienes una cuenta?
                                    </p>
                                    <Link
                                        to="/login"
                                        className=" text-lg font-semibold text-amber-500"
                                    >
                                        Iniciar Sesion
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
