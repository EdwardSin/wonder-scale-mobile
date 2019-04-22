import { ShopURL } from "db/url";
import { headers, http } from "./http";



export const getShopByUsername = async (username, callback) => {
    return http.get(ShopURL.getShopByUsernameUrl + '/' + username, headers, callback);
}
export const getShopWithNewItems = async (id, callback) => {
    return http.get(ShopURL.getShopWithNewItemsUrl + '/' + id, headers, callback);
}
export const rejectShop = async (obj, callback) => {
    return http.put(ShopURL.rejectShopUrl + '/' + obj.shop_id, obj, headers, callback);
}
export const getSellerByItemId = async (item_id, callback) => {
    return http.get(ShopURL.getSellerByItemIdUrl + '/' + item_id, headers, callback);
}
export const getNearsShopByPoint = (lng, lat, maxdistance, obj, callback) => {
    return http.post(ShopURL.getNearShopsByPointUrl + '/' + lng + '/' + lat + '/' + maxdistance, obj , headers, callback);
}