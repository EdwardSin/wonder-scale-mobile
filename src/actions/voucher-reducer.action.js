export const onVoucherRedeemed = result => {
    return {
        type: 'onVoucherRedeemed',
        payload: result
    }
}
export const onVoucherRefreshed = result => {
    return{
         type: 'onVoucherRefreshed',
         payload: result
    }
}
