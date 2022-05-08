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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const randomstring = require("randomstring");
const user_entity_1 = require("./entities/user.entity");
const repository_util_1 = require("../common/utils/repository.util");
const email_service_1 = require("../kit/email/email.service");
const bcrypt_1 = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    async addUser(payload, throwError = true) {
        const found = await this.findUserByEmail(payload.email);
        if (found) {
            if (throwError) {
                return false;
            }
            else {
                return found;
            }
        }
        const user = (0, repository_util_1.getFromDto)(payload, new user_entity_1.User());
        await this.userRepository.save(user);
        return await this.findUserByEmail(user.email);
    }
    updateUser(user) {
        return this.userRepository.save(user);
    }
    findUserByEmail(email) {
        return this.userRepository.findOne({
            where: { email: email.toLowerCase() },
        });
    }
    findUserById(id) {
        return this.userRepository.findOne({
            where: { id }
        });
    }
    async updateUserAvatar(id, avatar) {
        let user = await this.userRepository.findOne({
            where: { id }
        });
        user.avatar = avatar;
        return await this.userRepository.save(user);
    }
    async verifyEmail(code) {
        try {
            const found = await this.userRepository.findOne({
                where: { verification_code: code }
            });
            if (found) {
                found.email_verified = true;
                await this.userRepository.save(found);
                return true;
            }
            return false;
        }
        catch (error) {
            return true;
        }
    }
    async forgetPassword(email) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: email }
            });
            const forgetpassword_code = randomstring.generate(30);
            user.forgetpassword_code = forgetpassword_code;
            this.userRepository.save(user);
            await this.emailService.sendForgotPasswordEmail(email, forgetpassword_code);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async resetPassword(payload) {
        try {
            const user = await this.userRepository.findOne({
                where: { forgetpassword_code: payload.code }
            });
            if (!user)
                return false;
            user.password = await (0, bcrypt_1.hash)(payload.password, 10);
            user.forgetpassword_code = '';
            await this.userRepository.save(user);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async getAllUsers() {
        const users = await this.userRepository.find({
            where: { user_type: 'NORMAL' }
        });
        return users.map(user => user.toUserDto());
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map