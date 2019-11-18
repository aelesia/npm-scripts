"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const utils_1 = __importDefault(require("./utils"));
const { spawnSync } = require('child_process');
function version_from_git() {
    let total_commits = utils_1.default.sh_i('git', ['rev-list', '--count', 'HEAD']);
    let branch_commits_from_dev = utils_1.default.sh_i('git', ['rev-list', '--count', 'origin/develop..HEAD']);
    let dev_commits = total_commits - branch_commits_from_dev;
    return dev_commits * 1000 + branch_commits_from_dev;
}
function write_gradle(file_path, build_number, version_name) {
    let file = fs.readFileSync(file_path, 'utf-8')
        .replace(/versionCode ([\d]+)?/g, `versionCode ${build_number}`)
        .replace(/versionName (("[\d\.\w]*)+)?/g, `versionName "${version_name}"`);
    fs.writeFileSync(file_path, file, 'utf-8');
}
function write_xcode(file_path, build_number, version_name) {
    let file = fs.readFileSync(file_path, 'utf-8')
        .replace(/CURRENT_PROJECT_VERSION = .*;/g, `CURRENT_PROJECT_VERSION = ${build_number};`)
        .replace(/MARKETING_VERSION = .*;/g, `MARKETING_VERSION = ${version_name};`);
    fs.writeFileSync(file_path, file, 'utf-8');
}
try {
    let xcode_path = utils_1.default.argv('xcode_path');
    let gradle_path = utils_1.default.argv_null('gradle_path') || 'android/app/build.gradle';
    let version_name = utils_1.default.argv('version_name');
    let build_number = utils_1.default.argv_null('build_number') === 'git' ? version_from_git() : utils_1.default.argv_number('build_number');
    write_xcode(xcode_path, build_number, version_name);
    write_gradle(gradle_path, build_number, version_name);
    console.log(`Updated xcode & gradle with [build_number: ${build_number}, version_name: ${version_name}]`);
    process.exit(0);
}
catch (e) {
    console.error('ERROR: ' + e.message);
    process.exit(1);
}
