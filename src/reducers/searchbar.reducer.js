
const INITIAL_DATA = {
    keywordSearchbar: {
        searchKeyword: '', loading: false, type: 'all', focus: false,
        limit: 10, skip: 0
    },
    locationSearchbar: { locationKeyword: '', loading: false, focus: false },
    optionbar: { order: 'thebest', type: 'all', currentlyOpen: true },
    searchTrigger: false
}

export default (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case 'onKeywordSearchbarChanged':
            return {
                ...state,
                keywordSearchbar: { ...state.keywordSearchbar, searchKeyword: action.payload }
            }
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
        case 'onMarkersDisplayed':
            return {
                ...state,
                mapSetting: {
                    ...state.mapSetting,
                    markers: action.payload.markers
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
        case 'setResultParams':
            return {
                ...state,
                keywordSearchbar: {
                    ...state.keywordSearchbar,
                    offset: action.payload.offset,
                    skip: action.payload.skip
                }
            }
        case 'isSearchTriggered':
            return {
                ...state,
                searchTrigger: action.payload
            }

        // case 'retrieveShopsBySearchItems': {
        //     //let { skip, searchKeyword, searchShopsByItems } = this.state;
        //     //let { searchLatitude, searchLongitude, radius } = this.props.mapSetting;
        //     let { searchKeyword, skip } = state.keywordSearchbar;
        //     let {searchLatitude, searchLongitude, radius} = action.payload;


        //     //this.setState({ searchMoreLoading: true });
        //     let result = await getShopsBySearchItem({ query: searchKeyword, limit: 5, skip, lat: searchLatitude, lng: searchLongitude, radius },  { current_lat: searchLatitude, current_lng: searchLongitude });

        //     if (result.result && !result.result.length) {
        //         return {
        //             ...state,
        //             keywordSearchbar: {...state.keywordSearchbar, has_more: false }
        //         }
        //       //this.setState({ has_more: false, searchMoreLoading: false, refreshing: false });
        //       return;
        //     }
        //     return {
        //         ...state,
        //         keywordSearchbar: {
        //             ...state.keywordSearchbar,
        //             searchMoreLoading: false
        //         }
        //     }
        //     this.setState({ searchMoreLoading: false, skip: skip + result.result.length, searchShopsByItems: [...searchShopsByItems, ...result.result], refreshing: false, onSearchDisplayed: true });
        //     return ;
        // }
        // case 'retrieveShopsBySearchName':{
        //     let { searchKeyword } = this.state;
        //     let { searchLatitude, searchLongitude, radius } = this.props.mapSetting;
        //     let result = await getShopsBySearchText({ query: searchKeyword, limit: 3, lat: searchLatitude, lng: searchLongitude, radius });
        //     this.setState({ refreshing: false, searchShopsByName: result.result, onSearchDisplayed: true });
        //     return;
        // }
        // () => {

        // }
        // return;
        // case 'doneRefresh':
        //     return {
        //         ...state,
        //         mapSetting: {
        //             ...state.mapSetting,
        //             triggerRefresh: false
        //         }
        //     }
        // case 'refreshShops':
        //     return {
        //         ...state,
        //         mapSetting: {
        //             ...state.mapSetting,
        //             shops: action.payload.shops
        //         }
        //     }
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

