const INITIAL_DATA = {
    filterModal: { visible: false },
    markers: [],
    showMap: false,
    loading: false,
    triggerRefresh: false,
    zoom: 14,
    defaultLength: 40000,
    radius: 100000 * 0.02,
    shops: [],


    currentLatitude: 0,
    currentLongitude: 0,
    latitudeDelta: 0.07,
    longitudeDelta: 0.07,

    searchLongitude: 0,
    searchLatitude: 0
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
                locationSearchbar: { ...state.locationSearchbar, locationKeyword: action.payload }
            }
        case 'onOptionOrderPressed':
            return {
                ...state,
                optionbar: { ...state.optionbar, order: action.payload }
            }
        case 'onOptionTypePressed':
            return {
                ...state,
                optionbar: {
                    ...state.optionbar,
                    type: action.payload
                }
            }
        case 'onOptionCurrentlyOpenPressed':
            return {
                ...state,
                optionbar: {
                    ...state.optionbar,
                    currentlyOpen: !state.optionbar.currentlyOpen
                }
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
                locationSearchbar: { ...state.locationSearchbar, locationKeyword: action.payload }
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
                showMap: !state.showMap
            }

        case 'onMarkersDisplayed':
            return {
                ...state,
                markers: action.payload.markers
            }
        case 'onCoordinatesChanged':
            return {
                ...state,
                longitudeDelta: action.payload.longitudeDelta,
                latitudeDelta: action.payload.latitudeDelta,
                searchLatitude: action.payload.latitude,
                searchLongitude: action.payload.longitude
            }
        case 'onSearchCoordinates':
            return {
                ...state,
                searchLatitude: action.payload.latitude,
                searchLongitude: action.payload.longitude
            }
        case 'onCurrentPosition':
            return {
                ...state,
                currentLatitude: action.payload.latitude,
                currentLongitude: action.payload.longitude
            }



        case 'setLoading':
            return {
                ...state,
                loading: action.payload
            }

        case 'triggerRefresh':
            return {
                ...state,
                triggerRefresh: true

            }
        // case 'refreshShops':
        //     return {
        //         ...state,
        //         shops: action.payload.shops

        //     }
        // case 'doneRefresh':
        //     return {
        //         ...state,
        //         triggerRefresh: false

        //     }
        case 'onRadiusChanged':
            return {
                ...state,
                radius: action.payload

            }


        // case 'onSearchedLocationChanged':
        // return {
        //     ...state,
        //     locationSearchbar: {
        //         ...state.locationSearchbar,
        //         searchedLocationLatitude: action.payload.latitude,
        //         searchedLocationLongitude: action.payload.longitude
        //     }
        // }

        // case 'setVisibleFilterModal':
        //     return {
        //         ...state,
        //         filterModal: {
        //             visible: action.payload
        //         }
        //     }
        default:
            return state;
    }

}

