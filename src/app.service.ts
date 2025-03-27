import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path';

@Injectable()
export class AppService {

  private otpsFile = path.join(__dirname,'./otps.json');

  verifyOTP(userId: string, otp: string):string  {
      
    const otps = this.readOtps();
    const otpData = otps.find((otpRecord) => otpRecord.userId === userId);

    if (!otpData) {
      return 'OTP incorrect'; // User ID not found
    }

    // Check if OTP is expired (more than 10 minutes)
    const otpAge = Date.now() - otpData.timestamp;
    if (otpAge > 10 * 60 * 1000) {
      return 'OTP not valid'; // OTP expired
    }

    // Validate OTP
    if (otpData.otp === otp) {
      return 'OTP verified';
    } else {
      return 'OTP incorrect';
    }
  }

  // Read OTPs from the file
  private readOtps(): any[] {
    try {
      const data = fs.readFileSync(this.otpsFile, 'utf-8');
      return JSON.parse(data) || [];
    } catch (error) {
      return []; // Return an empty array if file doesn't exist or is empty
    }
  }

  // Write OTPs to the file
  private writeOtps(otps: any[]): void {
    try {
      fs.writeFileSync(this.otpsFile, JSON.stringify(otps, null, 2), 'utf-8');
    } catch (error) {
      throw new Error('Error writing to OTP file');
    }
  }


  // Generate a random OTP
  generateOTP(userId: string): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const timestamp = Date.now(); // Get current time in milliseconds
    const otpData = { userId, otp, timestamp };

    // Read existing OTPs from file
    const otps = this.readOtps();

    // Add new OTP to the list
    otps.push(otpData);

    // Write the updated OTP list to file
    this.writeOtps(otps);

    return otp;
  }
}