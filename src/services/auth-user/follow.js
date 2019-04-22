import { AuthUserURL } from 'db/url';
import { createAuthenticationHeaders } from "../auth";
import { http } from "../http";

export const getFollowShops = async (callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(AuthUserURL.getFollowShopsUrl, headers, callback);
};
export const getFollowShopsId = async (callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(AuthUserURL.getFollowShopsIdUrl, headers, callback, errorCallback);
};
export const getFollowItems = async (callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(AuthUserURL.getFollowItemsUrl, headers, callback);
};
export const getFollowItemsId = async (callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(AuthUserURL.getFollowItemsIdUrl, headers, callback);
};
export const isFollowItem = async (item_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(AuthUserURL.isFollowItemUrl + '/' + item_id, headers, callback, errorCallback);
};
export const isFollowShop = async (shop_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(AuthUserURL.isFollowShopUrl + '/' + shop_id, headers, callback, errorCallback);
};
export const likeShop = async (shop_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(AuthUserURL.likeShopUrl, { shop_id: shop_id }, headers, callback, errorCallback);
}
export const unlikeShop = async (shop_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(AuthUserURL.unlikeShopUrl, { shop_id: shop_id }, headers, callback, errorCallback);
}
export const isLikeShop = async (shop_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(AuthUserURL.isLikeShopUrl + '/' + shop_id, headers, callback, errorCallback);
};
export const followShop = async (shop_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(AuthUserURL.followShopUrl, { shop_id: shop_id }, headers, callback, errorCallback);
};
export const followItem = async(item_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(AuthUserURL.followItemUrl, { item_id: item_id}, headers,callback, errorCallback);
};
export const unfollowShop = async (shop_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(AuthUserURL.unfollowShopUrl, { shop_id: shop_id }, headers, callback, errorCallback);
};
export const unfollowItem = async (item_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(AuthUserURL.unfollowItemUrl, { item_id: item_id}, headers, callback, errorCallback);
};
