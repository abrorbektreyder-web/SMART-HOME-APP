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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async registerWithPhone(phone, name) {
        const existingUser = await this.prisma.user.findUnique({ where: { phone } });
        if (existingUser) {
            throw new common_1.UnauthorizedException('User with this phone already exists');
        }
        const user = await this.prisma.user.create({
            data: {
                phone,
                name,
                role: 'USER',
            },
        });
        return this.generateTokens(user.id);
    }
    async loginWithPhone(phone) {
        const user = await this.prisma.user.findUnique({ where: { phone } });
        if (!user) {
            throw new common_1.UnauthorizedException('No user found matching this phone number');
        }
        return this.generateTokens(user.id);
    }
    generateTokens(userId) {
        const payload = { sub: userId };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET || 'hoyr-super-secret-key-2026',
                expiresIn: '30d',
            }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map