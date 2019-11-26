"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shell_1 = __importDefault(require("./lib/Shell"));
const { spawnSync } = require('child_process');
function version_from_git() {
    let total_commits = Shell_1.default.sh_i('git', ['rev-list', '--count', 'HEAD']);
    let branch_commits_from_dev = Shell_1.default.sh_i('git', ['rev-list', '--count', 'origin/develop..HEAD']);
    let dev_commits = total_commits - branch_commits_from_dev;
    return dev_commits * 1000 + branch_commits_from_dev;
}
try {
    // let xcode_path: string = Utils.argv('xcode_path')
    process.exit(0);
}
catch (e) {
    console.error('ERROR: ' + e.message);
    process.exit(1);
}
