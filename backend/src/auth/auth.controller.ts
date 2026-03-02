import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: { phone: string; name: string }) {
        // Basic validation (Kelajakda DTO ga olinadi, hozir MVP)
        if (!body.phone || !body.name) {
            return { error: 'Phone and Name are required' };
        }
        return this.authService.registerWithPhone(body.phone, body.name);
    }

    @Post('login')
    async login(@Body() body: { phone: string }) {
        if (!body.phone) return { error: 'Phone is required' };
        return this.authService.loginWithPhone(body.phone);
    }
}
