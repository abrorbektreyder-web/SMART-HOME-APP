import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        phone: string;
        name: string;
    }): Promise<{
        access_token: string;
    } | {
        error: string;
    }>;
    login(body: {
        phone: string;
    }): Promise<{
        access_token: string;
    } | {
        error: string;
    }>;
}
