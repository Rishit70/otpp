"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let AppService = class AppService {
    otpsFile = path.join(__dirname, './otps.json');
    verifyOTP(userId, otp) {
        const otps = this.readOtps();
        const otpData = otps.find((otpRecord) => otpRecord.userId === userId);
        if (!otpData) {
            return 'OTP incorrect';
        }
        const otpAge = Date.now() - otpData.timestamp;
        if (otpAge > 10 * 60 * 1000) {
            return 'OTP not valid';
        }
        if (otpData.otp === otp) {
            return 'OTP verified';
        }
        else {
            return 'OTP incorrect';
        }
    }
    readOtps() {
        try {
            const data = fs.readFileSync(this.otpsFile, 'utf-8');
            return JSON.parse(data) || [];
        }
        catch (error) {
            return [];
        }
    }
    writeOtps(otps) {
        try {
            fs.writeFileSync(this.otpsFile, JSON.stringify(otps, null, 2), 'utf-8');
        }
        catch (error) {
            throw new Error('Error writing to OTP file');
        }
    }
    generateOTP(userId) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const timestamp = Date.now();
        const otpData = { userId, otp, timestamp };
        const otps = this.readOtps();
        otps.push(otpData);
        this.writeOtps(otps);
        return otp;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map