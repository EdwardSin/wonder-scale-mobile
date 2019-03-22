export default class StatusHelper {

     static weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    static isBetweenTime(currentDateTime, opening, close) {
        let openingTime = this.getOpeningTime(opening);
        let closeTime = this.getCloseTime(close, opening);
        return openingTime <= currentDateTime && currentDateTime < closeTime;
    }

    static isCurrentlyOpen(opening_info_type, opening_info, today) {
        let currentState = false;
        if (opening_info_type === "selected_hours") {
            let todayDate = opening_info.find(day => day.day === this.weekday[today]);
            if (todayDate) {
                if (todayDate['selected']) {
                    for (let time of todayDate['time']) {
                        //openingHour & closeHour is old data
                        if (StatusHelper.isBetweenTime(new Date(), time.opening_hour || time.openingHour, time.close_hour || time.closeHour)) {
                            currentState = true;
                            break;
                        }
                    }
                } else {
                    currentState = todayDate['selected'];
                }
            }
        }
        else if (opening_info_type === 'always_open') {
            currentState = true;
        }
        return currentState;
    }

    static getCloseTime(close, opening) {
        close = this.convertTime12to24(close).split(':');
        let closeHour = close[0];
        let closeMin = close[1];
        opening = this.convertTime12to24(opening).split(':');
        let openingHour = opening[0];
        let openingMin = opening[1];
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let date = new Date().getDate();

        if (closeHour < openingHour || (closeHour == openingHour && closeMin < openingMin)) {
            return new Date(year, month, date + 1, closeHour, closeMin);
        }
        return new Date(year, month, date, closeHour, closeMin);
    }

    static getOpeningTime(opening) {
        opening = this.convertTime12to24(opening).split(':');
        let openingHour = opening[0];
        let openingMin = opening[1];
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let date = new Date().getDate();
        return new Date(year, month, date, openingHour, openingMin);
    }

    static convertTime12to24(time12h) {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }
        if (modifier === 'pm') {
            hours = parseInt(hours, 10) + 12;
        }
        return hours + ':' + minutes;
    }
}