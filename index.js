"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("./lib/utils"));
const project_1 = __importDefault(require("./lib/project"));
const tools_1 = __importDefault(require("./lib/tools"));
const { spawnSync } = require('child_process');
// function write_gradle(file_path: string, build_number?: number, version_name?: string) {
// 	let file = fs.readFileSync(file_path, 'utf-8')
// 	if (build_number)
// 		file = file.replace(/versionCode ([\d]+)?/g, `versionCode ${build_number}`)
// 	if (version_name)
// 		file = file.replace(/versionName (("[\d\.\w]*)+)?/g, `versionName "${version_name}"`)
// 	fs.writeFileSync(file_path, file, 'utf-8')
// }
//
// function write_xcode(file_path: string, build_number?: number, version_name?: string) {
// 	let file = fs.readFileSync(file_path, 'utf-8')
// 	if (build_number)
// 		file = file.replace(/CURRENT_PROJECT_VERSION = .*;/g, `CURRENT_PROJECT_VERSION = ${build_number};`)
// 	if (version_name)
// 		file = file.replace(/MARKETING_VERSION = .*;/g, `MARKETING_VERSION = ${version_name};`)
// 	fs.writeFileSync(file_path, file, 'utf-8')
// }
//
// function find_xcode_proj(): string {
// 	let path = Utils.sh_s('find', ['ios', '-type', 'f', '-name', 'project.pbxproj'])
// 	if (path.includes('project.pbxproj'))
// 		return path
// 	else
// 		throw Error('XCode project.pbxproj cannot be located. Please specify with the params "xcode_path:[path]"')
// }
try {
    let xcode_path = project_1.default.find_xcode_proj();
    let gradle_path = utils_1.default.argv_null('gradle_path') || 'android/app/build.gradle';
    let version_name = utils_1.default.argv_null('version_name');
    let build_number = utils_1.default.argv_number_null('build_number');
    build_number = tools_1.default.version_from_git();
    version_name = tools_1.default.version_from_package();
    project_1.default.write_xcode(xcode_path, build_number, version_name);
    project_1.default.write_gradle(gradle_path, build_number, version_name);
    console.log(`Updated xcode & gradle with [build_number: ${build_number}, version_name: ${version_name}]`);
    process.exit(0);
}
catch (e) {
    // console.error(e.stack)
    console.error('ERROR: ' + e.message);
    process.exit(1);
}
