'use client'

import { Data } from "@/models/Types"
import { ButtonComponent } from "./ButtonComponent"
import { GetStoreByName } from "./fetch/FetchCRUDStore"
import React, { useEffect, useRef, useState } from "react"
import { Root, createRoot } from "react-dom/client"
import LoadingBar from "./LoadingBar"

export default function ButtonGenerateReport() {

    const [loadingPercentage, setLoading] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const loadingBarRef = useRef<LoadingBarRef | null>(null)

    let root: Root | null = null

    const btnGenerateReport = async () => {
        const root_conteiner_loading = document.getElementById('loading_container') as HTMLDivElement
        const table = document.querySelector('table')
        const inputs_from_seccond_col = table?.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement> | undefined

        if (inputs_from_seccond_col?.length === 0) return alert("Es necesario seleccionar algun 'ALMACEN CATALYST'")

        if (root === null) root = createRoot(root_conteiner_loading)
        if (!root_conteiner_loading?.hasChildNodes()) root.render(<LoadingBar ref={loadingBarRef} />)


        const selected_inputs = Array.from(inputs_from_seccond_col!).filter((input) => input.checked)
        const data: Data[] = []

        /*create object {store,catalyst[]} get name from input */
        for (let j = 0; j < selected_inputs.length; j++) {
            const [catalyst_name, store_name] = selected_inputs[j].name.split('--')
            const index = data.findIndex(item => item.store?.name === store_name)
            if (index === -1) {
                const store = await GetStoreByName(store_name)
                data.push({ store, catalysts: [catalyst_name] })
            }
            else data[index].catalysts.push(catalyst_name)
        }

        const end = selected_inputs.length
        let start = 1

        for (let index = 0; index < data.length; index++) {
            const { store, catalysts } = data[index];
            for (let j = 0; j < catalysts.length; j++) {
                const prom = (start / end * 100).toFixed(0)
                setIsLoading(true)
                setLoading(Number(prom))
                start++
                await new Promise(resolve => setTimeout(resolve, 3000));
            }

        }

        setIsLoading(false)
        setLoading(1)
        alert("Reporte generado")
    }

    useEffect(() => {
        if (loadingBarRef.current) {
            loadingBarRef.current.updateLoadingState({ isLoading, loadingPercentage })
        }
    }, [isLoading, loadingPercentage])

    return (
        <>
            <ButtonComponent textButton="Generar reporte" onClick={() => btnGenerateReport()}
                className="w-auto p-2 bg-sky-400 text-black rounded-lg font-medium transition hover:bg-sky-600  duration-200" />
        </>

    )
}