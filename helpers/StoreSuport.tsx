/* types */
export type Structure = {
    types: string,
    api_auth: string,
    api_uuid?: string,
    api_catalyst?: string,
    authorization: (key: string) => string

}

/* enum */
export enum StoreType {
    TYPE_1, TYPE_2
}

/* data */
export const STRUCTURES: Structure[] = [
    {
        types: '3640, 4640, 5650',
        api_auth: 'pml/login/authenticatewithobject',
        api_uuid: 'pml/clustermanagement',
        api_catalyst: 'rest/index/resources',
        authorization: (key: string) => { return `Bearer ${key}` }
    },
    {
        types: '4900, 6600',
        api_auth: '/fusion/authheartbeat?media=txt',
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