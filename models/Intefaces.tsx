interface IStoreModel {
    id: string
    name: string
    ip?: string
    type_id?: number
    type_store?: IType_Store
}

interface IStoreEntity {
    id: string
    name: string
    ip: string
    type_id: number
}

interface IType_Store {
    id: number
    name: string
}

interface IDetailStoreModel {
    ip: string,
    type_name: string
}