const INITIAL_DATA = {
    refreshVoucher: false
}

export default (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case 'onVoucherRedeemed':
            return {
                ...state,
                refreshVoucher: true
            }
        case 'onVoucherRefreshed':
            return {
                ...state,
                refreshVoucher: false
            }
        default:
            return state;
    }
}
