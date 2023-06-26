'use client'

import { useState } from "react"
import { fetchStoresCatalystById } from "./FetchStoreCatalyst"

export function DetailStores({ id }: { id: string }) {
    const [fetchState, setFetchState] = useState<DetailStore | null>(null)
    const [isLoading, setLoading] = useState(true)

    const fetchDetails = async () => {
        if (!isLoading) return
        const result = await fetchStoresCatalystById(id)
        setFetchState(result)
        setLoading(false)
    }
    return <details onClick={() => { fetchDetails() }}>
        <summary className="cursor-pointer">
            Mostrar Stores
        </summary>
        {isLoading ? <div>Loading . . .</div> : <p>{fetchState?.ip}</p>}
    </details>

}