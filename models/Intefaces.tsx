interface StoreModel {
    id: number
    name: string
}

interface StoreEntity {
    id: number
    name: string
    ip: string
    type_id: number
}

interface Type_Store{
    id: number
    name: string
}

interface DetailStoreModel {
    ip: string,
    type_name: string
}