import { AuthUserURL, UserURL } from "db/url";
import { AsyncStorage } from "react-native";
import { headers, http } from "./http";

export const WS_Token = "ws-token";

export const createAuthenticationHeaders = async () => {
  let headers = { 'Content-Type': 'application/json', authorization: await AsyncStorage.getItem(WS_Token) || '' }
  return headers;
}
export const onSignInWithoutActivated = (email, password, callback, errorCallback) => {
  return http.post(UserURL.onSignInWithoutActivatedUrl, { email: email, password: password }, headers, callback, errorCallback);
}

export const onSignIn = (email, password, callback, errorCallback) => {
  return http.post(UserURL.loginUrl, { email: email, password: password }, headers, callback, errorCallback);
};

export const onSignOut = () => {
  return new Promise((resolve, reject) => {
    http.post(AuthUserURL.logoutUrl, {}, headers, (result) => {
      AsyncStorage.removeItem(WS_Token);  
      if (!result['loggedIn']) {
        resolve(true);
      }
      else {
        resolve(false);
      }
    }, err => {
      AsyncStorage.removeItem(WS_Token);
      resolve(false);
    })
  });
}

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(WS_Token)
      .then(res => {
        if (res != null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};