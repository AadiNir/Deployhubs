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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
const files_1 = require("./files");
const simple_git_1 = __importDefault(require("simple-git"));
const path_1 = __importDefault(require("path"));
const redis_1 = require("redis");
const publisher = (0, redis_1.createClient)();
publisher.connect();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/deploy', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = yield req.body.githuburl;
    if (!url) {
        console.log("no url provied");
    }
    const id = (0, utils_1.generate)();
    yield (0, simple_git_1.default)().clone(url, path_1.default.join(__dirname, `outputs/${id}`));
    const files = yield (0, files_1.getallfiles)(path_1.default.join(__dirname, `outputs/${id}`));
    for (const file of files) {
        yield (0, files_1.addtos3)(file, id); // Sequentially upload files to S3
    }
    publisher.lPush("build-queue", id);
    res.json({
        id: id
    });
}));
app.listen(3000, () => {
    console.log(__dirname);
    console.log("running on port 3000");
});
