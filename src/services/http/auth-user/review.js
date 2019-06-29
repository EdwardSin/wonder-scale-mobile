import { AuthReviewURL } from 'db/url';
import { http } from "../http";
import { createAuthenticationHeaders } from "../public/auth";

export const addItemReview = async (review, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.put(AuthReviewURL.addItemReviewUrl, review, headers, callback);
}
export const editItemReview = async (obj, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.put(AuthReviewURL.editItemReviewUrl + '/' + obj.review_id, obj, headers, callback);
}
export const removeItemReview = async (obj, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.put(AuthReviewURL.removeItemReviewUrl + '/' + obj.review_id, obj, headers, callback);
}
export const addShopReview = async (review, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.put(AuthReviewURL.addShopReviewUrl, review, headers, callback);
}
export const editShopReview = async (obj, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.put(AuthReviewURL.editShopReviewUrl + '/' + obj.review_id, obj, headers, callback);
}
export const removeShopReview = async (obj, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.put(AuthReviewURL.removeShopReviewUrl + '/' + obj.review_id, obj, headers, callback);
}