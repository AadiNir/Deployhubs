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
const path_1 = __importDefault(require("path"));
const aws_sdk_1 = require("aws-sdk");
require('dotenv').config();
function getallfiles(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        let ans = [];
        try {
            const fl = yield promises_1.default.readdir(filepath);
            fl.map(file => ans.push(path_1.default.join(filepath + "/" + file)));
        }
        catch (_a) {
            console.log("can't access the path");
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
        const filecontent = yield promises_1.default.readFile(filepath);
        const params = {
            Bucket: `vercel-bucket-aadinir/foldername}`,
            Key: path_1.default.basename(filepath),
            Body: filecontent
        };
        yield s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error uploading file:', err);
            }
            else {
                console.log(`File uploaded successfully. ${data.Location}`);
            }
        }).promise();
        console.log(s3);
    });
}
