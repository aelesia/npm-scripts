"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Arg_1 = __importDefault(require("./lib/Arg"));
const Project_1 = __importDefault(require("./lib/Project"));
const Tools_1 = __importDefault(require("./lib/Tools"));
const { spawnSync } = require('child_process');
try {
    let xcode_path = Arg_1.default.v_null('xcode_path') || Project_1.default.find_xcode_proj();
    let gradle_path = Arg_1.default.v_null('gradle_path') || 'android/app/build.gradle';
    let build_src = Arg_1.default.v_enum_null('build_src', ['git']);
    let version_src = Arg_1.default.v_enum_null('version_src', ['package.json']);
    let build_number;
    let version_name;
    let platform = Arg_1.default.v_enum_null('platform', ['android', 'ios', 'both']) || 'both';
    let version_suffix = Arg_1.default.v_null('version_suffix');
    build_number = (build_src === 'git') ? Tools_1.default.version_from_git() : Arg_1.default.v_number_null('build_number');
    version_name = (version_src === 'package.json') ? Tools_1.default.version_from_package() : Arg_1.default.v_null('version_name');
    version_name = version_suffix ? `${version_name}-${version_suffix}` : version_name;
    if (platform !== 'ios') {
        Project_1.default.write_gradle(gradle_path, build_number, version_name);
    }
    if (platform !== 'android') {
        Project_1.default.write_xcode(xcode_path, build_number, version_name);
    }
    process.exit(0);
}
catch (e) {
    // console.error(e.stack)
    console.error('ERROR: ' + e.message);
    process.exit(1);
}
