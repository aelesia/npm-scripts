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
const Arg_1 = __importDefault(require("./lib/Arg"));
const Build_1 = __importDefault(require("./lib/Build"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let password = Arg_1.default.v('password');
            yield Build_1.default.build_bundle(password);
            process.exit(0);
        }
        catch (e) {
            if (e) {
                console.log('ERROR: ' + e.message);
            }
            process.exit(1);
        }
    });
}());
