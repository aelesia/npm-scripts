"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static argv(key) {
        let value = null;
        process.argv.forEach((arg, index, array) => {
            let k = arg.split(':')[0];
            let v = arg.split(':')[1];
            if (k.toLowerCase() === key) {
                value = v;
            }
        });
        if (value)
            return value;
        else
            throw Error(`Required parameter '${key}' not found. Please re-run with '[command] ${key}:[value]'`);
    }
    static argv_null(key) {
        let value = null;
        process.argv.forEach((arg, index, array) => {
            let k = arg.split(':')[0];
            let v = arg.split(':')[1];
            if (k.toLowerCase() === key) {
                value = v;
            }
        });
        return value;
    }
    static argv_number(key) {
        let value = this.argv(key);
        let number;
        try {
            number = parseInt(value);
            return number;
        }
        catch (e) {
            throw Error(`${key}:${value} must be a number.`);
        }
    }
}
exports.default = Utils;
