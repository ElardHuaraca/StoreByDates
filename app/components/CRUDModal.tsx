'use client'

import { useEffect, useState } from "react"
import { ButtonComponent } from "./ButtonComponent"
import { CreateUpdateStores } from "./fetch/FetchCRUDStore"
import { FetchTypeStores } from "./fetch/FetchTypeStore"
import UDStoreComponent from "./UDStoreComponent"
import { createRoot } from "react-dom/client"

export default function CRUDModal({ data, textButton, styleButton }: { data?: IStoreModel, textButton: string | JSX.Element, styleButton: string }) {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [typesStore, setTypesStore] = useState<IType_Store[] | undefined>(undefined)
    const [selectTypeStore, setSelectTypeStore] = useState<number | string>('')

    const clickOutsideModal = (e: any) => { if (e.target.id === data?.id) setIsOpenModal(false) }

    const createUpdateStore = async (formData: FormData) => {

        const response = await CreateUpdateStores({ id: data?.id, formData })

        /* reset form if data == undefined */
        if (data === undefined) {
            const form = document.getElementById('na') as HTMLFormElement
            form.reset()
            setSelectTypeStore('na')

            if (response === undefined) return
            /* Insert new Data to table */
            const table = document.querySelector('table') as HTMLTableElement
            const newRow = table.insertRow()
            newRow.setAttribute('tr-key', response.id)
            const col_1 = newRow.insertCell(0)
            const col_2 = newRow.insertCell(1)
            const col_3 = newRow.insertCell(2)
            const col_4 = newRow.insertCell(3)

            col_1.className = 'border-b-2 border-x-2 border-emerald-400 py-2'
            col_2.className = 'border-b-2 border-x-2 border-emerald-400 py-2'
            col_3.className = 'border-b-2 border-x-2 border-emerald-400 py-2'
            col_4.className = 'border-b-2 border-x-2 border-emerald-400 py-2'

            col_1.innerText = response.name
            col_2.innerText = response.ip!
            col_3.innerText = response.type_store?.name || 'N.A.'
            createRoot(col_4).render(<UDStoreComponent data={response} />)
        }

        setIsLoading(false)
        setIsOpenModal(false)
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
                        <form action={createUpdateStore} className="mt-4 space-y-8" id={data !== undefined ? data.name + data.ip : 'na'}
                            onSubmit={() => setIsLoading(true)}>
                            <div className="text-start">
                                <label htmlFor="name_store" className="block text-base font-medium text-white mb-2 m-0">Nombre:</label>
                                <input type="text" name="name_store" id="name_store" className="bg-gray-500 w-full rounded-lg h-8 px-4"
                                    placeholder="Nombre del Store" defaultValue={data?.name} required />
                            </div>
                            <div className="flex justify-between text-start pb-12">
                                <div className="w-[45%]">
                                    <label htmlFor="ip_store" className="block text-base font-medium text-white mb-2 m-0">IP:</label>
                                    <input type="text" name="ip_store" id="ip_store" className="bg-gray-500 w-full rounded-lg h-8 px-4"
                                        placeholder="Dirección del Store" defaultValue={data?.ip} required />
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
                                <button type="submit" disabled={isLoading}
                                    className={`${isLoading ? 'bg-blue-800 text-[#666666]' : 'bg-blue-600 text-white'} w-[70%] rounded-lg h-10 font-bold transition hover:bg-blue-800 duration-200`} >
                                    <div className="flex items-center justify-center">
                                        <div className={`w-6 h-6 rounded-full border-[3px] border-t-transparent border-gray-200 mx-3 animate-spin ${isLoading ? '' : 'hidden'}`}></div>
                                        {data?.id !== undefined ? 'Actualizar' : 'Guardar'}
                                    </div>
                                </button>
                                <button type="button" className="bg-red-500 w-[20%] rounded-lg h-10 font-bold" onClick={() => setIsOpenModal(!isOpenModal)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}