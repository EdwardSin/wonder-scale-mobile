export default class SearchHelper {

  constructor() { }
  
  // No Test
  static itemExist(items, item) {
    return items.find(x => x.name == item.name && 
                    x.customId == item.customId && 
                    x.price == item.price && 
                    x.discount == item.discount) != null;
  }

  // No Test
  static combination(arr) {
    let i, j, temp
    let result: Array<string> = [];
    let arrLen = arr.length
    let power = Math.pow
    let combinations = power(2, arrLen)
    
    // Time & Space Complexity O (n * 2^n)
    
    for (i = 0; i < combinations;  i++) {
      temp = [];
      let keyword = "";
      for (j = 0; j < arrLen; j++) {
        // & is bitwise AND
        if ((i & power(2, j))) {
          keyword = keyword== '' ? arr[j] : keyword+ " " + arr[j];
          //temp.push(keyword);
        }
      }
      result.push(keyword);
    }
    return result.filter(x => x != '');
  }
  // Tested
  static getKeywordArray(keyword){
    keyword = keyword ? keyword.toLowerCase() : '';
    var itemKeywordArray = keyword.split(" ").slice(0,7);
    itemKeywordArray = this.combination(itemKeywordArray).sort((a, b) => {return b.length - a.length});
    return itemKeywordArray.splice(0, 10);
  }
}