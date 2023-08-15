import { Structure } from "@/models/Types"

/* enum */
export enum StoreType {
    TYPE_1, TYPE_2
}

/* data */
export const STRUCTURES: Structure[] = [
    {
        type: StoreType.TYPE_1,
        types: '3640, 4640, 5650',
        api_auth: 'pml/login/authenticatewithobject',
        api_uuid: 'pml/clustermanagement',
        api_catalyst: 'rest/index/resources',
        api_elements: ({ key_1: id }) => `api/v1/data-services/cat/stores/store/${id}/filter`,
        authorization: (key: string) => { return `Bearer ${key}` }
    },
    {
        type: StoreType.TYPE_2,
        types: '4900, 6600',
        api_catalyst: 'd2dservices/cluster/allstores?media=json&ui=gui',
        api_elements: ({ key_1: id, key_2: store_id }) => `d2dservices/cluster/servicesets/${id}/services/cat/stores/${store_id}/items/?media=json&list=this`,
        authorization: (key: string) => { return `Basic ${btoa(key)}` }
    }
]


export function StoreConvertByteToRespectiveValue({ bytes }: { bytes: number }) {
    const byte = 1024
    const mebiByte = byte * byte
    const gibiByte = mebiByte * byte
    const tebiByte = gibiByte * byte
    const pebiByte = tebiByte * byte

    if (bytes >= pebiByte) {
        return (bytes / pebiByte).toFixed(1) + 'PiB'
    } else if (bytes >= tebiByte) {
        return (bytes / tebiByte).toFixed(1) + 'TiB'
    } else if (bytes >= gibiByte) {
        return (bytes / gibiByte).toFixed(1) + 'GiB'
    } else if (bytes >= mebiByte) {
        return (bytes / mebiByte).toFixed(1) + 'MiB'
    } else {
        return bytes + 'B'
    }
}