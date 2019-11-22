"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = __importDefault(require("./lib/tools"));
const { spawnSync } = require('child_process');
try {
    // let xcode_path: string = Project.find_xcode_proj()
    // let gradle_path: string = Utils.argv_null('gradle_path') || 'android/app/build.gradle'
    // let version_name: string | undefined = Utils.argv_null('version_name')
    // let build_number: number | undefined = Utils.argv_number_null('build_number')
    tools_1.default.version_from_package();
    process.exit(0);
}
catch (e) {
    // console.error(e.stack)
    console.error('ERROR: ' + e.message);
    process.exit(1);
}
