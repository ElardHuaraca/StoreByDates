'use server'

export async function FetchTypeStores() {
    const types = await fetch(process.env.API_ROUTE_BASE + "/stores/type", { cache: 'no-store' })
        .then(res => { if (res.ok) return res.json() })
        .catch(err => { console.error(err) })

    if (Object.keys(types).length === 0) return undefined

    return types as IType_Store[]
}