import { Metadata } from "next"
import { ButtonComponent } from "../components/ButtonComponent"
import Stores from "../components/Stores"

export const metadata: Metadata = {
    title: 'Manejo de Stores'
}

export default function StoreHome() {

    return (
        <main className="p-8">
            <div className="w-1/6 flex justify-center border-2 border-white rounded-lg p-3">
                <ButtonComponent textButton="Añadir Store" data-modal-target="modal_" data-modal-toggle="modal_"
                    className="p-2 bg-sky-400 text-black rounded-lg font-medium transition hover:bg-sky-600  duration-200" />
            </div>
            <div className="min-w-full py-4">
                <Stores type="write" />
            </div>
        </main>
    )
}