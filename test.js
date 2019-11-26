"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shell_1 = __importDefault(require("./lib/Shell"));
// function find_path(relative_path: string): string {
// 	let pwd = Shell.pwd()
//
// 	if (pwd.includes(relative_path)) {
// 		if (pwd.endsWith(relative_path)) {
// 			return pwd
// 		} else {
// 			let start = pwd.indexOf(relative_path)
// 			let end = start+relative_path.length
// 			return pwd.slice(0, end)
// 		}
// 	}
//
// 	else {
// 		if (spawnSync('test', ['-d', relative_path]).status === 0) {
// 			return pwd + '/' + relative_path
// 		} else {
// 			throw Error(`Path: '${relative_path}' cannot be found in '${pwd}'`)
// 		}
// 	}
// }
(function () {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // let password: string = Arg.v('password')
            // await Build.build_bundle(password)
            console.log(Shell_1.default.find_path('(root)'));
            process.exit(0);
        }
        catch (e) {
            console.log('ERROR: ' + ((_a = e) === null || _a === void 0 ? void 0 : _a.message));
            process.exit(1);
        }
    });
}());
