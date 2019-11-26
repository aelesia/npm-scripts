"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Arg_1 = __importDefault(require("./lib/Arg"));
const Shell_1 = __importDefault(require("./lib/Shell"));
function find_path(relative_path) {
    let pwd = Shell_1.default.pwd();
    if (pwd.includes(relative_path)) {
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
        if (spawnSync('test', ['-d', relative_path]).status === 0) {
            return pwd + '/' + relative_path;
        }
        else {
            throw Error(`Path: '${relative_path}' cannot be found in '${pwd}'`);
        }
    }
}
const { spawnSync } = require('child_process');
try {
    console.log(find_path(Arg_1.default.v('path')));
    process.exit(0);
}
catch (e) {
    // console.error(e.stack)
    console.error('ERROR: ' + e.message);
    process.exit(1);
}
