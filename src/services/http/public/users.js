import { UserURL } from 'db/url';
import { headers, http } from "../http";

export const getUserByEmail = (email, callback) => {
    return http.get(UserURL.getUserByEmailUrl + '/' + email, headers, callback);
}
// export const getUserById = (id, callback) => {
//     return http.get(UserURL.getUserByIdUrl + '/' + id, headers, callback);
// }
export const addUser = (user, callback, errorCallback) => {
    return http.post(UserURL.addUserUrl, user, headers, callback, errorCallback);
}
export const addUserByFb = (user, callback, errorCallback) => {
    return http.post(UserURL.addUserByFbUrl, user, headers, callback, errorCallback);
}
export const addUserByGoogle = (user, callback, errorCallback) => {
    return http.post(UserURL.addUserByGoogleUrl, user, headers, callback, errorCallback);
}
export const activateAccount = (token, callback) => {
    return http.put(UserURL.activateAccountUrl + '/' + token, {}, headers, callback);
};
export const savePassword = (data, callback) => {
    return http.put(UserURL.savePasswordUrl, data, headers, callback);
};
export const checkEmail = (email, callback) => {
    return http.get(UserURL.checkEmailUrl + '/' + email, headers, callback);
};
export const resendActivationEmailConfirmation = (data, callback) => {
    return http.post(UserURL.resendActivationEmailConfirmationUrl, data, headers, callback);
};
export const resendActivationEmail = (email, callback) => {
    return http.put(UserURL.resendActivationEmailUrl, { email: email }, headers, callback);
};
export const sendPasswordLinkToEmail = (email, callback, errorCallback) => {
    return http.post(UserURL.sendPasswordLinkToEmailUrl, { email: email }, headers, callback, errorCallback);
};
export const resetUserFromLink = (token, callback) => {
    return http.get(UserURL.resetUserFromLinkUrl + '/' + token, headers, callback);
};