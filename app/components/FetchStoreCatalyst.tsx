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

/* https://10.0.75.57/pml/login/authenticatewithobject
 */
export async function fetchStoresCatalystById(id: string) {

    const api = () => {

    }
    return new Promise<string>(async (resolve, _) => {
        setTimeout(() => resolve('response'), 5000)
    })
}