import { RecruitmentURL } from "db/url";
import { headers, http } from "./http";

export const getRecruitmentById = async (recruitment_id, callback) => {
    return http.get(RecruitmentURL.getRecruitmentByIdUrl + '/' + recruitment_id, headers, callback)
}
export const getRecruitmentByShopId = async (shop_id, callback) => {
    return http.get(RecruitmentURL.getRecruitmentByShopIdUrl + '/' + shop_id, headers, callback);
}
export const getRecruitmentsFromNearestShop = async (lng, lat, max_distance, callback, errorCallback) => {
    return http.get(RecruitmentURL.getRecruitmentsFromNearestShop + '/' + lng + '/' + lat + '/' + max_distance, headers, callback, errorCallback);
}