import environments from 'environments/environment';
import { createAuthenticationHeaders } from "../auth";
import { http } from "../http";

export const getUser = async (callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(environments.URL + '/api/auth-users/profile', headers, callback);
}
export const getNewsFeed = async (callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(environments.URL + '/api/auth-users/newsfeed', headers, callback);
}
export const editProfile = async (obj, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/edit/profile', obj, headers, callback);
}
export const editUserInfo = async (obj, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/edit/userinfo', obj, headers, callback);
}
export const getBlackListWithUser = async (callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(environments.URL + '/api/auth-users/profilewithblacklist', headers, callback, errorCallback);
}
export const editName = async (obj, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/edit/name', obj, headers, callback);
}
export const editTel = async (obj, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/edit/tel', obj, headers, callback);
}
export const editGender = async (obj, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/edit/gender', obj, headers, callback);
}
export const editBirthday = async (obj, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/edit/birthday', obj, headers, callback);
}
export const likeShop = async (shop_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/like/shop', { shop_id: shop_id }, headers, callback, errorCallback);
}
export const unlikeShop = async (shop_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/unlike/shop', { shop_id: shop_id }, headers, callback, errorCallback);
}
export const isLikeShop = async (shop_id, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(environments.URL + '/api/auth-users/islikeshop/'+ shop_id, headers, callback);
}
export const followShop = async (shop_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/add/followshop', { shop_id: shop_id }, headers, callback, errorCallback);
}
export const unfollowShop = async (shop_id, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/remove/followshop', { shop_id: shop_id }, headers, callback, errorCallback);
}
export const isFollowShop = async (shop_id, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(environments.URL + '/api/auth-users/isfollowshop/'+ shop_id, headers, callback);
}
export const unblock = async (shop, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/unblock', { shop_id: shop['_id'] }, headers, callback);
}
export const changePassword = async (obj, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(environments.URL + '/api/auth-users/changepassword', obj, headers, callback);
};