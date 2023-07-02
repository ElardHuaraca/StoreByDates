import { Metadata } from "next"
import { ButtonComponent } from "../components/ButtonComponent"
import Stores from "../components/Stores"

export const metadata: Metadata = {
    title: 'Manejo de Stores'
}

export default function Home() {

    return (
        <>
            <main className="p-8">
                <div className="w-1/6 flex justify-center border-2 border-white rounded-lg p-3">
                    <ButtonComponent textButton="Añadir Store" data-modal-target="modal_" data-modal-toggle="modal_"
                        className="p-2 bg-sky-400 text-black rounded-lg font-medium transition hover:bg-sky-600  duration-200" />
                </div>
                <div className="min-w-full py-4">
                    <Stores type="write" />
                </div>
            </main>
            <div id="modal_" data-modal-backdrop="static" aria-hidden={true} tabIndex={-1}
                className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)]">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="p-6 space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}