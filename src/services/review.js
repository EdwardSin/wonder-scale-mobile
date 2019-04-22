import { ReviewURL } from 'db/url';
import { createAuthenticationHeaders } from "./auth";
import { http } from "./http";

export const getShopReviewRating = async (id, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.get(ReviewURL.getShopReviewRatingUrl + '/' + id, headers, callback);
}
export const getShopReviewById = async (id, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.get(ReviewURL.getShopReviewByIdUrl + '/' + id, headers, callback);
}
export const getItemReviewById = async (id, callback) => {
  let headers = await createAuthenticationHeaders();
  return http.get(ReviewURL.getItemReviewByIdUrl + '/' + id, headers, callback);
}