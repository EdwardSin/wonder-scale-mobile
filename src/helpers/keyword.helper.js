import _ from 'lodash';
import { AsyncStorage } from 'react-native';

export default class KeywordHelper {
    static async removeKeywordFromHistory(value, list) {
        //let { list } = this.state;
        let array = [...list];
        let startIndex = list.indexOf(value);
        array.splice(startIndex, 1);
        //this.setState({ list: array });
        await AsyncStorage.setItem('keywords', JSON.stringify(_.slice([...array], 0, 10)));
        return Promise.resolve(array);
    }
    static async getHistoryFromStorage() {
        let list = await AsyncStorage.getItem('keywords') || '[]';
        //this.setState({ list: JSON.parse(list) });
        return Promise.resolve(JSON.parse(list));
    }
    static async addToHistory(value = '', list) {
        //let { list } = this.state;
        value = _.trim(value);
        if (value != '') {
            if (list.includes(value)) {
                list.sort(function (x, y) { return x == value ? -1 : y == value ? 1 : 0; })
                await AsyncStorage.setItem('keywords', JSON.stringify([...list]));
            }
            else {
                await AsyncStorage.setItem('keywords', JSON.stringify(_.slice([value, ...list], 0, 10)));
            }
        }
    }
    // if (value) {
    //     if (list.includes(value)) {
    //         list.sort(function (x, y) { return x == value ? -1 : y == value ? 1 : 0; })
    //         await AsyncStorage.setItem('keywords', JSON.stringify([...list]));
    //     }
    // }
}