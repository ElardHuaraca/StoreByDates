'use server'

export async function GetStores() {
    const types = await fetch(process.env.API_ROUTE_BASE + "/stores", { cache: 'no-store' })
        .then(res => { if (res.ok) return res.json() })
        .catch(err => { console.error(err) })

    return types as IStoreModel[] | undefined
}

export async function CreateUpdateStores({ id, formData }: { id?: string, formData: FormData }) {
    const url = id ? process.env.API_ROUTE_BASE + "/stores/" + id : process.env.API_ROUTE_BASE + "/stores"
    const requestOptions: RequestInit = {
        cache: 'no-store',
        method: id ? 'PUT' : 'POST',
        body: formData
    }

    const store = await fetch(url, requestOptions)
        .then(res => {
            if (res.ok) return res.json()
            else if (res.status === 404) return undefined

        })
        .catch(err => { console.error(err) })

    return store as IStoreModel | undefined
}

export async function DeleteStore(id: string) {
    const reponse = await fetch(process.env.API_ROUTE_BASE + "/stores/" + id, { cache: 'no-store', method: 'DELETE' })
        .then(res => {
            if (res.ok) return true
            else return false
        })
        .catch(err => { console.error(err) })

    return reponse
}

export async function GetStoreByName(name: string) {
    const store = await fetch(process.env.API_ROUTE_BASE + "/stores/name/" + name, { cache: 'no-cache' })
        .then(res => {
            if (res.ok) return res.json()
            else if (res.status === 404) return undefined
        })
        .catch(err => { console.error(err) })

    return store as IStoreModel | undefined
}
