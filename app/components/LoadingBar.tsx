export default function LoadingBar({ id }: { id: string }) {
    return (
        <div className="w-full">
            {/* loading type bar */}
            <div className="w-full h-[1.2rem] bg-gray-400 rounded-2xl hidden">
                <div id={id} className="w-[1%] rounded-s-2xl h-full bg-teal-500 text-center text-black font-semibold flex items-center justify-center">
                    1%
                </div>
            </div>
        </div>
    )
}