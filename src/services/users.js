import environments from 'environments/environment';
import { http, headers } from "./http";

export const getUserByEmail = (email, callback) => {
    return http.get(environments.URL + '/api/users/profile/' + email, headers, callback);
}
export const getUserById = (id, callback) => {
    return http.get(environments.URL + '/api/users/' + id, headers, callback);
}
// export const editUserProfile = (user, callback) => {
//     return http.put(environments.URL + '/api/users/edit/userinfo', user, headers, callback);
// }
export const addUser = (user, callback) => {
    return http.post(environments.URL + '/api/users/add', user, headers, callback);
}
export const addUserByFb = (user, callback) => {
    return http.post(environments.URL + '/api/users/addbyfb', user, headers, callback);
}
export const addUserByGoogle = (user, callback) => {
    return http.post(environments.URL + '/api/users/addbygoogle', user, headers, callback);
}
export const activateAccount = (token, callback) => {
    return http.put(environments.URL + '/api/users/activate/' + token, {}, headers, callback);
};
export const savePassword = (data, callback) => {
    return http.put(environments.URL + '/api/users/savepassword', data, headers, callback);
};
export const checkEmail = (email, callback) => {
    return http.get(environments.URL + '/api/users/checkemail/' + email, headers, callback);
};
export const sendUsernameToEmail = (data, callback) => {
    return http.get(environments.URL + '/api/users/resetusername/' + data, headers, callback);
};
export const resendActivationEmailConfirmation = (data, callback) => {
    return http.post(environments.URL + '/api/users/resendactivationemail', data, headers, callback);
};
export const resendActivationEmail = (email, callback) => {
    return http.put(environments.URL + '/api/users/resendactivationemail', { email: email }, headers, callback);
};
export const sendPasswordLinkToEmail = (data, callback) => {
    return http.post(environments.URL + '/api/users/resetpassword', data, headers, callback);
};
export const resetUserFromLink = (token, callback) => {
    return http.get(environments.URL + '/api/users/resetpassword/' + token, headers, callback);
};
export const getNearShopByPoint = (lng, lat, maxdistance, callback) => {
    return http.post(environments.URL + '/api/shops/nearshop/' + lng + '/' + lat + '/' + maxdistance, {} , headers, callback);
}