"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const expressBasicAuth = require("express-basic-auth");
const swagger_1 = require("@nestjs/swagger");
const seed_service_1 = require("./common/seed/seed.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    const seedService = app.get(seed_service_1.SeedService);
    if (process.env.PRODUCTION) {
    }
    else {
        await seedService.startDevelopmentSeed();
    }
    const config = new swagger_1.DocumentBuilder()
        .setTitle('NFT Marketplace API Document')
        .setDescription('This document is for NFT Marketplace APIs')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    app.use('/doc', expressBasicAuth({
        challenge: true,
        users: {
            nft_market: 'password',
        },
    }));
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('doc', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map