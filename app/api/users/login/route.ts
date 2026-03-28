import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// You have to connect in every route.
connect()

export async function POST(request: NextRequest)
{
    try {
        
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        // Check if user exists..
        const user = await User.findOne({email})
        if(!user)
        {
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        // Now validate the incoming password from the frontend..
        const validPassword = await bcryptjs.compare(password, user.password);

        // Now if the password is not valid then..
        if(!validPassword)
        {
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        // Now we will here create the token data(jwt shit mein jo payload jayega woh)
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email    
        }

        // Now creating the token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        // Now set it into users cookie and for that in express you did res.cookie but in here you cant directly do 
        // that so you have to store the response in some variable and then you can do response.cookie

        const response = NextResponse.json({
            message: "Login succefull",
            success: true
        });

        // You can either "set" the cookie or "get" the cookie
        response.cookies.set("token", token, {httpOnly:true});

        // Now finally you can return the response
        return response;

    } catch (error: any) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({error: message}, {status: 500})
    }
}