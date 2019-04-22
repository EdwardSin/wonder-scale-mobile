const INITIAL_DATA = {
    keywordSearchbar: { keyword_value: '', loading: false, type: 'all', focus: false },
    locationSearchbar: { location_value: '', loading: false, focus: false, searchedLocationLongitude: 0, searchedLocationLatitude: 0 },
    optionbar: { order: 'thebest', type: 'restaurant', currentlyOpen: true },
    filterModal: { visible: false },
    mapSetting: {
        markers: [],
        showMap: false,
        loading: false,
        triggerRefresh: false,
        //type: 'restaurant',
        zoom: 14,
        defaultLength: 40000,
        radius: 100000 * 0.03,
        currentPosition: {},
        circleLatitude: 3.0918247019900864 || 0,
        circleLongitude: 101.75889492975712 || 0,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
        shops: []
    }

};

export default (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case 'onKeywordSearchbarChanged':
            return {
                ...state,
                keywordSearchbar: { ...state.keywordSearchbar, keyword_value: action.payload }
            }
        // case 'onKeywordSearchbarServicePressed':
        //     return {
        //         ...state,
        //         keywordSearchbar: { ...state.keywordSearchbar, service: action.payload }
        //     }
        case 'onKeywordSearchbarTypePressed':
            return {
                ...state,
                keywordSearchbar: { ...state.keywordSearchbar, type: action.payload }
            }
        case 'onLocationSearchbarChanged':
            return {
                ...state,
                locationSearchbar: { ...state.locationSearchbar, location_value: action.payload }
            }
        case 'onOptionOrderPressed':
            return {
                ...state,
                optionbar: { ...state.optionbar, order: action.payload }
            }
        case 'onOptionTypePressed':
            return {
                ...state,
                optionbar: { ...state.optionbar, 
                        type: action.payload }
            }
        case 'onOptionCurrentlyOpenPressed':
            return {
                ...state,
                optionbar: { ...state.optionbar, 
                    currentlyOpen: !state.optionbar.currentlyOpen }
            }
        case 'onKeywordSearchbarFocused':
            return {
                ...state,
                keywordSearchbar: { ...state.keywordSearchbar, focus: true },
                locationSearchbar: { ...state.locationSearchbar, focus: false }
            }
        case 'onLocationSearchbarPressed':
            return {
                ...state,
                locationSearchbar: { ...state.locationSearchbar, location_value: action.payload }
            }
        case 'onLocationSearchbarFocused':
            return {
                ...state,
                keywordSearchbar: { ...state.keywordSearchbar, focus: false },
                locationSearchbar: { ...state.locationSearchbar, focus: true }
            }
        case 'closeSearchbar':
            return {
                ...state,
                keywordSearchbar: { ...state.keywordSearchbar, focus: false },
                locationSearchbar: { ...state.locationSearchbar, focus: false }
            }
        case 'onMapModalPressed':
            return {
                ...state,
                mapSetting: { ...state.mapSetting, showMap: !state.mapSetting.showMap }
            }
        
        case 'onMarkersDisplayed':
            return {
                ...state,
                mapSetting: {
                    ...state.mapSetting,
                    markers: action.payload.markers
                }
            }
        case 'onCoordinatesChanged':
            return {
                ...state,
                mapSetting: {
                    ...state.mapSetting,
                    longitudeDelta: action.payload.longitudeDelta,
                    latitudeDelta: action.payload.latitudeDelta,
                    circleLatitude: action.payload.latitude,
                    circleLongitude: action.payload.longitude
                }
            }
        case 'onSearchedLocationChanged':
            return {
                ...state,
                locationSearchbar: {
                    ...state.locationSearchbar,
                    searchedLocationLatitude: action.payload.latitude,
                    searchedLocationLongitude: action.payload.longitude
                }
            }
        case 'onCurrentPositionChange':
            return {
                ...state,
                mapSetting: {
                    ...state.mapSetting,
                    currentPosition: action.payload
                }
            }
        case 'setLoading':
            return {
                ...state,
                mapSetting: {
                    ...state.mapSetting,
                    loading: action.payload
                }
            }
        case 'triggerRefresh':
            return {
                ...state,
                mapSetting: {
                    ...state.mapSetting,
                    triggerRefresh: true
                }
            }
        case 'doneRefresh':
            return {
                ...state,
                mapSetting: {
                    ...state.mapSetting,
                    triggerRefresh: false
                }
            }
        case 'refreshShops':
            return {
                ...state,
                mapSetting: {
                    ...state.mapSetting,
                    shops: action.payload.shops
                }
            }
        case 'onRadiusChanged':
            return {
                ...state,
                mapSetting: {
                    ...state.mapSetting,
                    radius: action.payload
                }
            }
        case 'setVisibleFilterModal':
            return {
                ...state,
                filterModal: {
                    visible: action.payload
                }
            }
        default:
            return state;
    }

}

