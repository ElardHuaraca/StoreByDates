'use server'

export async function GetStores() {
    const types = await fetch(process.env.API_ROUTE_BASE + "/stores", { cache: 'no-store' })
        .then(res => { if (res.ok) return res.json() })
        .catch(err => { console.error(err) })

    if (Object.keys(types).length === 0) return undefined

    return types as IStoreModel[]
}

export async function CreateUpdateStores({ id, formData }: { id?: string, formData: FormData }) {
    console.log(id, formData)
}