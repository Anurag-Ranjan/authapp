import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { emailId, token, newPass } = reqBody;
    if (emailId) {
      const user = await User.findOne({ email: emailId });
      if (!user) {
        return NextResponse.json({
          message: "Incorrect Email ID",
          status: 400,
        });
      }
      await sendMail({ email: emailId, emailType: "RESET", userId: user._id });
      return NextResponse.json({
        message: "Email sent successfully",
        status: 200,
        success: true,
      });
    } else {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordTokenExpiry: { $gt: Date.now() },
      });
      if (!user) {
        return NextResponse.json({ message: "Invalid token", status: 400 });
      }
      const salt = await bcryptjs.genSalt(10); //10 rounds
      const hashedPassword = await bcryptjs.hash(newPass, salt);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpiry = undefined;

      await user.save();

      return NextResponse.json({
        message: "Password Changed Successfully",
        status: 200,
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
