'use client'

import { useEffect, useState } from "react"
import { ButtonComponent } from "./ButtonComponent"
import { CreateUpdateStores } from "./fetch/FetchCRUDStore"
import { FetchTypeStores } from "./fetch/FetchTypeStore"

export default function CRUDModal({ data, textButton, styleButton }: { data?: IStoreModel, textButton: string | JSX.Element, styleButton: string }) {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [typesStore, setTypesStore] = useState<IType_Store[] | undefined>(undefined)
    const [selectTypeStore, setSelectTypeStore] = useState<number | string>('na')

    const clickOutsideModal = (e: any) => { if (e.target.id === data?.id) setIsOpenModal(false) }

    const createUpdateStore = async (formData: FormData) => {
        setIsLoading(true)
        await CreateUpdateStores({ id: data?.id, formData })
    }

    useEffect(() => {
        const typeStores = async () => {
            const result = await FetchTypeStores()
            setTypesStore(result)
        }
        typeStores()
        setSelectTypeStore(data?.type_id || 'na')
    }, [])

    return (
        <>
            <ButtonComponent textButton={textButton} className={styleButton} onClick={() => setIsOpenModal(!isOpenModal)} />
            <div className={`fixed z-40 bg-gray-800 bg-opacity-60 w-full inset-0 ${isOpenModal ? '' : 'hidden'}`}></div>
            <div id={data?.id} tabIndex={-1} aria-hidden="true" data-modal-backdrop="static"
                onClick={(e) => clickOutsideModal(e)}
                className={`fixed top-0 left-0 right-0 z-50 ${isOpenModal ? '' : 'hidden'} w-full p-4 overflow-x-hidden
                overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center`}>
                <div className="relative w-full max-w-2xl min-h-[25rem] max-h-full bg-gray-700 rounded-xl">
                    <div className="relative p-6 min-h-full">
                        <h3 className="text-2xl font-medium text-white">{data?.id !== undefined ? 'Editar' : 'Crear'}</h3>
                        <form action={createUpdateStore} className="mt-4 space-y-8">
                            <div className="text-start">
                                <label htmlFor="name_store" className="block text-base font-medium text-white mb-2 m-0">Nombre:</label>
                                <input type="text" name="name_store" id="name_store" className="bg-gray-500 w-full rounded-lg h-8 px-4"
                                    placeholder="Nombre del Store" defaultValue={data?.name}/>
                            </div>
                            <div className="flex justify-between text-start pb-12">
                                <div className="w-[45%]">
                                    <label htmlFor="ip_store" className="block text-base font-medium text-white mb-2 m-0">IP:</label>
                                    <input type="text" name="ip_store" id="ip_store" className="bg-gray-500 w-full rounded-lg h-8 px-4"
                                        placeholder="Dirección del Store" defaultValue={data?.ip}/>
                                </div>
                                <div className="w-[45%]">
                                    <label htmlFor="version_store" className="block text-base font-medium text-white mb-2 m-0">Version:</label>
                                    <select name="version_store" id="version_store" className="bg-gray-500 w-full rounded-lg h-8 px-2"
                                        value={selectTypeStore} onChange={(e) => setSelectTypeStore(e.target.value)}>
                                        <option value="na">N.A.</option>
                                        {
                                            typesStore?.map((item, index) => {
                                                return <option key={index} value={item.id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="w-full space-x-12">
                                <button type="submit" disabled={isLoading} className="bg-blue-600 w-[70%] rounded-lg h-10 font-bold transition hover:bg-blue-800 duration-200">{data?.id !== undefined ? 'Actualizar' : 'Guardar'}</button>
                                <button type="button" className="bg-red-500 w-[20%] rounded-lg h-10 font-bold" onClick={() => setIsOpenModal(!isOpenModal)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}