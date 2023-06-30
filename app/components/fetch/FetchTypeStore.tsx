'use server'

const fetchTypeStore = async () => {
    const response = await fetch(process.env.API_ROUTE_BASE + `/stores/type`)
    return response.json()
}

export async function FetchTypeStores() {
    const types = await fetchTypeStore()

    if (Object.keys(types).length === 0) return null

    return types
}