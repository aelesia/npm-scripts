"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shell_1 = __importDefault(require("./Shell"));
class Build {
    static build_apk(password) {
        return __awaiter(this, void 0, void 0, function* () {
            // await Shell.dir_sh('root', 'npx jetify')
            // await Shell.dir_sh('android', `./gradlew clean assembleRelease -Ppassword=${password}`)
        });
    }
    static build_bundle(password) {
        return __awaiter(this, void 0, void 0, function* () {
            // await Shell.dir_sh('root', 'npx jetify')
            // await Shell.dir_sh('android', `./gradlew clean bundleRelease -Ppassword=${password}`)
            yield Shell_1.default.sh_2('./gradlew clean bundleRelease -Ppassword=${password}', { cwd: Shell_1.default.find_path('android') });
        });
    }
}
exports.default = Build;
