import environments from 'environments/environment';
import { headers, http } from "./http";

export const getCategoriesByShopId = async (shop_id, callback) =>{
    return http.get(environments.URL + '/api/categories/' + shop_id, headers, callback);
}