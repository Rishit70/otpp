export declare class AppService {
    private otpsFile;
    verifyOTP(userId: string, otp: string): string;
    private readOtps;
    private writeOtps;
    generateOTP(userId: string): string;
}
