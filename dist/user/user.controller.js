"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const user_service_1 = require("../user/user.service");
const user_dto_1 = require("../user/dtos/user.dto");
const email_service_1 = require("../kit/email/email.service");
const randomstring = require("randomstring");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("../common/upload/upload.service");
const change_password_dto_1 = require("./dtos/change-password.dto");
const bcrypt_1 = require("bcrypt");
let UserController = class UserController {
    constructor(userService, emailService, uploadService) {
        this.userService = userService;
        this.emailService = emailService;
        this.uploadService = uploadService;
    }
    async change_avatar(body, file, req) {
        const fileName = randomstring.generate({
            length: 16,
            charset: 'alphabetic'
        }) + '.jpg';
        const path = 'assets/uploads/avatar/' + fileName;
        await this.uploadService.upload(path, file);
        const user = await this.userService.updateUserAvatar(req.user.id, path);
        return { success: true, user: user.toUserDto() };
    }
    async changeProfile(req, body) {
        const id = req.user.id;
        const user = await this.userService.findUserById(id);
        const compare_result = await (0, bcrypt_1.compare)(body.old_password, user.password);
        if (!compare_result) {
            return { success: false, message: 'Old password is incorrect' };
        }
        const password = await (0, bcrypt_1.hash)(body.new_password, 10);
        user.password = password;
        const updatedUser = await this.userService.updateUser(user);
        return { success: true, user: updatedUser.toUserDto() };
    }
    async all() {
        const users = await this.userService.getAllUsers();
        return { success: true, users: users };
    }
};
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    (0, common_1.Post)('change_avatar'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "change_avatar", null);
__decorate([
    (0, common_1.Put)('change_password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeProfile", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "all", null);
UserController = __decorate([
    (0, common_1.Controller)('api/user'),
    (0, swagger_1.ApiTags)('User'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        email_service_1.EmailService,
        upload_service_1.UploadService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map