import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    // Faqat Premium UZ bozori uchun telefon orqali ro'yxatdan o'tish
    async registerWithPhone(phone: string, name: string) {
        const existingUser = await this.prisma.user.findUnique({ where: { phone } });
        if (existingUser) {
            throw new UnauthorizedException('User with this phone already exists');
        }

        // Sms tasdiqlash yo'q hozircha, to'g'ridan to'g'ri yaratamiz (1-bosqich MVP)
        const user = await this.prisma.user.create({
            data: {
                phone,
                name,
                role: 'USER',
            },
        });

        return this.generateTokens(user.id);
    }

    // Tizimga kirish (Login)
    async loginWithPhone(phone: string) {
        const user = await this.prisma.user.findUnique({ where: { phone } });
        if (!user) {
            throw new UnauthorizedException('No user found matching this phone number');
        }

        return this.generateTokens(user.id);
    }

    private generateTokens(userId: string) {
        const payload = { sub: userId };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET || 'hoyr-super-secret-key-2026', // env ga ko'chirish shart
                expiresIn: '30d', // 1 oylik sessiya
            }),
        };
    }
}
