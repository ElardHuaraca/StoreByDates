'use client'

import { useState } from "react"
import { fetchStoresCatDalyst } from "./fetch/FetchStoreCatalyst"

export default function DetailStores({ store }: { store: IStoreModel }) {
    const [fetchState, setFetchState] = useState<any>(null)
    const [isLoading, setLoading] = useState(true)

    const fetchDetails = async () => {
        if (!isLoading) return
        const result = await fetchStoresCatDalyst({ data: store })
        setFetchState(result)
        setLoading(false)
    }
    return <details onClick={() => { fetchDetails() }}>
        <summary className="cursor-pointer">
            Mostrar Almacenes Catalyst
        </summary>
        {isLoading ? <div className="p-4">Loading . . .</div> : <div className="p-4">{fetchState}</div>}
    </details>

}