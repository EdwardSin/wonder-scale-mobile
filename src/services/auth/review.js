import environments from 'environments/environment';
import { createAuthenticationHeaders } from "../auth";
import { http } from "../http";

export const getReviewById = async (id, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.get(environments.URL + '/api/reviews/' + id, headers, callback);
}
export const addReview = async (review, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.put(environments.URL + '/api/reviews/add', review, headers, callback);
}
export const addReply = async (obj, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.put(environments.URL + '/api/reviews/reply/' + obj.review_id, obj, headers, callback);
}
export const editReply = async (obj, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.put(environments.URL + '/api/reviews/reply/edit/' + obj.review_id, obj, headers, callback);
}
export const editReview = async (obj, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.put(environments.URL + '/api/reviews/edit/' + obj.review_id, obj, headers, callback);
}
export const removeReply = async (obj, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.put(environments.URL + '/api/reviews/reply/remove/' + obj.review_id, obj, headers, callback);
}
export const removeReview = async (obj, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.put(environments.URL + '/api/reviews/remove/' + obj.review_id, obj, headers, callback);
}