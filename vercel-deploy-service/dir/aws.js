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
exports.downloadfiles = downloadfiles;
const redis_1 = require("redis");
const aws_sdk_1 = require("aws-sdk");
require('dotenv').config();
const publisher = (0, redis_1.createClient)();
publisher.connect();
const s3 = new aws_sdk_1.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
function downloadfiles(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        var parms = {
            Bucket: `vercel-bucket-aadinir/${filepath}`,
            Key: filepath
        };
        yield s3.getObject(parms, (err, data) => {
            console.log(data);
        }).promise();
    });
}
