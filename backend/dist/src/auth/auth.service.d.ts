import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerWithPhone(phone: string, name: string): Promise<{
        access_token: string;
    }>;
    loginWithPhone(phone: string): Promise<{
        access_token: string;
    }>;
    private generateTokens;
}
