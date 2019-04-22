export const updateUser = user => {
    return {
        type: 'updateUser',
        payload: user
    }
}
export const onAddFavoriteShopChange = shop_id => {
    return {
        type: 'onAddFavoriteShopChange',
        payload: shop_id
    }
}
export const onRemoveFavoriteShopChange = shop_id => {
    return {
        type: 'onRemoveFavoriteShopChange',
        payload: shop_id
    }
}
export const onAddFavoriteItemChange = item_id => {
    return {
        type: 'onAddFavoriteItemChange',
        payload: item_id
    }
}
export const onRemoveFavoriteItemChange = item_id => {
    return {
        type: 'onRemoveFavoriteItemChange',
        payload: item_id
    }
}