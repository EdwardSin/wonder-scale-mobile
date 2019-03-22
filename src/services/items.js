import environments from "../environments/environment";
import { http, headers } from "./http";

export const getSimilarItems = (name, callback) => {
    return http.get(environments.URL + '/api/items/similar/' + name, headers, callback);
}
export const getItemWithSellerByItemId = (id, callback) => {
    return http.get(environments.URL + '/api/items/itemwithseller/' + id, headers, callback);
}
export const getPublicItemsByCategoryId = (id, callback) => {
    return http.get(environments.URL + '/api/items/public/items/' + id, headers, callback);
}
export const getAllPublicItemsByShopId = (id, callback) => {
    return http.get(environments.URL + '/api/items/public/items/all/' + id, headers, callback);
}
export const getPublicNewItemsByShopId = (shop_id, callback) => {
    return http.get(environments.URL + '/api/items/public/items/new/' + shop_id, headers, callback);
}
export const getPublicDiscountItemsByShopId = (shop_id, callback) => {
    return http.get(environments.URL + '/api/items/public/items/discount/' + shop_id, headers, callback);
}