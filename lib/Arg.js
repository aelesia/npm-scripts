"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Arg {
    static v_enum(key, accepted_values) {
        let value = this.v(key);
        let abc = accepted_values.find((it) => {
            return it.toLowerCase() === value.toLowerCase();
        });
        if (value)
            return value;
        else
            throw Error(`Invalid value: ${value}. Accepted values: ${accepted_values}`);
    }
    static v_enum_null(key, accepted_values) {
        let value = this.v_null(key);
        if (value === undefined)
            return value;
        let find = accepted_values.find((it) => {
            // @ts-ignore value should always be string
            return it.toLowerCase() === value.toLowerCase();
        });
        if (find)
            return value;
        else
            throw Error(`Invalid value: ${value}. Accepted values: [${accepted_values}]`);
    }
    static v(key) {
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
    static v_null(key) {
        let value = undefined;
        process.argv.forEach((arg, index, array) => {
            let k = arg.split(':')[0];
            let v = arg.split(':')[1];
            if (k.toLowerCase() === key) {
                value = v;
            }
        });
        return value;
    }
    static v_number(key) {
        let value = this.v(key);
        let number;
        try {
            number = parseInt(value);
            return number;
        }
        catch (e) {
            throw Error(`${key}:${value} must be a number.`);
        }
    }
    static v_number_null(key) {
        let value = this.v_null(key);
        if (value == null)
            return undefined;
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
exports.default = Arg;
