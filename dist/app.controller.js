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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    generateOtp(body) {
        if (!body.userId) {
            throw new common_1.HttpException("User Id is required ", common_1.HttpStatus.BAD_REQUEST);
        }
        const otp = this.appService.generateOTP(body.userId);
        return { otp };
    }
    verifyOtp(body) {
        if (!body.userId || !body.otp) {
            throw new common_1.HttpException("USer id and otp required", common_1.HttpStatus.BAD_REQUEST);
        }
        const verificationResult = this.appService.verifyOTP(body.userId, body.otp);
        if (verificationResult === 'OTP verified') {
            return { message: 'OTP verfied' };
        }
        else {
            throw new common_1.HttpException(verificationResult, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('generates'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "generateOtp", null);
__decorate([
    (0, common_1.Post)('checks'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "verifyOtp", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('otp'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map