'use server'

export async function fetchStoresById(id: string) {
    return new Promise<string>(async (resolve, _) => {
        setTimeout(() => resolve('response'), 5000)
    })
}