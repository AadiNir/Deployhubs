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
exports.getallfiles = getallfiles;
exports.addtos3 = addtos3;
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const aws_sdk_1 = require("aws-sdk");
require('dotenv').config();
function getallfiles(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        let ans = [];
        try {
            const files = yield promises_1.default.readdir(filepath);
            const promises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const fullpath = path_1.default.join(filepath, file);
                const stats = yield promises_1.default.stat(fullpath); // Fix: use `fs.stat`
                if (stats.isDirectory()) {
                    const nestedFiles = yield getallfiles(fullpath); // Recursively get files
                    ans = ans.concat(nestedFiles); // Concatenate results
                }
                else {
                    ans.push(fullpath);
                }
            }));
            yield Promise.all(promises); // Wait for all recursive operations to complete
        }
        catch (error) {
            console.log("Can't access the path:", error);
        }
        return ans;
    });
}
const s3 = new aws_sdk_1.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
function addtos3(filepath, foldername) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(path_1.default.basename(filepath));
        const filecontent = yield fs_1.default.readFileSync(filepath);
        yield s3.upload({
            Bucket: `vercel-bucket-aadinir/${foldername}`,
            Key: path_1.default.basename(filepath),
            Body: filecontent
        }).promise();
    });
}
