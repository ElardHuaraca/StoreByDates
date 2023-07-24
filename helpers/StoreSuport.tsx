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
