import environments from "../environments/environment";
import { http, headers } from "./http";

export const getPromotionsByShopId = async (shop_id, callback) => {
    return http.get(environments.URL + '/api/promotions/shop_id/' + shop_id, headers, callback);
}
