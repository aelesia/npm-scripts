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
class Project {
    static write_gradle(file_path, build_number, version_name) {
        let file = fs.readFileSync(file_path, 'utf-8');
        if (build_number)
            file = file.replace(/versionCode ([\d]+)?/g, `versionCode ${build_number}`);
        if (version_name)
            file = file.replace(/versionName (("[\d\.\w-]*)+)?/g, `versionName "${version_name}"`);
        fs.writeFileSync(file_path, file, 'utf-8');
        console.log(`Updated ${file_path} -`
            + (build_number ? ' versionCode:' + build_number : '')
            + (version_name ? ' versionName:' + version_name : ''));
    }
    static write_xcode(file_path, build_number, version_name) {
        let file = fs.readFileSync(file_path, 'utf-8');
        if (build_number)
            file = file.replace(/CURRENT_PROJECT_VERSION = .*;/g, `CURRENT_PROJECT_VERSION = ${build_number};`);
        if (version_name)
            file = file.replace(/MARKETING_VERSION = .*;/g, `MARKETING_VERSION = ${version_name};`);
        fs.writeFileSync(file_path, file, 'utf-8');
        console.log(`Updated ${file_path} -`
            + (build_number ? ' CURRENT_PROJECT_VERSION:' + build_number : '')
            + (version_name ? ' MARKETING_VERSION:' + version_name : ''));
    }
    static find_xcode_proj() {
        let path = utils_1.default.sh_s('find', ['ios', '-type', 'f', '-name', 'project.pbxproj']);
        if (path.includes('project.pbxproj'))
            return path;
        else
            throw Error('XCode project.pbxproj cannot be located. Please specify with the params "xcode_path:[path]"');
    }
}
exports.default = Project;
