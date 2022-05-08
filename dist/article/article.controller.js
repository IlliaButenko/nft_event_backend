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
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const randomstring = require("randomstring");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("../common/upload/upload.service");
const article_service_1 = require("./article.service");
const article_dto_1 = require("./dtos/article.dto");
let ArticleController = class ArticleController {
    constructor(uploadService, articleService) {
        this.uploadService = uploadService;
        this.articleService = articleService;
    }
    async create_article(body, file, req) {
        const fileName = randomstring.generate({
            length: 16,
            charset: 'alphabetic',
        }) + '.jpg';
        const path = 'assets/uploads/article/' + fileName;
        await this.uploadService.upload(path, file);
        const article = await this.articleService.createArticle({
            image: path,
            title: body.title,
            description: body.description,
        });
        return { success: true, article: article };
    }
    async getAllArticles() {
        const articles = await this.articleService.getAllArticles();
        return {
            success: true,
            articles: articles.map((article) => article.toArticleDto()),
        };
    }
    async getArticleById(id) {
        const article = await this.articleService.findById(id);
        if (article) {
            return { success: true, article: article.toArticleDto() };
        }
        else {
            return { success: false, message: "Can't find the article" };
        }
    }
    async deleteArticleById(id) {
        try {
            await this.articleService.remove(id);
            return { success: true, message: 'Article deleted successfully!' };
        }
        catch (error) {
            return { success: false, message: "Can't find the article" };
        }
    }
};
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({}),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "create_article", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: article_dto_1.ArticleDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getAllArticles", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: article_dto_1.ArticleDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticleById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: article_dto_1.ArticleDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "deleteArticleById", null);
ArticleController = __decorate([
    (0, common_1.Controller)('api/article'),
    (0, swagger_1.ApiTags)('Article'),
    __metadata("design:paramtypes", [upload_service_1.UploadService,
        article_service_1.ArticleService])
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.controller.js.map