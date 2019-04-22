export const refreshItem = isRefresh => {
    return {
        type: 'refreshItem',
        payload: isRefresh
    }
}
export const doneRefreshItem = items => {
    return {
        type: 'doneRefreshItem',
        payload: items
    }
}
export const scrollToItem = item => {
    return {
        type: 'scrollToItem',
        payload: item.scrollTo
    }
}