import { Controller, Get, Post , Query, HttpException, HttpStatus, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('otp')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generates')
  generateOtp(@Body() body : {userId:string}){
   
    if(!body.userId)
    {
      throw new HttpException("User Id is required ", HttpStatus.BAD_REQUEST);
    }
    
    const otp = this.appService.generateOTP(body.userId);
    return {otp};

  }

  @Post('checks')
  verifyOtp(@Body() body: {userId:string ; otp:string}){
      
    if(!body.userId || !body.otp)
    {
      throw new HttpException("USer id and otp required",HttpStatus.BAD_REQUEST);
    }
     
    const verificationResult = this.appService.verifyOTP(body.userId , body.otp);
    if(verificationResult === 'OTP verified')
    {
      return{message:'OTP verfied'};
    }
    else{
      throw new HttpException(verificationResult,HttpStatus.BAD_REQUEST);
    }

  }
}
