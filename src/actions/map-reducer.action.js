export const onKeywordSearchbarChanged = text => {
    return {
        type: 'onKeywordSearchbarChanged',
        payload: text
    }
}
export const onKeywordSearchbarServicePressed = service => {
    return {
        type: 'onKeywordSearchbarServicePressed',
        payload: service
    }
}
export const onKeywordSearchbarTypePressed = type => {
    return {
        type: 'onKeywordSearchbarTypePressed',
        payload: type
    }
}
export const onLocationSearchbarChanged = text => {
    return {
        type: 'onLocationSearchbarChanged',
        payload: text
    }
}
export const onOptionOrderPressed = order => {
    return {
         type: 'onOptionOrderPressed',
         payload: order
    }
}
export const onOptionTypePressed = type => {
    return {
        type: 'onOptionTypePressed',
        payload: type
    }
}
export const onOptionCurrentlyOpenPressed = currentlyOpen => {
    return {
        type: 'onOptionCurrentlyOpenPressed',
        payload: currentlyOpen
    }
}
export const onKeywordSearchbarFocused = focus => {
    return {
        type: 'onKeywordSearchbarFocused',
        payload: focus
    }
}
export const onLocationSearchbarFocused = focus => {
    return {
        type: 'onLocationSearchbarFocused',
        payload: focus
    }
}
export const onLocationSearchbarPressed = location => {
    return {
        type: 'onLocationSearchbarPressed',
        payload: location
    }
}
export const closeSearchbar = () => {
    return {
        type: 'closeSearchbar'
    }
}
export const onMapModalPressed = () => {
    return {
        type: 'onMapModalPressed'
    }
}

export const setLoading = loading => {
    return {
        type: 'setLoading',
        payload: loading
    }
}
export const triggerRefresh = loading => {
    return {
        type: 'triggerRefresh',
        payload: loading
    }
}
// export const doneRefresh = loading => {
//     return {
//         type: 'doneRefresh',
//         payload: loading
//     }
// }
export const onCoordinatesChanged = location => {
    return {
        type: 'onCoordinatesChanged',
        payload: location
    }
}
export const onRadiusChanged = radius => {
    return {
        type: 'onRadiusChanged',
        payload: radius
    }
}
export const onMarkersDisplayed = markers => {
    return {
        type: 'onMarkersDisplayed',
        payload: markers
    }
}
export const onSearchedLocationChanged = location => {
    return {
        type: 'onSearchedLocationChanged',
        payload: location
    }
}
export const setVisibleFilterModal = visible => {
    return {
        type: 'setVisibleFilterModal',
        payload: visible
    }
}
// export const refreshShops = shops => {
//     return {
//         type: 'refreshShops',
//         payload: shops
//     }
// }
export const onSearchCoordinates = position => {
    return {
        type: 'onSearchCoordinates',
        payload: position
    }
}
export const onCurrentPosition = position => {
    return {
        type: 'onCurrentPosition',
        payload: position
    }
}