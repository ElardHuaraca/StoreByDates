import { StoreType } from "@/helpers/StoreSuport"

export type Structure = {
    type: StoreType
    types: string,
    api_auth?: string,
    api_uuid?: string,
    api_catalyst?: string,
    authorization: (key: string) => string

}

export type Data = {
    store: string,
    catalysts: string[]
}