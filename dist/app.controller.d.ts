import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    generateOtp(body: {
        userId: string;
    }): {
        otp: string;
    };
    verifyOtp(body: {
        userId: string;
        otp: string;
    }): {
        message: string;
    };
}
