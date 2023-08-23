'use server'
import { STRUCTURES, StoreConvertByteToRespectiveValue, StoreType } from '@/helpers/StoreSuport'
import { WriteFileXlsx } from '@/helpers/XLSX.helper'
import { Structure } from '@/models/Types'
import { headers } from 'next/dist/client/components/headers'

/* type_function_by_store_type by StoreType return await functions */
const fetch_information_by_store_type = {
    [StoreType.TYPE_1]: fetchStoresLower5650,
    [StoreType.TYPE_2]: fetStores49006600,
}

const fetch_catalyst_by_dates = {
    [StoreType.TYPE_1]: fetchStoreLower5650ToReport,
    [StoreType.TYPE_2]: fetchStore49006600ToReport,
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


export async function GenerateReport({ store, catalyst, dates }: { store: IStoreModel, catalyst: string, dates?: string[] }) {
    const store_type = storeType({ type: store.type_store!.name })

    if (!store_type) return
    let dates_selected: string[] | undefined = dates
    if (dates_selected![0] === '' || dates_selected![1] === '') dates_selected = undefined
    else dates_selected = dates_selected!.map(item => {
        /* isoString end with 00Z */
        const date = new Date(item)
        const format = date.toISOString().slice(0, -5) + 'Z'
        return format
    })

    await fetch_catalyst_by_dates[store_type.type]({ store, type: store_type, catalyst, dates: dates_selected })
}

const GetToken = async ({ ip, api_auth }: { ip?: string, api_auth?: string }) => {
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

    const credentials = await fetch(`https://${ip}/${api_auth}`, requestAuth)
        .then(res => {
            if (res.ok) return res.json()
            else return <p className='text-lg'>Error al autenticarse</p>
        }).catch(e => {
            console.log(e)
            return <p className='text-lg'>Ocurrio un error inesperado</p>
        })

    return credentials
}

async function fetchStoresLower5650({ type, data }: { type: Structure, data: IStoreModel }) {
    const credentials = await GetToken({ ip: data.ip, api_auth: type.api_auth })

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
                                <label htmlFor={`${data.ip}-${item.name}`} className="h-full w-full flex justify-evenly p-2 min-w-[70px]">
                                    <input type="checkbox" name={`${item.name}--${data.name}--${item.id}`} id={`${data.ip}-${item.name}`} className="scale-125" />
                                </label>
                            </div>
                            <div className="w-1/2 text-start border min-w-[215px]">
                                <p className="p-2 overflow-auto">{item.name}</p>
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
        cache: 'no-cache',
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
                                <label htmlFor={`${data.ip}-${item.name}`} className="h-full w-full flex justify-evenly p-2 min-w-[70px]">
                                    <input type="checkbox" name={`${item.name}--${data.name}--${item.ssid}-${item.storeId}`} id={`${data.ip}-${item.name}`} className="scale-125" />
                                </label>
                            </div>
                            <div className="w-1/2 text-start border min-w-[215px]">
                                <p className="p-2 overflow-auto">{item.name}</p>
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

async function fetchStoreLower5650ToReport({ store, type, catalyst, dates }: { store: IStoreModel, type: Structure, catalyst: string, dates?: string[] }) {
    const credentials = await GetToken({ ip: store.ip, api_auth: type.api_auth })

    if (credentials === undefined || credentials.access_token === undefined) return credentials

    const requestInit: RequestInit = {
        cache: 'no-cache',
        headers: {
            'Authorization': type.authorization(credentials.access_token),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            'filters': dates === undefined ? {} : {
                'createdDateStart': dates![0],
                'createdDateEnd': dates![1]
            }
        })
    }

    const [catalyst_name, catalyst_ref] = catalyst.split('--')

    const warehouses_response = await fetch(`https://${store.ip}/${type.api_elements_all({ key_1: catalyst_ref })}`, requestInit)
        .then(res => {
            if (res.ok) return res.json()
            else return "Ocurrio un error al procesar la informacion del alamacen"
        }).catch(e => {
            console.log(e)
            return `Ocurrio un error inesperado\n ${e}`
        })

    if (typeof warehouses_response !== 'string' && warehouses_response.members.length !== 0) {
        const data = warehouses_response.members
        const items = data.map((item: { dataModifiedDate: string | number | Date; name: any; tagList: any; userBytes: any }) => {
            const date = new Date(item.dataModifiedDate)
            return {
                'modified': date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
                'element': item.name,
                'label': item.tagList,
                'data_size': StoreConvertByteToRespectiveValue({ bytes: item.userBytes })
            }
        })
        const headers = { 'modified': 'Modified', 'element': 'Element', 'label': 'Tag List', 'data_size': 'Data Size', 'ultimate': '' }

        WriteFileXlsx({ catalyst_name: catalyst_name, store_name: store.name, data: items, headers_data: headers })
    }
}

async function fetchStore49006600ToReport({ store, type, catalyst, dates }: { store: IStoreModel, type: Structure, catalyst: string, dates?: string[] }) {
    const requestInit: RequestInit = {
        cache: 'no-cache',
        headers: {
            'Authorization': type.authorization(`${process.env.USER_STORE}:${process.env.PASSWORD_STORE}`),
            'Host': store.ip!,
            'Accept': '*/*',
            'Cookie': dates === undefined ? 'waypoint_prev=;waypoint_next=mGkFx0VJgfAAAAAAAAAAACpiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAA;filter="";' : type.cokie_to_dates!({ time_start: dates![0], time_end: dates![1] })
        },
        credentials: 'include'
    }

    const [catalyst_name, catalyst_ref] = catalyst.split('--')
    const [catalyst_id, catalyst_store_id] = catalyst_ref.split('-')

    const warehouses_response = await fetch(`https://${store.ip}/${type.api_elements_all({ key_1: catalyst_id, key_2: catalyst_store_id })}`, requestInit)
        .then(async (res) => {
            if (res.ok) {
                /* fix json */
                let text = await res.text()
                if (text.indexOf('"item":  {') === -1) return []
                text = text.replace('"items":  {', '"items":  [')
                text = text.replaceAll('"item":  {', '{')
                text = text.replace('}\n}\n}', '}\n]\n}')
                return JSON.parse(text).items
            }
            else return "Ocurrio un error al procesar la informacion del alamacen"
        }).catch(e => {
            console.log(e)
            return `Ocurrio un error inesperado\n ${e}`
        })

    if (typeof warehouses_response !== 'string' && warehouses_response.length !== 0) {
        const items = warehouses_response.map((item: {
            properties: {
                dataModified: string | number | Date
                name: any
                tagList: any
                dataSize: number,
                created: string | number | Date
            }[]
        }) => {
            const date_ = new Date(item.properties[0].created)
            const date = new Date(item.properties[0].dataModified)
            return {
                'modified': item.properties[0].name,
                'element': date_.toLocaleDateString() + ' ' + date_.toLocaleTimeString(),
                'label': date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
                'data_size': item.properties[0].tagList,
                'ultimate': StoreConvertByteToRespectiveValue({ bytes: item.properties[0].dataSize })
            }
        })
        const headers = { 'modified': 'Catalyst Item Name', 'element': 'Created', 'label': 'Last Modified', 'data_size': 'Tag List', 'ultimate': 'Data Size' }

        WriteFileXlsx({ catalyst_name: catalyst_name, store_name: store.name, data: items, headers_data: headers })
    }
}