import nodemailer from "nodemailer";
import userModel from "@/models/userModel";
import bcryptjs from "bcryptjs";

export async function sendMail({ email, emailType, userId }: any) {
  try {
    const token = await bcryptjs.hash(userId.toString(), 10);
    if ((emailType = "VERIFY")) {
      await userModel.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 43200000,
      });
    }
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7ab0259a3d1e43",
        pass: "68a1b5e86bbe26",
      },
    });
    var mailOptions = {
      from: "sabeer.chargemod@gmail.com",
      to: email,
      subject: "Email verification next",
      html: (emailType = "VERIFY"
        ? `<p>Please click <a href="${process.env.DOMAIN}/verification?token=${token}">here</a> to verify your email</p>`
        : ""),
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        throw new Error(error?.message);
      } else {
        return info.response;
      }
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
}
