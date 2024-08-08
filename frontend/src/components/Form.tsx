"use client";
import Link from 'next/link';
import { Formik } from 'formik';
import { useState } from 'react';
import { usePostDataMutation } from '@/redux/services/formApi';

export default function Form() {
    interface FormValues {
        nombreUsuario: string;
        eMail: string;
        empresa: string;
        rubroEmpresa: string;
        mensaje: string;
    }

    const [form, setForm] = useState(false);
    const [postData, { isLoading, error, isSuccess }] = usePostDataMutation();

    return (
        <>
            <Formik 
                initialValues={{
                    nombreUsuario: "",
                    eMail: "",
                    empresa: "",
                    rubroEmpresa: "",
                    mensaje: "",
                }} 
                validate={(valores) => {
                    const errores: Partial<FormValues> = {};

                    if (!valores.nombreUsuario) {
                        errores.nombreUsuario = "Por favor ingrese un nombre";
                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombreUsuario)) {
                        errores.nombreUsuario =    "El nombre solo puede contener letras y espacios";
                    }

                    if (!valores.eMail) {
                        errores.eMail = "Por favor ingrese un correo electrónico";
                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.eMail)) {
                        errores.eMail= "El correo solo puede contener letras, números, puntos, guiones, guion bajo y @";
                    }

                    if (!valores.empresa) {
                        errores.empresa = "Por favor ingrese un nombre de empresa";
                    }

                    if (!valores.rubroEmpresa) {
                        errores.rubroEmpresa = "Por favor ingrese un rubro de empresa";
                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.rubroEmpresa)) {
                        errores.rubroEmpresa = "El rubro de empresa solo puede contener letras y espacios";
                    }

                    if (!valores.mensaje) {
                        errores.mensaje = "Por favor ingrese un mensaje";
                    }

                    return errores;
                }}

                onSubmit={async (values, { resetForm }) => {
                    console.log(values)
                    setForm(true);
                    setTimeout(() => {
                        setForm(false);
                    }, 4000);
                    resetForm();
                    await postData(values).unwrap()
                }}
            >
                {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                    <div className="flex items-center justify-center bg-[#E6E4E1] px-9">
                        <form id="contactForm" className="mx-auto w-[1058px] bg-white p-8 rounded-2xl shadow-md m-8" onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-bold mb-6 text-center uppercase">Contáctanos</h2>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="nombre" className="mb-2 text-sm font-medium text-gray-700">Nombre Completo</label>
                                <input 
                                    type="text"  
                                    id="nombreUsuario" 
                                    name="nombreUsuario" 
                                    placeholder="Bonnie Green" 
                                    className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={values.nombreUsuario}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                /> 
                                {touched.nombreUsuario && errors.nombreUsuario && <p className='text-red-600'>{errors.nombreUsuario}</p>}
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">Email</label>
                                <input 
                                    type="email" 
                                    id="eMail" 
                                    name="eMail" 
                                    placeholder="bonniegreen@gmail.com" 
                                    className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={values.eMail}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.eMail&& errors.eMail && <p className='text-red-600'>{errors.eMail}</p>}
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="empresa" className="mb-2 text-sm font-medium text-gray-700">Empresa</label>
                                <input 
                                    type="text" 
                                    id="empresa" 
                                    name="empresa" 
                                    placeholder="BonnieSLR" 
                                    className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={values.empresa}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.empresa && errors.empresa && <p className='text-red-600'>{errors.empresa}</p>}
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="rubroEmpresa" className="mb-2 text-sm font-medium text-gray-700">Rubro Empresa</label>
                                <input 
                                    type="text"  
                                    id="rubroEmpresa" 
                                    name="rubroEmpresa" 
                                    placeholder="Bonnie Green" 
                                    className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={values.rubroEmpresa}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.rubroEmpresa && errors.rubroEmpresa && <p className='text-red-600'>{errors.rubroEmpresa}</p>}
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="mensaje" className="mb-2 text-sm font-medium text-gray-700">Mensaje</label>
                                <textarea 
                                    name="mensaje" 
                                    id="mensaje" 
                                    placeholder='Bonnie Green'
                                    className='px-3 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                                    value={values.mensaje}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.mensaje && errors.mensaje && <p className='text-red-600'>{errors.mensaje}</p>}
                            </div>
                            <p className='text-xs'> 
                                Al enviar este formulario, acepta nuestros <span className="text-lightBlue underline"><Link href="#">términos y condiciones</Link></span> {" "}
                                y nuestra <span className="text-lightBlue underline"><Link href="#">política de privacidad</Link></span>,
                                que explica cómo podemos recopilar, utilizar y divulgar su información personal, incluso a terceros.
                            </p>

                            <button 
                                type="submit"
                                className="p-2 mt-8 text-white bg-newOrange mx-auto flex rounded-lg shadow-md cursor-pointer"
                            > 
                                {isLoading ? 'Enviando...' : 'Contactar'}
                            </button>
                            {form &&(
                                <p className='text-green-500 text-center m-3'>Formulario enviado con éxito</p>
                            )}
                        </form>
                    </div>
                )}
            </Formik>
        </>
    );
}
