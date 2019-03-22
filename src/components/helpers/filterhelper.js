
export default class FilterHelper {
  constructor() { }

  static filterShopType(list, type) {
    if (type != 'all' || type == '') {
      list = list.filter(x => x.type == type);
    }
    return list;
  }
  
  static filterShopStatus(list, isCurrentShop) {
    if (isCurrentShop) {
      list = list.filter(x => (x.currentStatus == true));
    }
    return list;
  }
  static filterItemType(list, type) {
    if (type != 'all' || type == '') {
      list = list.filter(x => x.seller.type == type);
    }
    return list;
  }
  static filterItemStatus(list, isCurrentShop) {
    if (isCurrentShop) {
      list = list.filter(x => (x.seller.currentStatus == true));
    }
    return list;
  }
  
  static shopFilter(arrays, arrayFilter) {
    var self = this;
    var results: Array<any> = [];
    var items: Array<any> = [];
    arrays.forEach(x => Array.prototype.push.apply(items, x.items));
    for (let element of arrayFilter) {
      var keyword_number = element.split(" ").length;
      for (let shop of arrays) {
        if (conditions(shop, element)
          && !this.isElementInArray(results, shop)) {
          shop.index = keyword_number;
          results.push(shop);
        }
      }
    }
    return results;

    function conditions(shop, element) {
      return (self.matchName(shop.name, element) ||
        self.matchTag(shop.tags, element) ||
        items.some(x => self.matchName(x.name, element)) ||
        items.some(x => self.matchTag(x.tags, element)))
    }
  }
  
  static itemFilter(arrays, arrayFilter) {
    var self = this;
    var results: Array<any> = [];
    for (let element of arrayFilter) {
      var keyword_number = element.split(" ").length;
      for (let item of arrays) {
        if (conditions(item, element) && !this.isElementInArray(results, item)) {
          item.index = keyword_number;
          results.push(item);
        }
      }
    };
    return results;

    function conditions(item, element) {
      return self.matchName(item.name, element) || self.matchTag(item.tags, element);
    }
  }
  // Tested
  static matchName(name, element) {
    return name.toLowerCase().match(element);
  }
  // Tested
  static matchTag(tags, element) {
    return tags && tags.some(x => x.toLowerCase().match(element));
  }
  // Tested
  static isElementInArray(arrays, item) {
    return arrays.includes(item);
  }
}
