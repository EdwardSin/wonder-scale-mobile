import { AuthVoucherURL } from "db/url";
import { headers, http } from "../http";


export const getPromotionsByShopId = async (shop_id, callback) => {
    return http.get(AuthVoucherURL.getPromotionsByShopIdUrl + '/' + shop_id, headers, callback);
}
export const claimVoucher = async(voucher_id, callback) => {
    return http.put(AuthVoucherURL.claimVoucherUrl + '/' + voucher_id, {}, headers, callback);
}
export const getUserAvailableClaimedVouchers = async(callback) => {
    return http.get(AuthVoucherURL.getUserAvailableClaimedVouchersUrl, headers, callback);
}
export const getUserUnavailableClaimedVouchers = async(callback) => {
    return http.get(AuthVoucherURL.getUserUnavailableClaimedVouchersUrl, headers, callback);
}
export const getVoucherWithPromotion = async (voucher_id, callback) => {
    return http.get(AuthVoucherURL.getVoucherWithPromotionUrl + '/' + voucher_id, headers, callback);
}
export const redeemVoucher = async (obj, callback) => {
    return http.put(AuthVoucherURL.redeemVoucherUrl + '/' + obj.voucher_id, obj, headers, callback);
}