import { AuthUserURL } from 'db/url';
import { http } from "../http";
import { createAuthenticationHeaders } from "../public/auth";

export const getFollowShops = async (callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(AuthUserURL.getFollowShopsUrl, headers, callback);
}
export const getFollowItems = async (callback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(AuthUserURL.getFollowItemsUrl, headers, callback);
}
export const getFollowIds = async (type, callback, errorCallback) => {
    let headers = await createAuthenticationHeaders();
    return http.get(AuthUserURL.getFollowIdsUrl + `?type=${type}`, headers, callback, errorCallback);
}
export const isFollowing = async ({ id, type }) => {
    let headers = await createAuthenticationHeaders();
    return http.getSync(AuthUserURL.isFollowingUrl + `/${id}?type=${type}`, headers);
}
export const isLike = async ({ id, type }) => {
    let headers = await createAuthenticationHeaders();
    return http.getSync(AuthUserURL.isLikeUrl + `/${id}?type=${type}`, headers);
}
export const like = async ({ id, type }) => {
    let headers = await createAuthenticationHeaders();
    return http.putSync(AuthUserURL.likeUrl + `/${id}?type=${type}`, {}, headers);
}
export const unlike = async ({ id, type }) => {
    let headers = await createAuthenticationHeaders();
    return http.putSync(AuthUserURL.unlikeUrl + `/${id}?type=${type}`, {}, headers);
}
export const follow = async ({ id, type }) => {
    let headers = await createAuthenticationHeaders();
    return http.putSync(AuthUserURL.followUrl + `/${id}?type=${type}`, {}, headers);
};
export const unfollow = async ({ id, type }) => {
    let headers = await createAuthenticationHeaders();
    return http.putSync(AuthUserURL.unfollowUrl + `/${id}?type=${type}`, {}, headers);
};
