import React, { forwardRef, useImperativeHandle, useState } from "react"

const LoadingBar: React.ForwardRefRenderFunction<LoadingBarRef, {}> = (props, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingPercentage, setLoadingPercentage] = useState(1);

    useImperativeHandle(ref, () => ({
        updateLoadingState({ isLoading, loadingPercentage }) {
            setIsLoading(isLoading);
            setLoadingPercentage(loadingPercentage);
        },
    }));

    return (
        <div className="w-full">
            {/* loading type bar */}
            <div className={`w-full h-[1.2rem] bg-gray-400 rounded-2xl ${isLoading ? '' : 'hidden'}`}>
                <div className={`rounded-2xl h-full bg-teal-500 text-black font-semibold flex items-center justify-center`} style={{ 'width': loadingPercentage + '%' }}>
                    {loadingPercentage}%
                </div>
            </div>
        </div>
    )
}

export default forwardRef(LoadingBar)