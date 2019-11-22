"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
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
    static argv_number_null(key) {
        let value = this.argv_null(key);
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
    static sh_s(command, args) {
        return child_process_1.spawnSync(command, args).stdout.toString().replace('\n', '');
    }
    static sh_i(command, args) {
        return parseInt(child_process_1.spawnSync(command, args).stdout.toString());
    }
    static pwd() {
        return Utils.sh_s('pwd');
    }
    static sh_2(command, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let a = command.split(' ');
            let b = a[0];
            let c = [];
            a.forEach((it) => {
                if (it !== b) {
                    c.push(it);
                }
            });
            return Utils.sh(b, c, options);
        });
    }
    static sh(command, args, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let process = child_process_1.spawn(command, args, Object.assign(Object.assign({}, options), { stdio: 'inherit' }));
            return new Promise((resolve, reject) => {
                process.on('exit', (code) => {
                    code == 0 ? resolve() : reject();
                });
            });
        });
    }
    static dir_sh(location, command) {
        return __awaiter(this, void 0, void 0, function* () {
            let pwd = Utils.pwd();
            switch (location) {
                case 'android':
                case 'ios':
                    if (pwd.endsWith(`${location}`)) {
                        return Utils.sh_2(command);
                    }
                    else if (pwd.includes(`/${location}/`)) {
                        let a = pwd.split('/').length - 1;
                        let b = pwd.split('/').findIndex(it => { return it === location; });
                        let c = a - b;
                        let d = '';
                        for (let i = 0; i < c; i++) {
                            d += '../';
                        }
                        return Utils.sh_2(command, { cwd: `${d}` });
                    }
                    else {
                        return Utils.sh_2(command, { cwd: `${location}` });
                    }
                    break;
                case 'root':
                    if (pwd.includes('/android') || pwd.includes('/ios')) {
                        let a = pwd.split('/').length - 1;
                        let b = pwd.split('/').findIndex(it => { return it === 'android' || it === 'ios'; });
                        let c = a - b;
                        let d = '';
                        for (let i = 0; i <= c; i++) {
                            d += '../';
                        }
                        return Utils.sh_2(command, { cwd: `${d}` });
                    }
                    else {
                        return Utils.sh_2(command, {});
                    }
                    break;
                default:
                    throw Error(`Invalid location type: ${location}`);
            }
        });
    }
}
exports.default = Utils;
