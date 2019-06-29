export const onSelectedShopId = shop_id => {
    return {
        type: 'onSelectedShopId',
        payload: shop_id
    }
}

export const onSearchShopsByItems = shops => {
    return {
        type: 'onSearchShopsByItems',
        payload: shops
    }
}
export const onSearchShopsByName = shops => {
    return {
        type: 'onSearchShopsByName',
        payload: shops
    }
}