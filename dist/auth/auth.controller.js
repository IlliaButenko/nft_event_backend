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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../user/user.service");
const login_dto_1 = require("./dtos/login.dto");
const token_response_dto_1 = require("./dtos/token-response.dto");
const register_dto_1 = require("./dtos/register.dto");
const user_dto_1 = require("../user/dtos/user.dto");
const email_service_1 = require("../kit/email/email.service");
const randomstring = require("randomstring");
const verify_email_dto_1 = require("./dtos/verify_email.dto");
const change_profile_dto_1 = require("../user/dtos/change-profile.dto");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("../common/upload/upload.service");
const forget_password_dto_1 = require("./dtos/forget_password.dto");
const reset_password_dto_1 = require("./dtos/reset_password.dto");
let AuthController = class AuthController {
    constructor(authService, userService, emailService, uploadService) {
        this.authService = authService;
        this.userService = userService;
        this.emailService = emailService;
        this.uploadService = uploadService;
    }
    async getProfile(req) {
        const email = req.user.email;
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException(`Invalid user authorization token found.`);
        }
        return user.toUserDto();
    }
    async login(body) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new common_1.BadRequestException();
            return;
        }
        if (user.email_verified) {
            const token = this.authService.login(user);
            const currentUser = await this.userService.findUserByEmail(user.email);
            const result = new token_response_dto_1.TokenResponseDto(token, currentUser.toUserDto());
            return { success: true, data: result };
        }
        else {
            return { success: false, message: 'Email not verified' };
        }
    }
    async updateProfile(req, body, file) {
        const email = req.user.email;
        const user = await this.userService.findUserByEmail(email);
        console.log(email);
        if (body.email !== req.user.email) {
            const exist = await this.userService.findUserByEmail(body.email);
            if (exist) {
                return { success: false, message: 'Email already taken' };
            }
        }
        let path;
        if (file) {
            const fileName = randomstring.generate({
                length: 16,
                charset: 'alphabetic'
            }) + '.jpg';
            path = 'assets/uploads/background/' + fileName;
            await this.uploadService.upload(path, file);
        }
        user.name = body.name;
        user.email = body.email;
        user.phone = body.phone;
        user.background = path;
        const updatedUser = await this.userService.updateUser(user);
        const token = this.authService.login(updatedUser);
        const result = new token_response_dto_1.TokenResponseDto(token, updatedUser.toUserDto());
        return { success: true, data: result };
    }
    async signup(body) {
        const verification_code = randomstring.generate(30);
        const user = await this.userService.addUser(Object.assign(Object.assign({}, body), { verification_code: verification_code, email_verified: false }));
        if (!user) {
            return { success: false, message: 'Email already taken' };
        }
        this.emailService.sendConfirmRegisterEmail(user.email, verification_code);
        const token = this.authService.login(user);
        return { success: true };
    }
    async verify_email(body) {
        const res = await this.userService.verifyEmail(body.code);
        console.log(res);
        return { success: res };
    }
    async forgetPasword(body) {
        const user = await this.userService.findUserByEmail(body.email);
        if (!user) {
            return { success: false, message: 'Email not exist' };
        }
        await this.userService.forgetPassword(body.email);
        return { success: true };
    }
    async resetPasword(body) {
        const result = await this.userService.resetPassword(body);
        return { success: result };
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({ type: user_dto_1.UserDto }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOkResponse)({ type: token_response_dto_1.TokenResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('background')),
    (0, common_1.Post)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({ type: token_response_dto_1.TokenResponseDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_profile_dto_1.ChangeProfileDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('verify_email'),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_dto_1.VerifyEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify_email", null);
__decorate([
    (0, common_1.Post)('forget_password'),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_password_dto_1.ForgetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgetPasword", null);
__decorate([
    (0, common_1.Put)('reset_password'),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPasword", null);
AuthController = __decorate([
    (0, common_1.Controller)('api/auth'),
    (0, swagger_1.ApiTags)('Authentication'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        email_service_1.EmailService,
        upload_service_1.UploadService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map