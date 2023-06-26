'use server'
const STRUCTURES = [
    {
        types: '3640, 4640, 5650',
        api_auth: '/pml/login/authenticatewithobject'
    },
    {
        types: '4900, 6600',
        api_auth: '/fusion/authheartbeat?media=txt'
    }
]

const fetchStoreDetails = async (id: string) => {
    const response = await fetch(process.env.API_ROUTE_BASE + `/stores/${id}`)
    return response.json()
}

/* https://10.0.75.57/pml/login/authenticatewithobject
 */
export async function fetchStoresCatalystById(id: string) {
    const details = await fetchStoreDetails(id) as DetailStore

    if (Object.keys(details).length === 0) return null

    return details
}