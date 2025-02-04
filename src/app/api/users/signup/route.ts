import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password, email } = reqBody;
    const user = await User.findOne({ email, username });
    if (user) {
      console.log("User already exists");
      return NextResponse.json({ message: "User already exists", status: 400 });
    }

    //hashing password
    const salt = await bcryptjs.genSalt(10); //10 rounds
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });

    console.log("NEw User : ", newUser);

    const savedUser = await newUser.save();
    console.log("savedUser : ", savedUser);
    return NextResponse.json({
      message: "User created successfully",
      code: 200,
      savedUser,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
