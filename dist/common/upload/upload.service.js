"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const sharp = require('sharp');
let UploadService = class UploadService {
    async upload(path, file) {
        console.log('buffer: ', file.buffer);
        var image = await sharp(file.buffer)
            .toFile(path)
            .catch(err => {
            console.log('file upload error: ', err);
            return false;
        });
        return true;
    }
    async uploadByImageData(path, base64) {
        const buffer = Buffer.from(base64, 'base64');
        await sharp(buffer)
            .toFile(path)
            .catch(err => {
            console.log('file upload error: ', err);
            return false;
        });
        return true;
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map