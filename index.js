"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("./lib/utils"));
const project_1 = __importDefault(require("./lib/project"));
const tools_1 = __importDefault(require("./lib/tools"));
const { spawnSync } = require('child_process');
try {
    let xcode_path = utils_1.default.argv_null('xcode_path') || project_1.default.find_xcode_proj();
    let gradle_path = utils_1.default.argv_null('gradle_path') || 'android/app/build.gradle';
    let build_src = utils_1.default.argv_enum_null('build_src', ['git']);
    let version_src = utils_1.default.argv_enum_null('version_src', ['package.json']);
    let build_number;
    let version_name;
    let platform = utils_1.default.argv_enum_null('platform', ['android', 'ios', 'both']) || 'both';
    let version_suffix = utils_1.default.argv_null('version_suffix');
    build_number = (build_src === 'git') ? tools_1.default.version_from_git() : utils_1.default.argv_number_null('build_number');
    version_name = (version_src === 'package.json') ? tools_1.default.version_from_package() : utils_1.default.argv_null('version_name');
    version_name = version_suffix ? `${version_name}-${version_suffix}` : version_name;
    if (platform !== 'ios') {
        project_1.default.write_gradle(gradle_path, build_number, version_name);
    }
    if (platform !== 'android') {
        project_1.default.write_xcode(xcode_path, build_number, version_name);
    }
    process.exit(0);
}
catch (e) {
    // console.error(e.stack)
    console.error('ERROR: ' + e.message);
    process.exit(1);
}
