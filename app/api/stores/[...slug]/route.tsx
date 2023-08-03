import { DeleteStore, StoreById, StoreByName, UpdateStore } from "@/helpers/DatabaseController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { slug: string[] } }) {
    const { slug } = params
    let store: IStoreModel | null = null

    if (slug.length >= 2) {
        store = await StoreByName({ name: slug[1] }) as IStoreModel
    } else {
        store = await StoreById({ id: slug[0] }) as IStoreModel
    }

    if (store === null) return NextResponse.json({}, { status: 404 })

    return NextResponse.json(store);
}

export async function DELETE(_: Request, { params }: { params: { slug: string[] } }) {
    const { slug } = params
    const response = await DeleteStore({ id: slug[0] })
    if (response !== 1) return NextResponse.json({}, { status: 404 })
    return NextResponse.json({ status: 200 })
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string[] } }) {
    const { slug } = params
    const { name_store, ip_store, version_store } = Object.fromEntries(await request.formData())
    const type = version_store === 'na' ? undefined : Number(version_store)
    const response = await UpdateStore({ id: slug[0], name: name_store.toString(), ip: ip_store.toString(), type })

    if (response !== 1) return NextResponse.json({}, { status: 404 })

    const store = await StoreById({ id: slug[0] })
    console.log(store)

    return NextResponse.json(store)
}