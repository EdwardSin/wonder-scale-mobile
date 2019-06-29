export default class OpeningHelper {
    static days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    static getOpeningHour(shop) {
        switch (shop.opening_info_type) {
            case 'always_open':
                return 'Always Open';
            case 'temporary_closed':
                return 'Temporary Closed';
            case 'no_hour_available':
                return 'No Hour Available';
            case 'selected_hours':
                return OpeningHelper.getTodayOpeningHour(shop)
        }
    }

    static getTodayOpeningHour(shop) {
        if (shop.opening_info && shop.opening_info.length && shop.opening_info.length == 7) {

            let day = new Date;

            return shop.opening_info[day.getDay()]['selected'] ? shop.opening_info[day.getDay()]['time']: [];
        }
    }
    static getShopOpeningHours(shop) {
        if (shop.opening_info && shop.opening_info.length && shop.opening_info.length == 7) {
            return shop.opening_info;
        }
    }
}