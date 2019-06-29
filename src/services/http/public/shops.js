import { ShopURL } from "db/url";
import { headers, http } from "../http";

export const getShopByUsername = async (username, callback) => {
    return http.get(ShopURL.getShopByUsernameUrl + '/' + username, headers, callback);
}
export const getShopById = async (id, callback) => {
    return http.get(ShopURL.getShopByIdUrl + '/' + id, headers, callback);
}
export const getShopWithNewItems = async (id, callback) => {
    return http.get(ShopURL.getShopWithNewItemsUrl + '/' + id, headers, callback);
}
export const getNearsShopByPoint = ({ lng = 0, lat = 0, radius = 100000, type = 'restaurant' } = {}, { current_lat, current_lng }, callback) => {
    let _headers = {
        ...headers,
        current_lat,
        current_lng
    }
    return http.get(ShopURL.getNearShopsByPointUrl + `?lng=${lng}&lat=${lat}&radius=${radius}$type=${type}`, _headers, callback);
}
export const getRandomShops = ({ type, limit = 20 }, callback) => {
    return http.get(ShopURL.getRandomShops + `?type=${type}&limit=${limit}`, headers, callback);
}
export function getShopsBySearchText({ query, limit, skip = 0, lat, lng, radius }) {
    return http.getSync(ShopURL.getShopsBySearchText + `?query=${query}&limit=${limit}&skip=${skip}&lat=${lat}&lng=${lng}&radius=${radius}`, headers);
}
export async function getShopsBySearchItem({ query, type = '', limit, skip = 0, lat, lng, radius }, { current_lat, current_lng }) {
    return await http.postSync(ShopURL.getShopsBySearchItemUrl + `?query=${query}&type=${type}&limit=${limit}&skip=${skip}&lat=${lat}&lng=${lng}&radius=${radius}`, { current_lat, current_lng }, headers);
}
