import { StoreType } from "@/helpers/StoreSuport"

export type Structure = {
    type: StoreType
    types: string,
    api_auth?: string,
    api_uuid?: string,
    api_catalyst?: string,
    api_elements_all: ({ key_1, key_2 }: { key_1: string, key_2?: string }) => string,
    cokie_to_dates?: ({ time_start, time_end }: { time_start: string, time_end: string }) => string,
    authorization: (key: string) => string
}

export type Data = {
    store?: IStoreModel,
    catalysts: string[],
    dates?: string[]
}