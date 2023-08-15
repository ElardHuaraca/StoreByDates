'use server'
import { STRUCTURES, StoreConvertByteToRespectiveValue, StoreType } from '@/helpers/StoreSuport'
import { Structure } from '@/models/Types'

/* type_function_by_store_type by StoreType return await functions */
const fetch_information_by_store_type = {
    [StoreType.TYPE_1]: fetchStoresLower5650,
    [StoreType.TYPE_2]: fetStores49006600,
}

const fetch_catalyst_by_dates = {
    [StoreType.TYPE_1]: fetStoreLower5650ToReport,
    [StoreType.TYPE_2]: fetStoreLower5650ToReport,
}

const storeType = ({ type }: { type: string }) => { return STRUCTURES.find((item) => item.types.includes(type)) ?? false }

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export async function fetchStoresCatDalyst({ data }: { data: IStoreModel }) {
    const data_Type = data.type_store?.name ?? false
    if (!data_Type) return <p className='text-lg'>Por favor asigne un tipo de store</p>

    const store_type = storeType({ type: data_Type })
    if (!store_type) return <p className='text-lg'>La version brindada no tiene soporte</p>

    /* call type_function_by_store_type */
    const response = await fetch_information_by_store_type[store_type.type]({ type: store_type, data })

    return (
        <ul>
            {response}
        </ul>
    )
}


export async function GenerateReport({ store, catalyst, dates }: { store: IStoreModel, catalyst: string, dates?: NodeListOf<HTMLInputElement> }) {
    const store_type = storeType({ type: store.type_store!.name })

    if (!store_type) return

    const response = await fetch_catalyst_by_dates[store_type.type]({ store, type: store_type, catalyst, dates: Array.from(dates!) })
}

async function fetchStoresLower5650({ type, data }: { type: Structure, data: IStoreModel }) {
    const requestAuth: RequestInit = {
        cache: 'no-cache',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'username': process.env.USER_STORE,
            'password': process.env.PASSWORD_STORE,
            'grant_type': 'password'
        }),

    }

    const credentials = await fetch(`https://${data.ip}/${type.api_auth}`, requestAuth)
        .then(res => {
            if (res.ok) return res.json()
            else return <p className='text-lg'>Error al autenticarse</p>
        }).catch(e => {
            console.log(e)
            return <p className='text-lg'>Ocurrio un error inesperado</p>
        })

    if (credentials === undefined || credentials.access_token === undefined) return credentials

    const requestUUID: RequestInit = {
        cache: 'no-cache',
        headers: {
            'Authorization': type.authorization(credentials.access_token),
            'Content-Type': 'application/json'
        }
    }

    const credentials_uuid = await fetch(`https://${data.ip}/${type.api_uuid}`, requestUUID)
        .then(async (res) => {
            if (res.ok) {
                const xml = await res.text()
                return xml.slice(xml.indexOf("<uuid>") + 6, xml.indexOf("</uuid>"))
            }
            else return <p className='text-lg'>Error al obtener la identidad del Store</p>
        }).catch(e => {
            console.log(e)
            return <p className='text-lg'>Ocurrio un error inesperado</p>
        })

    if (typeof credentials_uuid !== 'string') return credentials_uuid

    const store_catalyst = await fetch(`https://${data.ip}/${type.api_catalyst}?category=catalyst-stores&count=20&start=0&query=(systemUuid%3A%27${credentials_uuid}%27)%20AND%20(isCloudStore%3A%27false%27)&sort=name%3Aasc`, requestUUID)
        .then(res => {
            if (res.ok) return res.json()
            else return <p className='text-lg'>Error al obtener los Almacenes Catalysts</p>
        }).catch(e => {
            console.log(e)
            return <p className='text-lg'>Ocurrio un error inesperado</p>
        })
    return (
        <>
            {store_catalyst.members.map((item: any) => {
                return (
                    <li key={item.name}>
                        <div className="flex flex-row ps-4">
                            <div className="w-1/5 border">
                                <label htmlFor={`${data.ip}-${item.name}`} className="h-full w-full flex justify-evenly p-2">
                                    <input type="checkbox" name={`${item.name}--${data.name}--${item.id}`} id={`${data.ip}-${item.name}`} className="scale-125" />
                                </label>
                            </div>
                            <div className="w-1/2 text-start border">
                                <p className="p-2 overflow-visible">{item.name}</p>
                            </div>
                            <div className="w-1/5 border">
                                <p className="p-2">{StoreConvertByteToRespectiveValue({ bytes: item.userBytes })}</p>
                            </div>
                            <div className="w-1/5 border">
                                <p className="p-2">{StoreConvertByteToRespectiveValue({ bytes: item.diskBytes })}</p>
                            </div>
                        </div>
                    </li>
                )
            })}
        </>
    )

}

async function fetStores49006600({ type, data }: { type: Structure, data: IStoreModel }) {
    const authorization = type.authorization(`${process.env.USER_STORE}:${process.env.PASSWORD_STORE}`)
    const requestInit: RequestInit = {
        headers: {
            'Authorization': authorization,
        }
    }

    const store_catalyst = await fetch(`https://${data.ip}/${type.api_catalyst}`, requestInit)
        .then(res => {
            if (res.ok) return res.json()
            else return <p className='text-lg'>Error al obtener los Almacenes Catalysts</p>
        }).catch(e => {
            console.log(e)
            return <p className='text-lg'>Ocurrio un error inesperado</p>
        })

    if (store_catalyst === undefined || store_catalyst.list === undefined) return store_catalyst

    return (
        <>
            {store_catalyst.list.map((item: any) => {
                return (
                    <li key={item.name}>
                        <div className="flex flex-row ps-4">
                            <div className="w-1/5 border">
                                <label htmlFor={`${data.ip}-${item.name}`} className="h-full w-full flex justify-evenly p-2">
                                    <input type="checkbox" name={`${item.name}--${data.name}--${item.ssid}-${item.storeId}`} id={`${data.ip}-${item.name}`} className="scale-125" />
                                </label>
                            </div>
                            <div className="w-1/2 text-start border">
                                <p className="p-2 overflow-visible">{item.name}</p>
                            </div>
                            <div className="w-1/5 border">
                                <p className="p-2">{StoreConvertByteToRespectiveValue({ bytes: item.userBytes })}</p>
                            </div>
                            <div className="w-1/5 border">
                                <p className="p-2">{StoreConvertByteToRespectiveValue({ bytes: item.diskBytes })}</p>
                            </div>
                        </div>
                    </li>
                )
            })}
        </>
    )
}

async function fetStoreLower5650ToReport({ store, type, catalyst, dates }: { store: IStoreModel, type: Structure, catalyst: string, dates: HTMLInputElement[] }) {

}

async function fetchStore49006600ToReport({ store, type, catalyst, dates }: { store: IStoreModel, type: Structure, catalyst: string, dates: HTMLInputElement[] }) {
    const [date_start, date_end] = dates
    const authorization = type.authorization(`${process.env.USER_STORE}:${process.env.PASSWORD_STORE}`)
    const requestInit: RequestInit = {
        headers: {
            'Authorization': authorization,
        },
    }
    const warehouses = await fetch(`http://${store.ip}/${type.api_elements_all}`)
}