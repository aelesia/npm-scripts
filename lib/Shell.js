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
class Shell {
    static sh_s(command, args) {
        return child_process_1.spawnSync(command, args).stdout.toString().replace('\n', '');
    }
    static sh_array(command, args) {
        let array = child_process_1.spawnSync(command, args).stdout.toString().split('\n');
        array.pop();
        return array;
    }
    static sh_i(command, args) {
        return parseInt(child_process_1.spawnSync(command, args).stdout.toString());
    }
    static pwd() {
        return this.sh_s('pwd');
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
            return this.sh(b, c, options);
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
            let pwd = this.pwd();
            switch (location) {
                case 'android':
                case 'ios':
                    if (pwd.endsWith(`${location}`)) {
                        return this.sh_2(command);
                    }
                    else if (pwd.includes(`/${location}/`)) {
                        let a = pwd.split('/').length - 1;
                        let b = pwd.split('/').findIndex(it => { return it === location; });
                        let c = a - b;
                        let d = '';
                        for (let i = 0; i < c; i++) {
                            d += '../';
                        }
                        return this.sh_2(command, { cwd: `${d}` });
                    }
                    else {
                        return this.sh_2(command, { cwd: `${location}` });
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
                        return this.sh_2(command, { cwd: `${d}` });
                    }
                    else {
                        return this.sh_2(command, {});
                    }
                    break;
                default:
                    throw Error(`Invalid location type: ${location}`);
            }
        });
    }
    static find_path(relative_path) {
        let pwd = Shell.pwd();
        if (relative_path === '(root)') {
            let nested = pwd.split('/').length;
            for (let i = 0; i < nested; i++) {
                let cwd = '.' + '/..'.repeat(i);
                if (this.is_root_node_dir({ cwd })) {
                    let a = pwd.split('/');
                    let b = '';
                    for (let j = 0; j < nested - i; j++) {
                        b += a[j] + '/';
                    }
                    b = b.slice(0, b.length - 1);
                    return b;
                }
            }
            throw Error(`Unable to locate package.json in ancestors of '${pwd}'`);
        }
        else if (pwd.includes(relative_path)) {
            if (pwd.endsWith(relative_path)) {
                return pwd;
            }
            else {
                let start = pwd.indexOf(relative_path);
                let end = start + relative_path.length;
                return pwd.slice(0, end);
            }
        }
        else {
            if (child_process_1.spawnSync('test', ['-d', relative_path]).status === 0) {
                return pwd + '/' + relative_path;
            }
            else {
                throw Error(`Path: '${relative_path}' cannot be found in '${pwd}'`);
            }
        }
    }
    static is_root_node_dir(options) {
        return child_process_1.spawnSync('test', ['-f', 'package.json'], options).status === 0;
    }
}
exports.default = Shell;
