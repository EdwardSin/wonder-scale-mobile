import { AsyncStorage } from "react-native";
import environments from "../environments/environment";
import { http, headers } from "./http";

export const WS_Token = "ws-token";

export const createAuthenticationHeaders = async () => {
  let headers = { 'Content-Type': 'application/json', authorization: await AsyncStorage.getItem(WS_Token) || '' }
  return headers;
}
export const onSignInWithoutActivated = (email, password, callback) => {
  return http.post(environments.URL + '/api/users/loginwithoutactivated', { email: email, password: password }, headers, callback);
}

export const onSignIn = (email, password, callback) => {
  return http.post(environments.URL + '/api/users/login', { email: email, password: password }, headers, callback);
};

export const onSignOut = () => {
  return new Promise((resolve, reject) => {
    http.post(environments.URL + '/api/auth-users/logout', {}, headers, (result) => {
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