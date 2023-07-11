'use client'

import React, { useState } from "react"
import { ButtonComponent } from "./ButtonComponent"
import { CreateUpdateStores } from "./fetch/FetchCRUDStore"

export default function CRUDModal({ id, textButton, styleButton }: { id?: string, textButton: string | JSX.Element, styleButton: string }) {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const clickOutsideModal = (e: any) => { if (e.target.id === id) setIsOpenModal(false) }

    const createUpdateStore = async (formData: FormData) => {
        setIsLoading(true)

        await CreateUpdateStores({ id, formData })
    }

    return (
        <>
            <ButtonComponent textButton={textButton} className={styleButton} onClick={() => setIsOpenModal(!isOpenModal)} />
            <div className={`fixed z-40 bg-gray-800 bg-opacity-60 w-full inset-0 ${isOpenModal ? '' : 'hidden'}`}></div>
            <div id={id} tabIndex={-1} aria-hidden="true" data-modal-backdrop="static"
                onClick={(e) => clickOutsideModal(e)}
                className={`fixed top-0 left-0 right-0 z-50 ${isOpenModal ? '' : 'hidden'} w-full p-4 overflow-x-hidden
                overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center`}>
                <div className="relative w-full max-w-2xl min-h-[25rem] max-h-full bg-gray-700 rounded-xl">
                    <div className="relative p-6 min-h-full">
                        <h3 className="text-2xl font-medium text-white">{id !== undefined ? 'Editar' : 'Crear'}</h3>
                        <form action={createUpdateStore} className="mt-4 space-y-8">
                            <div className="text-start">
                                <label htmlFor="name_store" className="block text-base font-medium text-white mb-2 m-0">Nombre:</label>
                                <input type="text" name="name_store" id="name_store" className="bg-gray-500 w-full rounded-lg h-8 px-4" placeholder="Nombre del Store" />
                            </div>
                            <div className="flex justify-between text-start pb-12">
                                <div className="w-[45%]">
                                    <label htmlFor="ip_store" className="block text-base font-medium text-white mb-2 m-0">IP:</label>
                                    <input type="text" name="ip_store" id="ip_store" className="bg-gray-500 w-full rounded-lg h-8 px-4" placeholder="Dirección del Store" />
                                </div>
                                <div className="w-[45%]">
                                    <label htmlFor="version_store" className="block text-base font-medium text-white mb-2 m-0">Version:</label>
                                    <select name="version_store" id="version_store" className="bg-gray-500 w-full rounded-lg h-8 px-2">
                                        <option value="1.16.5">1.16.5</option>
                                        <option value="1.16.4">1.16.4</option>
                                        <option value="1.16.3">1.16.3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full space-x-12">
                                <button type="submit" disabled={isLoading} className="bg-blue-600 w-[70%] rounded-lg h-10 font-bold transition hover:bg-blue-800 duration-200">{id !== undefined ? 'Actualizar' : 'Guardar'}</button>
                                <button type="button" className="bg-red-500 w-[20%] rounded-lg h-10 font-bold" onClick={() => setIsOpenModal(!isOpenModal)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}