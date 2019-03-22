import environments from "../../environments/environment";
import { http, headers } from "../http";

export const getPromotionsByShopId = async (shop_id, callback) => {
    return http.get(environments.URL + '/api/promotions/shop_id/' + shop_id, headers, callback);
}
export const claimVoucher = async(voucher_id, callback) => {
    return http.put(environments.URL + '/api/auth-vouchers/claim/' + voucher_id, {}, headers, callback);
}
export const getUserAvailableClaimedVouchers = async(callback) => {
    return http.get(environments.URL + '/api/auth-vouchers/user_email/available', headers, callback);
}
export const getUserUnavailableClaimedVouchers = async(callback) => {
    return http.get(environments.URL + '/api/auth-vouchers/user_email/unavailable', headers, callback);
}
export const getVoucherWithPromotion = async (voucher_id, callback) => {
    return http.get(environments.URL + '/api/auth-vouchers/with_promotion/' + voucher_id, headers, callback);
}
export const redeemVoucher = async (obj, callback) => {
    return http.put(environments.URL + '/api/auth-vouchers/redeem/' + obj.voucher_id, obj, headers, callback);
}