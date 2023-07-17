'use client'

import { ButtonComponent } from "./ButtonComponent"
import CRUDModal from "./CRUDModal"
import { DeleteStore } from "./fetch/FetchCRUDStore"
import TrashIcon from "./svg/TrashIcon"
import WriteIcon from "./svg/WriteIcon"

export default function UDStoreComponent({ data }: { data: IStoreModel }) {

    const clickAlertConfirm = async () => {
        const windowsAlert = window.confirm("¿Desea eliminar el registro?")
        if (windowsAlert) {
            const response = await DeleteStore(data.id)

            if (response) {
                /* delete row parent from table */
                const parent = document.querySelector(`tr[tr-key="${data.id}"]`)
                parent?.remove()
            }
        }
    }

    return (
        <div className="flex flex-row justify-center">
            <div className="p-2">
                <ButtonComponent textButton={<TrashIcon className="w-full" />}
                    onClick={() => clickAlertConfirm()}
                    className="bg-red-500 rounded-lg py-2 px-4 w-14 h-10 flex items-center content-center transition hover:bg-red-400 duration-300" />
            </div>
            <div className="p-2">
                <CRUDModal data={data} textButton={<WriteIcon className="w-11/12" />}
                    styleButton="bg-sky-500 rounded-lg py-2 px-4 w-14 h-10 flex items-center content-center transition hover:bg-sky-400 duration-300" />
            </div>
        </div>
    )
}