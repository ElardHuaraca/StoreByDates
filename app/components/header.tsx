import Link from "next/link"

const ROUTES = [
    {
        path: '/',
        title: 'Reporte'
    },
    {
        path: '/stores',
        title: 'Stores'
    }
]

export default function Header() {
    return (
        <div className="w-full min-h-[30px] p-4 shadow-lg">
            <div className="flex">
                {ROUTES.map(route => {
                    if (route.path === '/') {
                        return <a href={route.path} key={route.path}
                            className="p-3 text-lg underline underline-offset-4 decoration-2 transition hover:text-orange-400 duration-500">
                            {route.title}
                        </a>

                    }
                    return <Link href={route.path} key={route.path}
                        className="p-3 text-lg underline underline-offset-4 decoration-2 transition hover:text-orange-400 duration-500">
                        {route.title}
                    </Link>
                })}
            </div>
        </div>
    )
}