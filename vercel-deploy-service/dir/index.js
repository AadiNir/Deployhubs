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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const aws_1 = require("./aws");
const subsrciber = (0, redis_1.createClient)();
subsrciber.connect();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (1) {
            const resp = yield subsrciber.brPop((0, redis_1.commandOptions)({ isolated: true }), 'build-queue', 0);
            const ele = resp === null || resp === void 0 ? void 0 : resp.element;
            console.log(ele);
            yield (0, aws_1.downloadfiles)(ele);
        }
    });
}
main();
