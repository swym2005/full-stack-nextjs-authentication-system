import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import {NextResponse, NextRequest } from "next/server";


connect();

export async function POST(request: NextRequest)
{
    const reqBody = await request.json();
    const {newPassword, token} = reqBody;


    const user = await User.findOne({
    forgotPasswordToken: token,
    forgotPasswordTokenExpiry: { $gt: Date.now() }
});

    if(!user)
    {
        return NextResponse.json({message: "User does not exist"}, {status: 401});
    }

    const salt = await bcryptjs.genSalt(10);
    const newlyPassword = await bcryptjs.hash(newPassword, salt);
  user.password = newlyPassword;
await user.save();

    return NextResponse.json({message: "Your password is updated"}, {status: 200});
    
}