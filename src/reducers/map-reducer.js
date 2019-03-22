const INITIAL_DATA = {
    keywordSearchbar: { value: '', loading: false, service: 'shop', type: 'all', focus: false },
    locationSearchbar: { value: '', loading: false, focus: false },
    optionbar: { order: 'thebest', type:'restaurant', currentlyOpen: true },
    filterModal: { visible: false },
    mapSetting: {
        markers: [],
        showMap: false,
        loading: false,
        zoom: 14,
        centerLatitude: 0,
        centerLongitude: 0,
        defaultLength: 40000,
        radius: 10000 * 0.3,
        latitude: 0,
        longitude: 0,
        shops: [],
        // latitudeDelta: 0.03,
        // longitudeDelta: 0.03,

        // latitude: 45.52220671242907,
        // longitude: -122.6653281029795,
        latitudeDelta: 0.07,//0.04864195044303443,
        longitudeDelta: 0.07 //0.040142817690068
    }

};

export default mapReducer = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case 'onKeywordSearchbarChanged':
            return {
                ...state,
                keywordSearchbar: { value: action.payload }
            }
        case 'onKeywordSearchbarServicePressed':
            return {
                ...state,
                keywordSearchbar: { ...state.keywordSearchbar, service: action.payload }
            }
        case 'onKeywordSearchbarTypePressed':
            return {
                ...state,
                keywordSearchbar: { ...state.keywordSearchbar, type: action.payload }
            }
        case 'onLocationSearchbarChanged':
            return {
                ...state,
                locationSearchbar: { ...state.locationSearchbar, value: action.payload }
            }
        case 'onOptionOrderPressed':
            return {
                ...state,
                optionbar: { ...state.optionbar, order: action.payload }

                // setOrder = value => {
                //     if (this.state.order !== value) {
                //       this.setState({ order: value, orderDropDown: false }
                //       );
                //     } else {
                //       var items = this.state.displayItems.reverse();
                //       this.setState({ displayItems: items, orderDropDown: false });
                //     }
                //   };
            }
        case 'onOptionTypePressed':
            return {
                ...state,
                optionbar: { ...state.optionbar, type: action.payload }
            }
        case 'onOptionCurrentlyOpenPressed':
            return {
                ...state,
                optionbar: { ...state.optionbar, currentlyOpen: !state.optionbar.currentlyOpen }
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
                locationSearchbar: { ...state.locationSearchbar, value: action.payload }
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
        case 'onMapChanged':
            return {
                ...state,
                mapSetting: {
                    ...state.mapSetting,
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                    longitudeDelta: action.payload.longitudeDelta,
                    latitudeDelta: action.payload.latitudeDelta
                }
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
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                    latitudeDelta: action.payload.latitudeDelta,
                    longitudeDelta: action.payload.longitudeDelta
                }
            }
        case 'refreshShops':
            return{
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

