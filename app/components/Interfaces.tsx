interface LoadingBarRef {
    updateLoadingState({ isLoading, loadingPercentage }: { isLoading: boolean, loadingPercentage: number }): void
}