import _ from 'lodash';

const INITIAL_DATA = {
    user: {
        first_name: 'Edward'
    },
    isSignedIn: false,
    favorite_items: [],
    favorite_shops: []
}

export default (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case 'updateUser':
            return {
                ...state,
                user: action.payload,
                isSignedIn: true,
                favorite_shops: action.payload.follow.shops,
                favorite_items: action.payload.follow.items
            }
        case 'onAddFavoriteShopChange':
            return {
                ...state,
                favorite_shops: _.union(state.favorite_shops, [action.payload])
            }
        case 'onRemoveFavoriteShopChange':
            return {
                ...state,
                favorite_shops: _.filter(state.favorite_shops, action.payload)
            }
        case 'onAddFavoriteItemChange':
            return {
                ...state,
                favorite_items: _.union(state.favorite_items, [action.payload])
            }
        case 'onRemoveFavoriteItemChange':
            return {
                ...state,
                favorite_items: _.filter(state.favorite_items, action.payload)
            }
        default:
            return state;
    }
}
