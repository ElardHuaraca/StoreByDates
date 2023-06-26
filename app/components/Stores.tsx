const fetchStores = () => fetch(process.env.API_ROUTE_BASE + "/stores", {
    cache: 'no-store'
}).then(res => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
}).catch(err => { console.error(err) })

export default async function Stores() {

    const stores: Store[] = await fetchStores()

    return (
        <table className="table-auto border-separate w-full text-center border-spacing-0">
            <thead>
                <tr>
                    <th className="border-l-[3px] border-y-[3px] border-emerald-600 bg-emerald-600 rounded-tl-2xl">STORE ONCE</th>
                    <th className="border-[3px] border-emerald-600 bg-emerald-600 rounded-tr-2xl">STORES</th>
                </tr>
            </thead>
            <tbody>
                {
                    stores?.map((store: Store) => {
                        return <tr key={store.id}>
                            <td className="border-b-2 border-l-2 border-emerald-600 py-2">{store.name}</td>
                            <td className="border-b-2 border-x-2 border-emerald-600 py-2">
                                <details>
                                    <summary className="cursor-pointer">
                                        Mostrar Stores
                                    </summary>
                                    {store.id}
                                </details>
                            </td>
                        </tr>
                    }) || <tr><td colSpan={2} className="border-b-2 border-x-2 border-emerald-600 py-2">No se ha registrado ningun STORE ONCE</td></tr>
                }
            </tbody>
        </table>
    )
}