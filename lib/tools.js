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
const Shell_1 = __importDefault(require("./Shell"));
class Tools {
    static version_from_git() {
        let total_commits = Shell_1.default.sh_i('git', ['rev-list', '--count', 'HEAD']);
        let branch_commits_from_dev = Shell_1.default.sh_i('git', ['rev-list', '--count', 'origin/develop..HEAD']);
        let dev_commits = total_commits - branch_commits_from_dev;
        return dev_commits * 1000 + branch_commits_from_dev;
    }
    static version_from_package() {
        let file = fs.readFileSync('package.json', 'utf-8');
        let pkg = JSON.parse(file);
        if (!pkg.version) {
            throw Error('No version defined in package.json');
        }
        return pkg.version;
    }
}
exports.default = Tools;
