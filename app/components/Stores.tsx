import UDStoreComponent from "./UDStoreComponent"
import DetailStores from "./DetailStores"
import { GetStores } from "./fetch/FetchCRUDStore"

type TStoreType = 'show' | 'write'

const STORES_TYPE_SHOW = ({ stores }: { stores?: IStoreModel[] }) => {
    return (
        <table className="table-auto border-separate w-full text-center border-spacing-0">
            <thead>
                <tr>
                    <th className=" w-1/2 border-l-[3px] border-y-[3px] border-emerald-400 bg-emerald-600 rounded-tl-2xl">STORE ONCE</th>
                    <th className=" w-1/2 border-[3px] border-emerald-400 bg-emerald-600 rounded-tr-2xl">Almacenes</th>
                </tr>
            </thead>
            <tbody>
                {stores?.map((store) => {
                    return (
                        <tr key={store.id}>
                            <td className="border-b-2 border-l-2 border-emerald-400 py-2">{store.name}</td>
                            <td className="border-b-2 border-x-2 border-emerald-400 py-2">
                                <DetailStores store={store} />
                            </td>
                        </tr>
                    )
                }) || <tr><td colSpan={3} className="border-b-2 border-x-2 border-emerald-400 py-2">No se ha registrado ningun STORE ONCE</td></tr>
                }
            </tbody>
        </table>
    )
}

const STORE_TYPE_WRITE = async ({ stores }: { stores?: IStoreModel[] }) => {

    return (<table className="table-auto border-separate w-full text-center border-spacing-0">
        <thead>
            <tr>
                <th className=" w-1/4 border-l-[3px] border-y-[3px] border-emerald-400 bg-emerald-600 rounded-tl-2xl">STORE ONCE</th>
                <th className=" w-1/4 border-[3px] border-emerald-400 bg-emerald-600">IP</th>
                <th className=" w-1/4 border-[3px] border-emerald-400 bg-emerald-600">Modelo</th>
                <th className=" w-1/4 border-r-[3px] border-y-[3px] border-emerald-400 bg-emerald-600 rounded-tr-2xl">Acciones</th>
            </tr>
        </thead>
        <tbody>
            {stores?.map((store) => {
                return (
                    <tr key={store.id} tr-key={store.id}>
                        <td className="border-b-2 border-l-2 border-emerald-400 py-2">{store.name}</td>
                        <td className="border-b-2 border-x-2 border-emerald-400 py-2">{store.ip}</td>
                        <td className="border-b-2 border-r-2 border-emerald-400 py-2">{store.type_store === null ? 'N.A.' : store.type_store?.name}</td>
                        <td className="border-b-2 border-x-2 border-emerald-400 py-2">
                            <UDStoreComponent data={store} />
                        </td>
                    </tr>
                )
            }) || <tr><td colSpan={4} className="border-b-2 border-x-2 border-emerald-400 py-2">No se ha registrado ningun STORE ONCE</td></tr>
            }
        </tbody>
    </table>
    )
}

export default async function Stores({ type }: { type: TStoreType }) {

    const stores = await GetStores()

    return (<>{type === 'show' ? STORES_TYPE_SHOW({ stores }) : await STORE_TYPE_WRITE({ stores })}</>)
}