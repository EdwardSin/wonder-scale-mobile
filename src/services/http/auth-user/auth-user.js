import { AuthUserURL } from 'db/url';
import { http } from "../http";
import { createAuthenticationHeaders } from "../public/auth";

export const getUser = async (callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(AuthUserURL.getUserUrl, headers, callback, errorCallback);
}
export const getNewsFeed = async (callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(AuthUserURL.getNewsFeedUrl, headers, callback);
}
export const editProfile = async (obj, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(AuthUserURL.editProfileUrl, obj, headers, callback);
}
export const editGeneralUrl = async (obj, callback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(AuthUserURL.editGeneralUrl, obj, headers, callback);
}
// export const editName = async (obj, callback) => {
//     let headers = await createAuthenticationHeaders();
//     return http.put(AuthUserURL.editNameUrl , obj, headers, callback);
// }
// export const editTel = async (obj, callback) => {
//     let headers = await createAuthenticationHeaders();
//     return http.put(AuthUserURL.editTelUrl , obj, headers, callback);
// }
// export const editGender = async (obj, callback) => {
//     let headers = await createAuthenticationHeaders();
//     return http.put(AuthUserURL.editGenderUrl , obj, headers, callback);
// }
// export const editBirthday = async (obj, callback) => {
//     let headers = await createAuthenticationHeaders();
//     return http.put(AuthUserURL.editBirthdayUrl , obj, headers, callback);
// }
// export const unblock = async (shop, callback) => {
//     let headers = await createAuthenticationHeaders();
//     return http.put(AuthUserURL.unblockUrl , { shop_id: shop['_id'] }, headers, callback);
// }
export const changePassword = async (obj, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.put(AuthUserURL.changePasswordUrl, obj, headers, callback, errorCallback);
};