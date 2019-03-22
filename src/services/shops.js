import environments from "../environments/environment";
import { http, headers } from "./http";

export const getShopByUsername = async (username, callback) => {
    return http.get(environments.URL + '/api/shops/username/' + username, headers, callback);
}
export const getShopWithNewItems = async (id, callback) => {
    return http.get(environments.URL + '/api/shops/shopwithnewitems/' + id, headers, callback);
}
export const getCategoriesByShopId = async (id, callback) => {
    return http.get(environments.URL + '/api/categories/' + id, headers, callback);
}
export const getSellerByItemId = async (item_id, callback) => {
    return http.get(environments.URL + '/api/shops/item/' + item_id, headers, callback);
}
export const rejectShop = async (obj, callback) => {
    return http.put(environments.URL + '/api/shops/reject/' + obj.shop_id, obj, headers, callback);
}