import _ from 'lodash';

export default class OrderHelper {
    constructor() { }
    // Tested
    static orderByAndSetShopList(orderMethod, shopList) {
        var list;
        switch (orderMethod) {
            case "thebest":
                list = _.sortBy(shopList, x => x["dist"].calculated);
                break;
            case "relevance":
                list = shopList;
                break;
            case "alphabet":
                list = _.sortBy(shopList, x => x["name"].toLowerCase());
                break;
            case "distance":
                list = _.sortBy(shopList, x => x["dist"].calculated);
                break;
            case "review":
                list = _.sortBy(shopList, x => x["review"].score);
                break;
            default:
                list = shopList;
        }
        return list;
    }
    // Tested
    static orderByAndSetItemList(orderMethod, itemList) {
        var list;
        switch (orderMethod) {
            case "thebest":
                list = _
                    .chain(itemList)
                    .sortBy("discountPrice")
                    .sortBy(item => {
                        return -item.index;
                    })
                    .sortBy("seller.dist.calculated")
                    .value();
                break;
            case "relevance":
                list = itemList;
                break;
            case "price":
                list = _.sortBy(itemList, x => x["discountPrice"]);
                break;
            case "alphabet":
                list = _.sortBy(itemList, x => x["name"].toLowerCase());
                break;
            case "distance":
                list = _.sortBy(itemList, x => x["seller"].dist.calculated);
                break;
            case "review":
                list = _.sortBy(itemList, x => x["seller"].review.score);
                break;
            default:
                list = itemList;
        }
        return list;
    }

}
