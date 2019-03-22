import environments from 'environments/environment';
import { createAuthenticationHeaders } from "../auth";
import { http } from "../http";

export const getFollowShops = async (callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(environments.URL + '/api/auth-users/followshops', headers, callback);
};
export const getFollowShopsId = async (callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(environments.URL + '/api/auth-users/followshopsid', headers, callback, errorCallback);
};
export const getFollowItems = async (callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(environments.URL + '/api/auth-users/followitems', headers, callback);
};
export const getFollowItemsId = async (callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(environments.URL + '/api/auth-users/followitemsid', headers, callback);
};
export const isFollowItem = async (item_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(environments.URL + '/api/auth-users/isfollowitem/' + item_id, headers, callback, errorCallback);
};
export const isFollowShop = async (shop_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(environments.URL + '/api/auth-users/isfollowshop/' + shop_id, headers, callback, errorCallback);
};
export const isLikeShop = async (shop_id, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(environments.URL + '/api/auth-users/islikeshop/' + shop_id, headers, callback);
};
export const addFollowShop = async (shop_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/add/followshop', { shop_id: shop_id }, headers, callback, errorCallback);
};
export const addFollowItem = async(item_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/add/followitem', { item_id: item_id}, headers,callback, errorCallback);
};
export const removeFollowShop = async (shop_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/remove/followshop', { shop_id: shop_id }, headers, callback, errorCallback);
};
export const removeFollowItem = async (item_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/remove/followitem', { item_id: item_id}, headers, callback, errorCallback);
};
