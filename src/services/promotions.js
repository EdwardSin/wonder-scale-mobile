import { PromotionURL } from "db/url";
import { headers, http } from "./http";

export const getPromotionsByShopId = async (shop_id, callback) => {
    return http.get(PromotionURL.getPromotionsByShopIdUrl + '/' + shop_id, headers, callback);
}
export const getPromotionById = async (id, callback) => {
    return http.get(PromotionURL.getPromotionByIdUrl  + '/' + id, headers, callback);
}