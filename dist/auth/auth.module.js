"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_entity_1 = require("../user/entities/user.entity");
const user_module_1 = require("../user/user.module");
const jwt_1 = require("@nestjs/jwt");
const secret_constant_1 = require("../common/constants/secret.constant");
const email_module_1 = require("../kit/email/email.module");
const local_strategy_1 = require("../common/guards/local.strategy");
const jwt_strategy_1 = require("../common/guards/jwt.strategy");
const upload_module_1 = require("../common/upload/upload.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                secret: secret_constant_1.jwtConstant.secret,
                signOptions: { expiresIn: secret_constant_1.jwtConstant.expiresIn },
            }),
            email_module_1.EmailModule,
            upload_module_1.UploadModule
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map