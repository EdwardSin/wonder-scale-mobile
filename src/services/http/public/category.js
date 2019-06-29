import { CategoryURL } from 'db/url';
import { headers, http } from "../http";

export const getCategoriesByShopId = async (shop_id, callback) => {
    return http.get(CategoryURL.getCategoriesByShopIdUrl + '/' + shop_id, headers, callback);
}