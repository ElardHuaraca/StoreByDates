'use client'

import { useState } from "react"
import { fetchStoresById } from "./FetchStoreCatalyst"

export function DetailStores({ id }: { id: string }) {
    const [fetchState, setFetchState] = useState<string | null>(null)
    const [isLoading, setLoading] = useState(true)

    const fetchDetails = async () => {
        const result = await fetchStoresById(id)
        setFetchState(result)
        setLoading(false)
    }
    return <details onClick={() => { fetchDetails() }}>
        <summary className="cursor-pointer">
            Mostrar Stores
        </summary>
        {isLoading ? <div>Loading . . .</div> : <p>{fetchState}</p>}
    </details>

}