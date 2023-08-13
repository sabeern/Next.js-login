import { mongoConnect } from "@/dbConfig/dbConfig";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

mongoConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, userName } = reqBody;
    //check if user already exist
    const userDetails = await userModel.findOne({ email });
    if (userDetails) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = new userModel({
      userName,
      email,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
    sendMail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (err: any) {
    console.log("err", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
