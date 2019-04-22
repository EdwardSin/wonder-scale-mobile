import { ItemURL } from "db/url";
import { headers, http } from "./http";

export const getSimilarItems = (name, callback) => {
    return http.get(ItemURL.getSimilarItemsUrl + '/' + name, headers, callback);
}
export const getItemWithSellerByItemId = (id, callback) => {
    return http.get(ItemURL.getItemWithSellerByItemIdUrl + '/' + id, headers, callback);
}
export const getPublicItemsByCategoryId = (id, callback) => {
    return http.get(ItemURL.getPublicItemsByCategoryIdUrl + '/' + id, headers, callback);
}
export const getAllPublicItemsByShopId = (id, callback) => {
    return http.get(ItemURL.getAllPublicItemsByShopIdUrl + '/' + id, headers, callback);
}
export const getPublicNewItemsByShopId = (shop_id, callback) => {
    return http.get(ItemURL.getPublicNewItemsByShopIdUrl + '/' + shop_id, headers, callback);
}
export const getPublicDiscountItemsByShopId = (shop_id, callback) => {
    return http.get(ItemURL.getPublicDiscountItemsByShopIdUrl+ '/' + shop_id, headers, callback);
}
export const getSearchItemByText = (obj, callback, errorCallback) => {
    return http.post(ItemURL.getSearchItemByTextUrl, obj, headers, callback, errorCallback);
}
export const getShopsThroughShopIds = (obj, callback, errorCallback) => {
    return http.post(ItemURL.getShopsThroughShopIdsUrl, obj, headers, callback, errorCallback);
}