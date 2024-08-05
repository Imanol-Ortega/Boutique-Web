/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { obtenerColores } from "../../api/colores.api";
import { obtenerTallas } from "../../api/tallas.api";
import { obtenerCategorias } from "../../api/categorias.api";
import {
    actualizarProducto,
    guardarProducto,
    obtenerUnoProducto,
} from "../../api/productos.api";

function ProductosForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const [talla, setTalla] = useState([]);
    const [tallaSelect, setTallaSelect] = useState([]);
    const [color, setColor] = useState([]);
    const [colorSelect, setColorSelect] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [image, setImage] = useState(null);
    const [imageEdit, setImageEdit] = useState(null);
    const [error, setError] = useState("");
    const imageRef = useRef(null);

    const submit = handleSubmit(async (values) => {
        try {
            if (!tallaSelect || !colorSelect || !image) {
                setError("Seleccione una opcion");
            } else {
                let img;
                if (imageEdit != image) {
                    img = await toBase64(image);
                } else {
                    img = image;
                }
                const formData = {
                    ...values,
                    productoimagen: img,
                    tallas: tallaSelect,
                    colores: colorSelect,
                };
                try {
                    if (params.id) {
                        await actualizarProducto(params.id, formData);
                    } else {
                        await guardarProducto(formData);
                    }
                    toastSucess();
                    navigate("/productos/vista");
                } catch (error) {
                    toastError(error);
                }
            }
        } catch (error) {
            console.log(error);
            //toastError(error.response.data.message);
        }
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                imageRef.current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const toBase64 = async (file) => {
        const reader = new FileReader();
        const result = await new Promise((resolve, reject) => {
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
        return result;
    };

    const toastSucess = () => {
        toast.success("Guardado Correctamente", {
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

    const cargarTalla = async () => {
        try {
            const rp = await obtenerTallas();
            setTalla(rp.data);
        } catch (error) {
            toastError(error);
        }
    };

    const cargarColor = async () => {
        try {
            const rp = await obtenerColores();
            setColor(rp.data);
        } catch (error) {
            toastError(error);
        }
    };

    const cargarCategorias = async () => {
        try {
            const rp = await obtenerCategorias();
            setCategoria(rp.data);
        } catch (error) {
            toastError(error);
        }
    };

    const handleButtonColor = (id) => {
        const isColor = colorSelect.some((color) => color.colorid === id);
        if (isColor) {
            setColorSelect(colorSelect.filter((c) => c.colorid !== id));
        } else {
            setColorSelect([...colorSelect, { colorid: id }]);
        }
        console.log(colorSelect);
    };

    const handleButtonTalla = (id) => {
        const isTalla = tallaSelect.some((tall) => tall.tallaid === id);
        if (isTalla) {
            setTallaSelect(tallaSelect.filter((t) => t.tallaid !== id));
        } else {
            setTallaSelect([...tallaSelect, { tallaid: id }]);
        }
    };

    const cargarProducto = async () => {
        try {
            const rp = await obtenerUnoProducto(params.id);
            console.log(rp.data);
            setValue("productonombre", rp.data.productos[0].productonombre);
            setValue(
                "productodescripcion",
                rp.data.productos[0].productodescripcion
            );
            setValue("productocantidad", rp.data.productos[0].productocantidad);
            setValue("productoprecio", rp.data.productos[0].productoprecio);
            setValue("categoriaid", rp.data.productos[0].categoriaid);
            setValue(
                "productocatpersona",
                rp.data.productos[0].productocatpersona
            );
            setImage(rp.data.productos[0].productoimagen);
            setImageEdit(rp.data.productos[0].productoimagen);
            setColorSelect(rp.data.colores);
            setTallaSelect(rp.data.tallas);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (params.id) {
            cargarProducto(params.id);
        }
        cargarTalla();
        cargarColor();
        cargarCategorias();
    }, []);

    return (
        <div className="h-screen font-sans">
            <div className="container m-auto flex flex-1 justify-center items-center mt-20 mb-10">
                <div className="w-full max-w-xl">
                    <div className="leading-loose">
                        <form
                            onSubmit={submit}
                            className="max-w-full p-10 bg-black rounded shadow-xl flex justify-center flex-col"
                        >
                            <p className="text-white text-center text-lg font-bold">
                                Producto
                            </p>

                            <label className="block text-sm text-white mt-3">
                                Nombre del Producto
                            </label>
                            <input
                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Nombre"
                                {...register("productonombre", {
                                    required: true,
                                })}
                            />
                            {errors.productonombre && (
                                <div className="text-red-500">
                                    El campo esta vacio
                                </div>
                            )}

                            <label className="block text-sm text-white mt-3">
                                Descripcion
                            </label>
                            <input
                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Descripcion"
                                {...register("productodescripcion", {
                                    required: true,
                                })}
                            />
                            {errors.productodescripcion && (
                                <div className="text-red-500">
                                    El campo esta vacio
                                </div>
                            )}

                            <label className="block text-sm text-white mt-3">
                                Cantidad
                            </label>
                            <input
                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                type="number"
                                placeholder="Cantidad"
                                {...register("productocantidad", {
                                    required: true,
                                })}
                            />
                            {errors.productocantidad && (
                                <div className="text-red-500">
                                    El campo esta vacio
                                </div>
                            )}

                            <label className="block text-sm text-white mt-3">
                                Precio/Unidad
                            </label>
                            <input
                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                type="number"
                                placeholder="Precio"
                                {...register("productoprecio", {
                                    required: true,
                                })}
                            />
                            {errors.productoprecio && (
                                <div className="text-red-500">
                                    El campo esta vacio
                                </div>
                            )}

                            <label className="block text-sm text-white">
                                Imagen
                            </label>
                            <input
                                type="file"
                                ref={imageRef}
                                onChange={handleImageChange}
                                placeholder="Seleccionar Imagen"
                            />

                            {image && (
                                <img
                                    ref={imageRef}
                                    src={image}
                                    alt="Imagen seleccionada"
                                    className="object-scale-down h-16 w-16"
                                />
                            )}
                            {error.length !== 0 && (
                                <div className="text-red-500">
                                    Seleccione una Opcion
                                </div>
                            )}

                            <label className="block text-sm text-white mt-3">
                                Categoria Persona
                            </label>
                            <select
                                className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                {...register("productocatpersona", {
                                    required: true,
                                })}
                            >
                                <option value="">Seleccione una Opcion</option>
                                <option value="H">HOMBRE</option>
                                <option value="M">MUJER</option>
                                <option value="N">NIÑOS</option>
                            </select>
                            {errors.productocatpersona && (
                                <div className="text-red-500">
                                    Seleccione una Opcion
                                </div>
                            )}

                            <label className="block text-sm text-white mt-3">
                                Categoria Producto
                            </label>
                            <select
                                className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                {...register("categoriaid", {
                                    required: true,
                                })}
                            >
                                <option value="">Seleccione una Opcion</option>
                                {categoria.map((cat) => (
                                    <option
                                        value={cat.categoriaid}
                                        key={cat.categoriaid}
                                    >
                                        {cat.categorianombre}
                                    </option>
                                ))}
                            </select>
                            {errors.categoriaid && (
                                <div className="text-red-500">
                                    Seleccione una Opcion
                                </div>
                            )}
                            <label className="block text-sm text-white mt-3 -mb-1">
                                Colores Disponibles
                            </label>
                            <div className="flex w-full justify-stretch flex-row flex-wrap">
                                {color.map((col) => (
                                    <button
                                        type="button"
                                        className={`text-black font-semibold px-4 py-1 mt-4 tracking-wider bg-amber-300 hover:bg-amber-400 rounded m-1  ${
                                            colorSelect.some(
                                                (colo) =>
                                                    colo.colorid === col.colorid
                                            )
                                                ? "bg-amber-600"
                                                : ""
                                        }`}
                                        key={col.colorid}
                                        onClick={() =>
                                            handleButtonColor(col.colorid)
                                        }
                                    >
                                        {col.colornombre}
                                    </button>
                                ))}
                            </div>
                            {error.length !== 0 && (
                                <div className="text-red-500">
                                    Seleccione una Opcion
                                </div>
                            )}
                            <label className="block text-sm text-white mt-3 -mb-1">
                                Tallas Disponibles
                            </label>
                            <div className="flex w-full justify-stretch flex-row flex-wrap">
                                {talla.map((tall) => (
                                    <button
                                        type="button"
                                        className={`text-black font-semibold px-4 py-1 mt-4 tracking-wider bg-amber-300 hover:bg-amber-400 rounded m-1  ${
                                            tallaSelect.some(
                                                (tal) =>
                                                    tal.tallaid === tall.tallaid
                                            )
                                                ? "bg-amber-600"
                                                : ""
                                        }`}
                                        key={tall.tallaid}
                                        onClick={() =>
                                            handleButtonTalla(tall.tallaid)
                                        }
                                    >
                                        {tall.tallanombre}
                                    </button>
                                ))}
                            </div>
                            {error.length !== 0 && (
                                <div className="text-red-500">
                                    Seleccione una Opcion
                                </div>
                            )}

                            <div className="flex w-full items-center justify-center">
                                <button
                                    className=" px-4 py-1 mt-4 text-white font-light tracking-wider bg-amber-500 hover:bg-amber-600 rounded"
                                    type="submit"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductosForm;
