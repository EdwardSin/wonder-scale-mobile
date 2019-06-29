export default class PasswordValidator{
    
    
    static isMinLength(value = ''){
        return value.length > 7
    }

    static isContainUppercase(value) {
        const isUpperCase = string => /^[A-Z]*$/.test(string);
        value = value ? value : '';
        for (let i = 0; i < value.length; i++) {
            if (isUpperCase(value[i])) {
                return true;
            }
        }
        return false;
    }
    static isContainDigit(value) {
        const isUpperCase = string => /^[0-9]*$/.test(string);
        value = value ? value : '';
        for (let i = 0; i < value.length; i++) {
            if (isUpperCase(value[i])) {
                return true;
            }
        }
        return false;
    }
}